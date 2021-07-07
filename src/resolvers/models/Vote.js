/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 */

/**
 *
 * @param {{id: string}} parent
 * @param {any} args
 * @param {{prisma: Prisma}} context
 */
const link = async (parent, args, context) =>
  await context.prisma.vote
    .findUnique({
      where: {
        id: parent.id,
      },
    })
    .link();

/**
 *
 * @param {{id: string}} parent
 * @param {any} args
 * @param {{prisma: Prisma}} context
 */
const user = async (parent, args, context) =>
  await context.prisma.vote
    .findUnique({
      where: {
        id: parent.id,
      },
    })
    .user();

module.exports = {
  link,
  user,
};
