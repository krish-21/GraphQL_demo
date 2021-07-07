`
mutation {
  login(email: "abc@def", password:"abc") {
    token
    user {
      id
      name
      links {
        url
        description
      }
    }
  }
}
`;
