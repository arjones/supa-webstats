import { serve } from "https://deno.land/std@0.160.0/http/server.ts";
import { Client as pgClient } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

const port = 8080;
const client = new pgClient();

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey",
};

// Convert a HTTP HEADER into a valid JS Object Key
// Ex: 'x-real-ip' ==> xRealIp
export const httpHeader2ObjectKey = (header: string) =>
  header.replace(/-./g, (v) => v[1].toUpperCase());

const handler = async (req: Request): Promise<Response> => {
  const url = new URL(req.url);
  const destinationUrl = url.searchParams.get("url") || null;

  // Extract all HTTP Headers
  const headersMetadata = Array.from(req.headers.entries()).reduce(
    (obj, item) =>
      Object.assign(obj, { [httpHeader2ObjectKey(item[0])]: item[1] }),
    {},
  );

  const metadata = { destinationUrl, ...headersMetadata };
  await client.connect();

  const data = await client
    .queryObject`INSERT INTO public.raw_events(metadata) VALUES(${metadata});`;
  console.log(data);
  await client.end();

  return new Response("ok", { status: 200, headers: corsHeaders });
};

console.log(`HTTP webserver running. Access it at: http://localhost:${port}/`);
await serve(handler, { port });
