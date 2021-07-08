import { useMutation } from "@apollo/client";

import { FEED_QUERY } from "../../gqlQueries/queries";
import { VOTE_MUTATION } from "../../gqlQueries/mutations";

import timeDifferenceForDate from "../../utils/timeDifferenceForDate";

const Link = (props) => {
  const {
    index,
    id,
    url,
    description,
    createdAt,
    postedBy,
    votes,
    isLoggedIn,
  } = props;

  const [vote] = useMutation(VOTE_MUTATION, {
    variables: {
      linkId: id,
    },
    // destructure vote made
    update: (cache, { data: { vote } }) => {
      // extract feed from cache
      const { feed } = cache.readQuery({
        query: FEED_QUERY,
      });

      console.log(feed.links);

      // add vote to particular link & make new array
      const updatedLinks = feed.links.map((feedLink) => {
        if (feedLink.id === id) {
          return {
            ...feedLink,
            votes: [...feedLink.votes, vote],
          };
        }

        return feedLink;
      });

      // updated cache with updated links
      cache.writeQuery({
        query: FEED_QUERY,
        data: {
          feed: {
            links: updatedLinks,
          },
        },
      });
    },
    onError: ({ message }) => console.log(message),
  });

  return (
    <div>
      <div>
        <span>{index + 1}.</span> {isLoggedIn && <span onClick={vote}>▲</span>}
        <span>
          {url}: {description}
        </span>
      </div>
      {isLoggedIn && (
        <div>
          {votes.length} votes | by {postedBy ? postedBy.name : "Unknown"}{" "}
          {timeDifferenceForDate(createdAt)}
        </div>
      )}
      <hr />
      <hr />
    </div>
  );
};

export default Link;
