const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function POST(
  x: Request,
  y: Deno.ServeHandlerInfo,
): Promise<Response> {
  await delay(5000);
  return new Response(x.method + " " + y.remoteAddr.hostname, {
    headers: { "content-type": "text/plain" },
  });
}
