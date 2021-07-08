import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router";

import { CREATE_LINK_MUTATION } from "../../gqlQueries/mutations";
import { FEED_QUERY } from "../../gqlQueries/queries";

const CreateLink = () => {
  const [urlInputValue, setUrlInputValue] = useState("");
  const [descriptionInputValue, setDescriptionInputValue] = useState("");

  const history = useHistory();

  const [createLink] = useMutation(CREATE_LINK_MUTATION, {
    variables: {
      url: urlInputValue.trim(),
      description: descriptionInputValue.trim(),
    },
    update: (cache, { data: { createLink } }) => {
      // extract feed from cache
      const { feed } = cache.readQuery({
        query: FEED_QUERY,
      });

      console.log(feed.links);

      cache.writeQuery({
        query: FEED_QUERY,
        data: {
          feed: {
            links: [createLink, ...feed.links],
          },
        },
      });
    },
    onCompleted: () => history.push("/"),
    onError: ({ message }) => console.log(message),
  });

  const handleUrlInputChange = (event) => {
    setUrlInputValue(event.target.value);
  };

  const handleDescriptionInputChange = (event) => {
    setDescriptionInputValue(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (
      urlInputValue.trim().length === 0 ||
      descriptionInputValue.trim().length === 0
    ) {
      return;
    }

    createLink();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <input
          type="text"
          placeholder="The URL for the link"
          onChange={handleUrlInputChange}
          value={urlInputValue}
        />
        <input
          type="text"
          placeholder="A description for the link"
          onChange={handleDescriptionInputChange}
          value={descriptionInputValue}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateLink;
