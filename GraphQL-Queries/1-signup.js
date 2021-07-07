`
mutation {
  signup(email: "pqr@def", password: "abc", name: "abc") {
    user {
      id
      name
      email
    }
    token
  }
}
`;
