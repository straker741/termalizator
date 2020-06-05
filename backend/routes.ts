import { Router } from "https:deno.land/x/oak/mod.ts";
import { getConfig, putConfig, getData, optionsConfig } from "./controllers/termalizator.ts";


const router = new Router();

// Public
router.get("/data", getData);
router.get("/config", getConfig);
router.put("/config", putConfig);
router.options("/config", optionsConfig);


export default router;