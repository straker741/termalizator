import { Application } from "https:deno.land/x/oak/mod.ts";
import router from "./routes.ts";
import { APP_HOST, APP_PORT } from "./settings.ts";

const app = new Application();

app.addEventListener("error", (evt: any) => {
    // Will log the thrown error to the console.
    console.log(evt.error);
});

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server is running on ${APP_HOST}:${APP_PORT}`);
await app.listen({ hostname: APP_HOST, port: APP_PORT });

//deno run --allow-net --allow-read --unstable backend/server.ts
//deno run --allow-net --allow-read --allow-write server.ts
