import { PrismaVectorStore } from "@langchain/community/vectorstores/prisma";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PrismaClient, Prisma, User } from "@prisma/client";

import { DEFAULT_EMBEDDING_MODEL } from "../constants";

const db = new PrismaClient();

console.log("received in searchUsersVectorStore function");

export const vectorStore = PrismaVectorStore.withModel<User>(db).create(
  new OpenAIEmbeddings({
    modelName: DEFAULT_EMBEDDING_MODEL,
  }),

  {
    prisma: Prisma,
    // @ts-ignore
    tableName: "users",
    vectorColumnName: "bioEmbedding",
    columns: {
      id: PrismaVectorStore.IdColumn,
      bio: PrismaVectorStore.ContentColumn,
    },
  }
);

export const vectorStoreSelfDescription = PrismaVectorStore.withModel<User>(
  db
).create(
  new OpenAIEmbeddings({
    modelName: DEFAULT_EMBEDDING_MODEL,
  }),
  {
    prisma: Prisma,
    // @ts-ignore
    tableName: "user_details",
    vectorColumnName: "selfDescriptionEmbedding",
    columns: {
      id: PrismaVectorStore.IdColumn,
      selfDescription: PrismaVectorStore.ContentColumn,
    },
  }
);

export const vectorStorePastExperience = PrismaVectorStore.withModel<User>(
  db
).create(
  new OpenAIEmbeddings({
    modelName: DEFAULT_EMBEDDING_MODEL,
  }),
  {
    prisma: Prisma,
    // @ts-ignore
    tableName: "user_details",
    vectorColumnName: "pastExperienceEmbedding",
    columns: {
      id: PrismaVectorStore.IdColumn,
      pastExperience: PrismaVectorStore.ContentColumn,
    },
  }
);

export const vectorStoreInterestsAndPassions =
  PrismaVectorStore.withModel<User>(db).create(
    new OpenAIEmbeddings({
      modelName: DEFAULT_EMBEDDING_MODEL,
    }),
    {
      prisma: Prisma,
      // @ts-ignore
      tableName: "user_details",
      vectorColumnName: "interestsAndPassionsEmbedding",
      columns: {
        id: PrismaVectorStore.IdColumn,
        interestsAndPassions: PrismaVectorStore.ContentColumn,
      },
    }
  );

export const vectorStoreGoalsAndDreams = PrismaVectorStore.withModel<User>(
  db
).create(
  new OpenAIEmbeddings({
    modelName: DEFAULT_EMBEDDING_MODEL,
  }),
  {
    prisma: Prisma,
    // @ts-ignore
    tableName: "user_details",
    vectorColumnName: "goalsAndDreamsEmbedding",
    columns: {
      id: PrismaVectorStore.IdColumn,
      goalsAndDreams: PrismaVectorStore.ContentColumn,
    },
  }
);

export const vectorStoreCurrentStatus = PrismaVectorStore.withModel<User>(
  db
).create(
  new OpenAIEmbeddings({
    modelName: DEFAULT_EMBEDDING_MODEL,
  }),
  {
    prisma: Prisma,
    // @ts-ignore
    tableName: "user_details",
    vectorColumnName: "currentStatusEmbedding",
    columns: {
      id: PrismaVectorStore.IdColumn,
      currentStatus: PrismaVectorStore.ContentColumn,
    },
  }
);

export const vectorStoreValueAndBelief = PrismaVectorStore.withModel<User>(
  db
).create(
  new OpenAIEmbeddings({
    modelName: DEFAULT_EMBEDDING_MODEL,
  }),
  {
    prisma: Prisma,
    // @ts-ignore
    tableName: "user_details",
    vectorColumnName: "valueAndBeliefEmbedding",
    columns: {
      id: PrismaVectorStore.IdColumn,
      valueAndBelief: PrismaVectorStore.ContentColumn,
    },
  }
);

export const vectorStoreAdditional = PrismaVectorStore.withModel<User>(
  db
).create(
  new OpenAIEmbeddings({
    modelName: DEFAULT_EMBEDDING_MODEL,
  }),
  {
    prisma: Prisma,
    // @ts-ignore
    tableName: "user_details",
    vectorColumnName: "additionalEmbedding",
    columns: {
      id: PrismaVectorStore.IdColumn,
      additional: PrismaVectorStore.ContentColumn,
    },
  }
);
