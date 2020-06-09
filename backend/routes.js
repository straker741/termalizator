const cors = require('cors');
const express = require('express');
const router = express.Router();

const {
    getData,
    getConfig,
    putConfig,
    stop
} = require("./controllers/termalizator");
const {
    getRecipes,
    getRecipe,
    postRecipe,
    putRecipe,
    deleteRecipe
} = require("./controllers/recipes");


router.get("/data", getData);

// Pre-flight request for PUT:/config
router.options("/config", cors());
router.get("/config", getConfig);
router.put("/config", cors(), putConfig);
router.get("/stop", stop);


// Pre-flight request for:
//  -> POST:   /api/recipes
//  -> PUT:    /api/recipes/:id
//  -> DELETE: /api/recipes/:id
router.options(["/api/recipes", "/api/recipes/:id"], cors());
router.get("/api/recipes", cors(), getRecipes);
router.get("/api/recipes/:id", cors(), getRecipe);
router.post("/api/recipes", cors(), postRecipe);
router.put("/api/recipes", cors(), putRecipe);
router.delete("/api/recipes/:id", cors(), deleteRecipe);


module.exports = router;
