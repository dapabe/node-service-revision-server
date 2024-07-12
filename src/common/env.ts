

export const DefaultEnv = {
  PORT: process.env.PORT ?? 3000,
  SUPA_URL: process.env.SUPA_URL ?? "",
  SUPA_PUB_KEY: process.env.SUPA_PUB_KEY ?? ""
} as const