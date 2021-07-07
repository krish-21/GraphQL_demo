/**
 * @typedef { import("apollo-server").PubSub } PubSub
 */

/**
 *
 * @param {any} parents
 * @param {any} args
 * @param {{pubSub: PubSub}} context
 * @returns
 */
const newLinkSubscribe = (parents, args, context) => {
  return context.pubSub.asyncIterator("NEW_LINK");
};

const newLink = {
  subscribe: newLinkSubscribe,
  resolve: (payload) => payload,
};

/**
 *
 * @param {any} parents
 * @param {any} args
 * @param {{pubSub: PubSub}} context
 * @returns
 */
const newVoteSubscribe = (parents, args, context) => {
  return context.pubSub.asyncIterator("NEW_VOTE");
};

const newVote = {
  subscribe: newVoteSubscribe,
  resolve: (payload) => payload,
};

module.exports = {
  newLink,
  newVote,
};
