import {gql} from "graphql-tag"
export const typeDefs =  gql` 
  """
    Returns the language, provided the content
  """
  type User {
    id: String,
    displayName: String,
  }
  
  type Output {
    err: Boolean,
    errMsg: String,
    tex: String
  }

  type Query {
    UserDetails: User,
  } 
  
  type Mutation {
    CreateTexFile(inputJi: String!): Output
  }
`;