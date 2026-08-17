import { z } from "zod"
import prisma from "./prisma";
import type { FileRouter } from 'uploadthing/next';
import { createUploadthing } from 'uploadthing/next';


const f = createUploadthing();

export const ourFileRouter = {
  avatarUploader: f(['image'])
    .middleware(() => {
      return {};
    })
    .onUploadComplete(({ file }) => {
      return { url: file.ufsUrl };
    }),
  
  editorUploader: f(['image', 'text', 'blob', 'pdf', 'video', 'audio'])
    .input(z.object({ documentId: z.string() }))   // The document id the refs belong to
    .middleware(({ input }) => {
      return { documentId: input.documentId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      try {
        await prisma.ref.create({
          data: {
            key: file.key,
            type: file.type,
            url: file.ufsUrl,
            documentId: metadata.documentId,
          },
        });
      } catch (error) {
        if (error instanceof Error) throw error;
        throw new Error(String(error));
      }

      return {
        key: file.key,
        name: file.name,
        size: file.size,
        type: file.type,
        url: file.ufsUrl,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
