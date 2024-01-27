const HOME = "./home";
const SCRIPT = "index.ts";

Deno.serve(async (REQUEST, INFO) => {
  if (new URL(REQUEST.url).pathname.endsWith("/")) {
    console.log(HOME + "/" + SCRIPT);
    return await import(
      HOME + new URL(REQUEST.url).pathname + SCRIPT
    ).then((IMPORT) => {
      try {
        return IMPORT[REQUEST.method](REQUEST, INFO);
      } catch (ERROR) {
        console.error(ERROR);
        return new Response("METHOD NOT ALLOWED", { "status": 405 });
      }
    }).catch((ERROR) => {
      console.error(ERROR);
      return new Response("404", { "status": 404 });
    });
  } else {
    return new Response("It is not a directory.");
  }
});
