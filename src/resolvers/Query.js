/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 */

/**
 *
 * @returns {string}
 */
const info = () => "This is the API of Hackernews Clone";

/**
 *
 * @param {any} parent
 * @param {{filter: string, skip: number, take: number, orderBy: {}}} args
 * @param {{prisma: Prisma}} context
 */
const feed = async (parent, args, context) => {
  const where = args.filter
    ? {
        OR: [
          { description: { contains: args.filter } },
          { url: { contains: args.filter } },
        ],
      }
    : {};

  const filteredLinks = await context.prisma.link.findMany({
    where,
    skip: args.skip,
    take: args.take,
    orderBy: args.orderBy,
  });

  const count = await context.prisma.link.count();

  return {
    id: "main-feed",
    links: filteredLinks,
    count,
  };
};

/**
 *
 * @param {any} parent
 * @param {{id: string}} args
 * @param {{prisma: Prisma}} context
 */
const link = async (parent, args, context) => {
  let link;

  try {
    link = await context.prisma.link.findUnique({
      where: { id: args.id },
    });
  } catch (err) {
    throw new Error(`No link with id: ${args.id}`);
  }

  return link;
};

module.exports = {
  info,
  feed,
  link,
};
