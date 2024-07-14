import { exec } from "child_process";


exec(`npx supabase gen types --lang=typescript --db-url=${process.env.SUPA_DB_URL} > ./src/common/types/supabase.ts`,(err,stdout)=>{
  if(err) console.log(err.message)
  else console.log(stdout)
})