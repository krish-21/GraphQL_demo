`
query {
  feed {
    links {
      id
    	url
    	description
    	postedBy {
      	id
      	name
    	}
    }
    count
  }
  
  # feed(filter: "graph") {
  #   links {
  #     id
  #   	url
  #   	description
  #   	postedBy {
  #     	id
  #     	name
  #   	}
  #   }
  #   count
  # }
  
  # feed(skip: 1, take:2) {
  #   links {
  #     id
  #   	url
  #   	description
  #   	postedBy {
  #     	id
  #     	name
  #   	}
  #   }
  #   count
  # }
  
  # feed(orderBy: { createdAt: desc }) {
  #   links {
  #     id
  #   	url
  #   	description
  #   	postedBy {
  #     	id
  #     	name
  #   	}
  #   }
  #   count
  # }
}
`;
