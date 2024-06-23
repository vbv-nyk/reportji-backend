import {gql} from "graphql-tag"
export const typeDefs =  gql` 
  """
    Returns the language, provided the content
  """
  type Query {
    Title(content: String!): String
    Subtitle(content: String!): String
    Heading(content: String!): String
    Author(content: String!): String
    Date(content: String!): String
    Paragraphs(paragraphs: [String!]): String
    Items(items: [String!]): String
    Figures(figures: [String!]): String
    Citations(citations: [String!]): String
    Table(rows: [[String]]!): String
  } 
`;