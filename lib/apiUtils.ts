import OpenAI from "openai";
import { Configuration, OpenAIApi, OpenAIFile } from "openai-edge";
import { DEFAULT_CHAT_MODEL, DEFAULT_EMBEDDING_MODEL } from "./constants";
import { type User } from "@prisma/client";

export const openai = new OpenAI();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  // Add a basePath to the Configuration
  basePath: "https://oai.hconeai.com/v1",
  baseOptions: {
    headers: {
      // Add your Helicone API Key
      "Helicone-Auth": `Bearer ${process.env.HELICONE_API_KEY}`,
    },
  },
});

export const openaiEdge = new OpenAIApi(configuration);

// Same as above but for OpenAI edge implemented by Vercel.
export function userOpenAIEdge(user: User): OpenAIApi {
  const userConfiguration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    basePath: "https://oai.hconeai.com/v1",
    baseOptions: {
      headers: {
        "Helicone-Auth": `Bearer ${process.env.HELICONE_API_KEY}`,
        "Helicone-User-Id": user.email,
      },
    },
  });
  return new OpenAIApi(userConfiguration);
}

// Given a string `prompt`, return an array of numbers representing the
// embedding of the prompt according to the OpenAI API.
export async function getEmbedding(prompt: string): Promise<Array<number>> {
  const response = await openai.embeddings.create({
    model: DEFAULT_EMBEDDING_MODEL,
    input: prompt,
  });
  const embedding = response.data[0].embedding;
  return embedding;
}

// Given a system prompt and a single user message, call the OpenAI API to get
// the bot's completion.
export async function getSingleCompletion(
  systemPrompt: string,
  userMessage: string
): Promise<string> {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage },
    ],
    model: DEFAULT_CHAT_MODEL,
  });

  return completion.choices[0].message.content || "";
}
