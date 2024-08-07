
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "backoffice",

    SERVER_HOST: string
    SERVER_PORT: string
    DB_URL: string
    DB_MASTER_TOKEN: string
    DB_COMMON_TOKEN: string
  }
}
