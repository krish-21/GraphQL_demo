import { useContext } from "react";
import { useQuery } from "@apollo/client";

import AuthContext from "../../store/auth-context";
import { FEED_QUERY } from "../../gqlQueries/queries";

import Link from "./Link";

const LinkList = () => {
  const { data } = useQuery(FEED_QUERY);
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
      {data && (
        <>
          <h3>{data.feed.count}</h3>
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
