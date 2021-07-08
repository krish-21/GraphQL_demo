import { useContext, useState } from "react";
import { useLazyQuery } from "@apollo/client";

import Link from "./Link";

import AuthContext from "../../store/auth-context";
import { FEED_SEARCH_QUERY } from "../../gqlQueries/queries";

const SearchLink = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [executeSearch, { data }] = useLazyQuery(FEED_SEARCH_QUERY);

  const { isLoggedIn } = useContext(AuthContext);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (searchTerm.trim().length === 0) {
      return;
    }

    executeSearch({ variables: { filter: searchTerm } });
  };

  return (
    <div>
      <>
        Search
        <form onSubmit={handleFormSubmit}>
          <input
            name="searchTerm"
            type="text"
            onChange={handleInputChange}
            value={searchTerm}
          />
          <button type="submit">Search</button>
        </form>
      </>
      <hr />
      <>
        Results
        <div>
          {data &&
            data.feed.links.map((link, index) => (
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
        </div>
      </>
    </div>
  );
};

export default SearchLink;
