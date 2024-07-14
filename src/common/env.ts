
export const DefaultEnv = {
  PORT: parseInt(process.env.PORT ?? "3000"),
  SUPA_REST_URL: process.env.SUPA_REST_URL ?? "",
  SUPA_KEY: process.env.SUPA_KEY ?? "",
} as const