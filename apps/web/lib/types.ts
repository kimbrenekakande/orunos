import { z } from 'zod';
export interface Mdprops {
  id : string
  title : string
  content : string
}

export const outlineSchema = z.object({
  title : z.string(),
  summary : z.string(),
  sections : z.array(z.object({title : z.string(),content : z.string()})),
  conclusion : z.string()
});

