export const resolvers = {
  Query: {
    getTitle: (parent, args, contextValue, info) => {
      let { content } = args;
      return `title: \"${content}\";`;
    },
    getSubtitle: (parents, args, contextValue, info) => {
      let { content } = args;
      return `subtitle: \"${content}\";`;
    },
    getHeading: (parents, args, contextValue, info) => {
      let { content } = args;
      return `heading: \"${content}\";`;
    },
    getAuthor: (parents, args, contextValue, info) => {
      let { content } = args;
      return `author: \"${content}\";`;
    },
    getDate: (parents, args, contextValue, info) => {
      let { content } = args;
      return `date: \"${content}\";`;
    },
    getParagraphs: (parents, args, contextValue, info) => {
      let { paragraphs } = args;
      return `paragraphs: [\n  ${
        paragraphs.map((paragraph) => `\"${paragraph}\"\n`) + "\n]"
      }`;
    },
    getItems: (parents, args, contextValue, info) => {
      let { items } = args;
      return `items: ${items.map((item) => `\"${item}\"\n`)}`;
    },
    getFigures: (parents, args, contextValue, info) => {
      let { figures } = args;
      return `figures: ${figures.map((figure) => `\"${figure}\"\n`)}`;
    },
    getTable: (parents, args, contextValue, info) => {
      let { rows } = args;
      rows = rows.map((row) => "[" + row.map((cell) => `\"${cell}\"`) + "]\n");
      return `differences: [\n${rows}\n]`;
    },
  },
}