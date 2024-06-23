export const resolvers = {
  Query: {
    Title: (parent, args, contextValue, info) => {
      let { content } = args;
      return `title: \"${content}\";`;
    },
    Subtitle: (parents, args, contextValue, info) => {
      let { content } = args;
      return `subtitle: \"${content}\";`;
    },
    Heading: (parents, args, contextValue, info) => {
      let { content } = args;
      return `heading: \"${content}\";`;
    },
    Author: (parents, args, contextValue, info) => {
      let { content } = args;
      return `author: \"${content}\";`;
    },
    Date: (parents, args, contextValue, info) => {
      let { content } = args;
      return `date: \"${content}\";`;
    },
    Paragraphs: (parents, args, contextValue, info) => {
      let { paragraphs } = args;
      return `paragraphs: [\n  ${
        paragraphs.map((paragraph) => `\"${paragraph}\"\n`) + "\n]"
      }`;
    },
    Items: (parents, args, contextValue, info) => {
      let { items } = args;
      return `items: ${items.map((item) => `\"${item}\"\n`)}`;
    },
    Figures: (parents, args, contextValue, info) => {
      let { figures } = args;
      return `figures: ${figures.map((figure) => `\"${figure}\"\n`)}`;
    },
    Table: (parents, args, contextValue, info) => {
      let { rows } = args;
      rows = rows.map((row) => "[" + row.map((cell) => `\"${cell}\"`) + "]\n");
      return `differences: [\n${rows}\n]`;
    },
  },
}