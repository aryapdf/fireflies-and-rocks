import { defineConfig, env } from "prisma/config";
import "dotenv/config";

export default defineConfig({
  schema: "./packages/db/schema.prisma",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
