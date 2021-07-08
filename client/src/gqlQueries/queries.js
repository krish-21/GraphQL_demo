import { gql } from "@apollo/client";

export const FEED_QUERY = gql`
  query feedQuery($take: Int, $skip: Int, $orderBy: LinkOrderByInput) {
    feed(take: $take, skip: $skip, orderBy: $orderBy) {
      id
      links {
        id
        createdAt
        url
        description

        postedBy {
          id
          name
        }

        votes {
          id
          user {
            id
          }
        }
      }
      count
    }
  }
`;
