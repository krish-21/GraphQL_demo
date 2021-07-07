`
mutation {
  vote(linkId: "ckqt6d44g0000hvxoj2c5a07h") {
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

// HTTP Headers
const headers = {
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJja3F0NjAyc20wMDI5NHR4bzhsZzJyanFuIiwiaWF0IjoxNjI1NjQzMjIzfQ.nYT2mcDSsrli8Dqpa8chcKcWxkkicf2Vr5W-Pwcq_1I",
};
