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
    document_id: Int
  }

  type OutputPdf {
    err: Boolean,
    errMsg: String,
    pdf: String
  }
  
  type Document {
    pages: String
    name: String
    url: String
  }

  type Query {
    UserDetails: User,
    RetrieveDocuments: [Document],
  } 
  
  type Mutation {
    CreateTexFile(inputJi: String!, name: String!, pagesData: String!): Output
    CreatePDF(texFile: String!): OutputPdf
  }
`;