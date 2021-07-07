`
subscription {
  # newLink {
  #   id
  #   url
  #   description
  #   postedBy {
  #     id
  #     name
  #   }
  # }
  
  newVote {
    id
    link {
      id
      url
    }
    user {
      id
      name
    }
  }
}
`;
