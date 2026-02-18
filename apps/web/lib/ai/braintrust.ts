import * as ai from "ai";
import { initLogger, wrapAISDK } from "braintrust";

// Initialize Braintrust as the logging backend. Uncomment below
initLogger({
  projectName: "orunos",
  apiKey: process.env.BRAINTRUST_API_KEY,
});

export const { generateText, generateObject } = wrapAISDK(ai);