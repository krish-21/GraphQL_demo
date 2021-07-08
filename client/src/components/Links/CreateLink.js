import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useHistory } from "react-router";

const CREATE_LINK_MUTATION = gql`
  mutation createLinkMutation($description: String!, $url: String!) {
    createLink(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;

const CreateLink = () => {
  const [urlInputValue, setUrlInputValue] = useState("");
  const [descriptionInputValue, setDescriptionInputValue] = useState("");

  const history = useHistory();

  const [createLink] = useMutation(CREATE_LINK_MUTATION, {
    variables: {
      url: urlInputValue.trim(),
      description: descriptionInputValue.trim(),
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
