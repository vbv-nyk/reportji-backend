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
  type OutputPdf {
    err: Boolean,
    errMsg: String,
    pdf: String
  }

  type Query {
    UserDetails: User,
  } 
  
  type Mutation {
    CreateTexFile(inputJi: String!): Output
    CreatePDF(texFile: String): OutputPdf
    
  }
`;