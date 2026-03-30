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
    .middleware(() => {
      return {};
    })
    .onUploadComplete(({ file }) => {
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
