import { useQuery, gql } from "@apollo/client";

import Link from "./Link";

const FEED_QUERY = gql`
  query feedQuery {
    feed {
      id
      links {
        id
        createdAt
        url
        description
      }
      count
    }
  }
`;

const LinkList = () => {
  const { data } = useQuery(FEED_QUERY);

  return (
    <div>
      {data && (
        <>
          <h3>{data.feed.count}</h3>
          <div>
            {data.feed.links.map((link) => (
              <Link
                key={link.id}
                url={link.url}
                description={link.description}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LinkList;
