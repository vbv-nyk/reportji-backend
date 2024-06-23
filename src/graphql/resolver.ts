
export const resolvers = {
  Query: {
    Title: (parent, args, context, info) => {
      console.log("Authenticated User:", context.token.user);
      let { content } = args;
      return `title: \"${content}\";`;
    },
    Subtitle: (parent, args, context, info) => {
      let { content } = args;
      return `subtitle: \"${content}\";`;
    },
    Heading: (parent, args, context, info) => {
      let { content } = args;
      return `heading: \"${content}\";`;
    },
    Author: (parent, args, context, info) => {
      let { content } = args;
      return `author: \"${content}\";`;
    },
    Date: (parent, args, context, info) => {
      let { content } = args;
      return `date: \"${content}\";`;
    },
    Paragraphs: (parent, args, context, info) => {
      let { paragraphs } = args;
      return `paragraphs: [\n  ${paragraphs.map(paragraph => `\"${paragraph}\"\n`).join("")}]`;
    },
    Items: (parent, args, context, info) => {
      let { items } = args;
      return `items: ${items.map(item => `\"${item}\"\n`).join("")}`;
    },
    Figures: (parent, args, context, info) => {
      let { figures } = args;
      return `figures: ${figures.map(figure => `\"${figure}\"\n`).join("")}`;
    },
    Table: (parent, args, context, info) => {
      let { rows } = args;
      rows = rows.map(row => "[" + row.map(cell => `\"${cell}\"`).join(", ") + "]\n");
      return `differences: [\n${rows.join("")}]`;
    },
  },
};