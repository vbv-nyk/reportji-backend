import { exec, execSync } from "child_process";
import fs from "fs/promises";

export const resolvers = {
  Mutation: {
    CreateTexFile: async (parent, args, context, info) => {
      try {
        const { inputJi } = args;
        const {id } = context.user;
        fs.mkdir(`${id}`, {recursive: true});
        await fs.writeFile(`${id}/input.ji`, inputJi, "utf-8");
        execSync(`./main ${id}/input.ji`);
        const data = await fs.readFile("output.tex");
        const tex = data.toString();
        return {
          err: false,
          errMsg: "None",
          tex,
        };
      } catch (err) {
        console.log(err);
        return {
          err: true,
          errMessage: err,
          tex: "Error",
        };
      }
    },
  },
  Query: {
    UserDetails: (parent, args, context, info) => {
      console.log("Authenticated User:", context.user);
      const { id, displayName } = context.user;
      return {
        id,
        displayName,
      };
    },
  },
};
