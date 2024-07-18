export const DefaultEnv = {
	DEV_MODE: process.env.NODE_ENV === "development",
	PORT: parseInt(process.env.PORT ?? "3000"),
	HOSTNAME: process.env.HOSTNAME ?? "",
	SUPA_REST_URL: process.env.SUPA_REST_URL ?? "",
	SUPA_KEY: process.env.SUPA_KEY ?? "",
} as const;
