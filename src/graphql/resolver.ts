import { exec, execSync } from "child_process";
import fs from "fs/promises";
import { pool } from "../database/postgres-config.js";
import { QueryResult } from "pg";
import { create } from "domain";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

type Document = {
  name: string;
  pages: string;
  url: string;
  document_id: number;
};
export const resolvers = {
  Mutation: {
    CreateTexFile: async (parent, args, context, info) => {
      try {
        const { inputJi, name, pagesData } = args;
        const { id } = context.user;
        fs.mkdir(`outputs/${id}`, { recursive: true });
        await fs.writeFile(`outputs/${id}/input.ji`, inputJi, "utf-8");
        execSync(`./main outputs/${id}/input.ji`);
        const data = await fs.readFile("output.tex");
        const tex = data.toString();

        const create_pdf = await pool.query(
          `insert into documents (user_id, name, pages) 
          values ($1, $2, $3)
          returning document_id;
        `,
          [id, name, pagesData]
        );
        console.log(create_pdf);
        return {
          document_id: create_pdf.rows[0].document_id,
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
        const {
          texFile,
          docID
        }: { texFile: string, docID: number } = args;
        const { id } = context.user;
        if (texFile.length != 0) {
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

        let pdf = await fs.readFile(`outputs/${id}/output.pdf`);
        const client = new S3Client({ region: "ap-south-1", credentials: { accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY } });
        const command = new PutObjectCommand({ Body: pdf, Key: `${id}/${docID}`, Bucket: "reportji", ContentType: "application/pdf"});
        const response = await client.send(command);
        const url = `https://reportji.s3.ap-south-1.amazonaws.com/${id}/${docID}`;
        await pool.query(`
          update documents
          set url = $1 
          where user_id = $2 and document_id = $3
          `, [url, id, docID]);
        return {
          err: false,
          errMsg: "None",
          pdf: url,
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
      const { id, displayName } = context.user;
      return {
        id,
        displayName,
      };
    },
    RetrieveDocuments: async (parents, args, context, info) => {
      const { id } = context.user;
      try {
        const data: QueryResult<Document> = await pool.query(
          `select * from documents 
          where user_id = $1;
        `,
          [id]
        );
        const documents: Document[] = data.rows.map((document): Document => {
          const { name, pages, url, document_id } = document;
          return {
            name,
            pages,
            url,
            document_id,
          };
        });
        return documents;
      } catch (e) {
        return {
          name: '',
          pages: '',
          url: ''
        }
      }
    },
    DocumentByID: async (parent, args, context, info) => {
      const { id } = context.user;
      const { document_id } = args;
      try {
        const data: QueryResult<Document> = await pool.query(
          `select * from documents 
          where user_id = $1 and document_id = $2;
        `,
          [id, document_id]
        );
        const document: Document = data.rows[0];
        return document;
      } catch (e) {
        return {
          name: '',
          pages: '',
          url: ''
        }
      }
    },
  },
};
