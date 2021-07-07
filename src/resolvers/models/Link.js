/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 */

/**
 *
 * @param {{id: string}} parent
 * @param {any} args
 * @param {{prisma: Prisma}} context
 */
const postedBy = async (parent, args, context) =>
  await context.prisma.link
    .findUnique({
      where: {
        id: parent.id,
      },
    })
    .postedBy();

/**
 *
 * @param {{id: string}} parent
 * @param {any} args
 * @param {{prisma: Prisma}} context
 */
const votes = async (parent, args, context) =>
  await context.prisma.link
    .findUnique({
      where: {
        id: parent.id,
      },
    })
    .votes();

module.exports = {
  postedBy,
  votes,
};
