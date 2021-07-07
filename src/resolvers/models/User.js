/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 */

/**
 *
 * @param {{id: string}} parent
 * @param {any} args
 * @param {{prisma: Prisma}} context
 */
const links = async (parent, args, context) =>
  await context.prisma.user
    .findUnique({
      where: {
        id: parent.id,
      },
    })
    .links();

module.exports = {
  links,
};
