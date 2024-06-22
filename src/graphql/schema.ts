import {gql} from "graphql-tag"
export const typeDefs =  gql` 
  type Query {
    getTitle(content: String): String
    getSubtitle(content: String): String
    getHeading(content: String): String
    getAuthor(content: String): String
    getDate(content: String): String
    getParagraphs(paragraphs: [String]): String
    getItems(items: [String]): String
    getFigures(figures: [String]): String
    getCitations(citations: [String]): String
    getTable(rows: [[String]]): String
  } 
`;