const express = require("express")
const { createHandler } = require("graphql-http/lib/use/express")
const { buildSchema, getNamedType } = require("graphql")
const { ruruHTML } = require("ruru/server")
 
// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    getTitle(content: String): String
    getSubttitle(content: String): String
    getHeading(content: String): String
    getAuthor(content: String): String
    getDate(content: String): String
    getParagraphs(paragraphs: [String]): String
    getItems(items: [String]): String
    getFigures(figures: [String]): String
    getCitations(citations: [String]): String
  }
`)
 
// The root provides a resolver function for each API endpoint
const root = {
  getTitle({content}) {
    return `title: "${content};"` 
  },
  getSubtitle({content}){
    return `subtitle: ${content};`
  },
  getHeading({content}) {
    return `heading: ${content};`
  },
  getAuthor({content}){
    return `author: ${content};`
  },
  getDate({content}) {
    return `date: ${content};`
  },
  getParagraphs({paragraphs}) {
    return `paragraphs: ${paragraphs.map(paragraph => `"${paragraph}",`)}` 
  }
}
 
const app = express()
app.all(
  "/graphql",
  createHandler({
    schema: schema,
    rootValue: root,
  })
)

app.get('/', (req,res) => {
    res.type('html')    
    res.end(ruruHTML({endpoint: '/graphql'}))
}) 

app.listen(3000)