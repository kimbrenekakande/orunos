import { auth } from "./auth";
import { headers } from "next/headers";
import {cache} from 'react'

//reduce multiple db hits by calling once and serving all requests from the same page using cache
export const serverSession = cache(async()=>{
  return await auth.api.getSession({headers : await headers()}) 
})
