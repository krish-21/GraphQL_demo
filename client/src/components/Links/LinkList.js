import { useContext } from "react";
import { useQuery } from "@apollo/client";

import AuthContext from "../../store/auth-context";
import { FEED_QUERY } from "../../gqlQueries/queries";

import {
  NEW_LINKS_SUBSCRIPTION,
  NEW_VOTES_SUBSCRIPTION,
} from "../../gqlQueries/subscriptions";

import Link from "./Link";

const LinkList = () => {
  const { isLoggedIn } = useContext(AuthContext);

  const { data, subscribeToMore } = useQuery(FEED_QUERY);

  subscribeToMore({
    document: NEW_LINKS_SUBSCRIPTION,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;
      const newLink = subscriptionData.data.newLink;
      const exists = prev.feed.links.find(({ id }) => id === newLink.id);
      if (exists) return prev;

      return Object.assign({}, prev, {
        feed: {
          links: [newLink, ...prev.feed.links],
          count: prev.feed.links.length + 1,
          __typename: prev.feed.__typename,
        },
      });
    },
  });

  subscribeToMore({
    document: NEW_VOTES_SUBSCRIPTION,
  });

  return (
    <>
      {data && (
        <>
          <h3>Total Links: {data.feed.count}</h3>
          <>
            {data.feed.links.map((link, index) => (
              <Link
                key={link.id}
                id={link.id}
                index={index}
                url={link.url}
                description={link.description}
                createdAt={link.createdAt}
                postedBy={link.postedBy}
                votes={link.votes}
                isLoggedIn={isLoggedIn}
              />
            ))}
          </>
        </>
      )}
    </>
  );
};

export default LinkList;
