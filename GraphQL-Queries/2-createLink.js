`
mutation {
  # createLink (url: "www.howtograph1l.com", description: "Fullstack GraphQL Tutorial") {
  #   id
  # }
  
  # createLink (url: "www.facebook.com", description: "Social Media") {
  #   id
  # }
  
  createLink(url: "www.graphqlweekly.com", description: "Curated GraphQL content coming to your email inbox every Friday") {
    id
  }
}
`;

// HTTP Headers
const headers = {
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJja3F0NjAyc20wMDI5NHR4bzhsZzJyanFuIiwiaWF0IjoxNjI1NjQzMjIzfQ.nYT2mcDSsrli8Dqpa8chcKcWxkkicf2Vr5W-Pwcq_1I",
};
