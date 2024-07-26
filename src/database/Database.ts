import { Client, createClient } from "@libsql/client"
import { TABLE_NAMES, TEST_TABLE_NAMES } from "./tables"
import { drizzle, LibSQLDatabase } from "drizzle-orm/libsql"
import * as schemas from "./drizzle-schemas"

export class Database {
  static CONN: LibSQLDatabase<Record<string, never>>

  static connect() {
    const client = createClient({
      url: process.env.DB_URL,
      authToken: process.env.DB_MASTER_TOKEN
    })

    const temp = {}
    Object.entries(schemas).forEach(([k, v]) => {
      temp[k] = v
    })

    this.CONN = drizzle(client, { schema: { ...temp } })
  }

  static async populateDatabase() {
    // for (const name of Object.values(TABLE_NAMES)) {
    //   await this.CL.execute(`CREATE TABLE IF NOT EXISTS ${name}`)
    // }

    // for (const name of Object.values(TEST_TABLE_NAMES)) {
    //   await this.CL.execute(`CREATE TABLE IF NOT EXISTS ${name}`)
    // }



  }


}