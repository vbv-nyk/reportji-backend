import { exec, execSync } from "child_process";
import fs from "fs/promises";
import { pool } from "../database/postgres-config.js";

export const resolvers = {
  Mutation: {
    CreateTexFile: async (parent, args, context, info) => {
      try {
        const { inputJi,name,pagesData } = args;
        const { id } = context.user;
        fs.mkdir(`outputs/${id}`, { recursive: true });
        await fs.writeFile(`outputs/${id}/input.ji`, inputJi, "utf-8");
        execSync(`./main outputs/${id}/input.ji`);
        const data = await fs.readFile("output.tex");
        const tex = data.toString();

        console.log(pagesData);
      const create_pdf = await pool.query(`insert into documents (user_id, name) 
          values ($1, $2);
        `, [id, name]);
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
    CreatePDF: async (parent, args, context, info) => {
      try {
        const { texFile, name, pagesData }: {texFile: string, name: string, pagesData: string} = args;
        const { id } = context.user;
        if(texFile.length != 0) {
          await fs.writeFile(`outputs/${id}/output.tex`, texFile, "utf-8");
        }
        execSync(
          `pdflatex -interaction=nonstopmode -output-directory=outputs/${id} output.tex `
        );
        execSync(
          `pdflatex -interaction=nonstopmode -output-directory=outputs/${id} output.tex `
        );
        execSync(
          `rm outputs/${id}/output.aux outputs/${id}/output.lof outputs/${id}/output.log outputs/${id}/output.toc outputs/${id}/output.out`
        );
        let data: string = await fs.readFile(`outputs/${id}/output.pdf`, {encoding: "base64"});
        return {
          err: false,
          errMsg: "None",
          pdf: data,
        };
      } catch (err) {
        return {
          err: true,
          errMessage: err,
          pdf: `Error when generating pdf ${err}`,
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
