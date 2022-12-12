import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { supabaseClient } from "../_shared/supabaseClient.ts";

serve(async (req) => {
  const url = new URL(req.url);
  // If link fails redirect to my homepage
  const targetUrl = url.searchParams.get("u") || "https://arjon.es/links";
  const title = url.searchParams.get("ti") || "Untitled";
  // default to event type = view
  const type = url.searchParams.get("t") || "v";

  const metadata = {
    type,
    title,
    targetUrl,
    xForwardedFor: req.headers.get("x-forwarded-for"),
    userAgent: req.headers.get("user-agent"),
    referrer: req.referrer,
  };

  console.log({ metadata });
  // Stats
  const { data, error } = await supabaseClient(req)
    .from("raw_events")
    .insert({ event_type: type, metadata });

  console.log({ data, error });

  // If event type is VIEW send a transparent PNG
  if (type === "v") {
    return new Response(transparentPNG());
  }

  return Response.redirect(targetUrl, 302);
});

const transparentPNG = () => {
  const base64 =
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
  return b64toBlob(base64, "image/png");
};

const b64toBlob = (b64Data: string, contentType = "", sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};

// http https://mjvnleodkirkszvexzql.functions.supabase.co/c?u=https://example.com/&ti=Example%20Page&t=c
// http https://mjvnleodkirkszvexzql.functions.supabase.co/c?t=v
