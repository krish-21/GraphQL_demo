/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @typedef { import("apollo-server").PubSub } PubSub
 */

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { APP_SECRET } = require("../utils");

/**
 *
 * @param {any} parent
 * @param {{email: string, password: string, name: string}} args
 * @param {{prisma: Prisma}} context
 * @param {any} info
 */
const signup = async (parent, args, context, info) => {
  // hash password
  const password = await bcrypt.hash(args.password, 10);

  // create user & store in db
  const user = await context.prisma.user.create({
    data: { ...args, password },
  });

  // generate jwt signed with APP_SECRET
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
};

/**
 *
 * @param {any} parent
 * @param {{email: string, password: string}} args
 * @param {{prisma: Prisma}} context
 * @param {any} info
 */
const login = async (parent, args, context, info) => {
  // find user by email
  const user = await context.prisma.user.findUnique({
    where: {
      email: args.email,
    },
  });

  // if no user, throw err
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // validate password
  const valid = await bcrypt.compare(args.password, user.password);

  // if not valid, err
  if (!valid) {
    throw new Error("Invalid email or password");
  }

  // generate jwt signed with APP_SECRET
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
};

/**
 *
 * @param {any} parent
 * @param {{url: string, description: string }} args
 * @param {{userId: string, prisma: Prisma, pubSub: PubSub}} context
 * @returns
 */
const createLink = async (parent, args, context) => {
  const { userId } = context;

  // if no user, throw err
  if (!userId) {
    console.log("\n\n createLink(): NOT AUTHENTICATED\n\n");
    throw new Error("Not Authenticated");
  }

  // create new link & save to db
  const newLink = await context.prisma.link.create({
    data: {
      url: args.url,
      description: args.description,
      postedBy: { connect: { id: userId } },
    },
  });

  // publish creation of new link
  context.pubSub.publish("NEW_LINK", newLink);

  return newLink;
};

/**
 *
 * @param {any} parents
 * @param {{id: string, url: string, description: string}} args
 * @param {{userId: string, prisma: Prisma, pubSub: PubSub}} context
 * @returns
 */
const updateLink = async (parents, args, context) => {
  const { userId } = context;

  // if no user, throw err
  if (!userId) {
    console.log("\n\n updateLink(): NOT AUTHENTICATED\n\n");
    throw new Error("Not Authenticated");
  }

  try {
    // find author id of link
    const { postedById } = await context.prisma.link.findUnique({
      where: {
        id: args.id,
      },
      select: {
        // retreive only postedById
        postedById: true,
      },
    });

    // if user is not author, throw err
    if (postedById !== userId) {
      console.log("\n\n updateLink(): NOT AUTHORIZED\n\n");
      throw new Error("Not Authorized");
    }

    // update link in db
    return await context.prisma.link.update({
      where: {
        id: args.id,
      },
      data: {
        url: args.url,
        description: args.description,
      },
    });
  } catch (err) {
    // if no link with args.id exists
    throw new Error(`No link with id: ${args.id}`);
  }
};

/**
 *
 * @param {any} parent
 * @param {{id: string}} args
 * @param {{userId: string, prisma: Prisma, pubSub: PubSub}} context
 * @returns
 */
const deleteLink = async (parent, args, context) => {
  const { userId } = context;

  // if no user, throw err
  if (!userId) {
    console.log("\n\n deleteLink(): NOT AUTHENTICATED\n\n");
    throw new Error("Not Authenticated");
  }

  try {
    // find author id of link
    const { postedById } = await context.prisma.link.findUnique({
      where: {
        id: args.id,
      },
      select: {
        // retreive only postedById
        postedById: true,
      },
    });

    // if user is not author, throw err
    if (postedById !== userId) {
      console.log("\n\n deleteLink(): NOT AUTHORIZED\n\n");
      throw new Error("Not Authorized");
    }

    // delete link from db
    return await context.prisma.link.delete({
      where: {
        id: args.id,
      },
    });
  } catch (err) {
    // if no link with args.id exists
    throw new Error(`No link with id: ${args.id}`);
  }
};

/**
 *
 * @param {any} parent
 * @param {{linkId: string}} args
 * @param {{userId: string, prisma: Prisma, pubSub: PubSub}} context
 */
const vote = async (parent, args, context) => {
  const { userId } = context;

  // if no user, throw err
  if (!userId) {
    console.log("\n\n vote(): NOT AUTHENTICATED\n\n");
    throw new Error("Not Authenticated");
  }

  const { id } = await context.prisma.link.findUnique({
    where: {
      id: args.linkId,
    },
    select: {
      id: true,
    },
  });

  if (!id) {
    console.log("\n\n vote(): NO LINK\n\n");
    throw new Error(`No link exist with id: ${args.linkId}`);
  }

  // query for vote by user on link
  const vote = await context.prisma.vote.findUnique({
    where: {
      linkId_userId: {
        linkId: args.linkId,
        userId: userId,
      },
    },
  });

  // if vote exists, throw err
  if (Boolean(vote)) {
    throw new Error(
      `User (${userId}) already voted for link (${args.linkId}. Vote: (${vote.id}))`
    );
  }

  // if vote doesn't exist
  // create vote & save to db
  const newVote = context.prisma.vote.create({
    data: {
      link: { connect: { id: args.linkId } },
      user: { connect: { id: userId } },
    },
  });

  // publish creation of new vote
  context.pubSub.publish("NEW_VOTE", newVote);

  return newVote;
};

module.exports = {
  signup,
  login,
  createLink,
  updateLink,
  deleteLink,
  vote,
};
