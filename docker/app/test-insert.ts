import { Client as pgClient } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

const metadata = {
  a: 1,
  b: new Date(),
  c: 10902877
};

const client = new pgClient();
// {
//   user: "webstats",
//   database: "webstats",
//   hostname: "localhost",
//   port: 5432,
// });

await client.connect();
const result = await client
  .queryObject`INSERT INTO public.raw_events(metadata) VALUES(${metadata}) RETURNING created_at;`;
console.log(result.rows);
await client.end();
