
// reading an md file into code
import { readFile } from "fs/promises";
import path from "path";
// import { useState } from "react";
const filepath = path.join( './study.md')

export const file = await readFile(filepath, 'utf-8')
