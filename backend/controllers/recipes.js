const { RecipeSchema, RecipeOptions } = require("../schemas");
const {
    getJsonData,
    saveJsonData,
    updateJsonData
} = require("../middleware/jsonHandler");
const { BASE_PATH } = require("../settings");


// @desc    Returns recipes
// @route   GET:/api/recipes
const getRecipes = (req, res) => {
    try {
        const data = getJsonData(BASE_PATH + "recipes.json");

        console.log("Status:  ", 200);
        res.status(200);
        res.json(data);
    }
    catch (err) {
        console.log("Status:  ", 500);
        console.log(err);
        res.status(500);
        res.send("Internal Server Error");
    }
};


// @desc    Returns single recipe
// @route   GET:/api/recipes/:id
const getRecipe = (req, res) => {
    try {
        const data = getJsonData(BASE_PATH + "recipes.json");

        const recipe = data.find(element => element.id == req.params.id);

        console.log("Status:  ", 200);
        res.status(200);
        res.json(recipe);
    }
    catch (err) {
        console.log("Status:  ", 500);
        console.log(err);
        res.status(500);
        res.send("Internal Server Error");
    }
};


// @desc    Adds a recipe
// @route   POST:/api/recipes
const postRecipe = (req, res) => {
    try {
        RecipeSchema.validate(req.body, RecipeOptions).then(body => {
            console.log("Validation successful!");

            const data = getJsonData(BASE_PATH + "recipes.json");
            const maxID = data[data.length - 1].id;
            
            const recipe = { id: maxID + 1, ...body };
            const recipes = [...data, recipe];

            saveJsonData(BASE_PATH + "recipes.json", recipes);
    
            console.log("Status:  ", 201);
            res.status(201);
            res.send("");
        }).catch(error => {
            console.log("Validation not successful!");
            console.log(error);
            console.log("Status:  ", 400);
            res.status(400);
            res.send("");
        });
    }
    catch (err) {
        console.log("Status:  ", 500);
        console.log(err);
        res.status(500);
        res.send("Internal Server Error");
    }
};


// @desc    Updates a recipe
// @route   PUT:/api/recipes
const putRecipe = (req, res) => {
    try {
        RecipeSchema.validate(req.body, RecipeOptions).then(body => {
            console.log("Validation successful!");
            const data = getJsonData(BASE_PATH + "recipes.json");
            const recipe = body;

            const recipes = data.map(element => {
                return (element.id == recipe.id ? recipe : element);
            });
            
            saveJsonData(BASE_PATH + "recipes.json", recipes);

            console.log("Status:  ", 204);
            res.status(204);
            res.send("");
        }).catch(error => {
            console.log("Validation not successful!");
            console.log(error);
            console.log("Status:  ", 400);
            res.status(400);
            res.send("");
        })
    }
    catch (err) {
        console.log("Status:  ", 500);
        console.log(err);
        res.status(500);
        res.send("Internal Server Error");
    }
};


// @desc    Deletes a recipe
// @route   DELETE:/api/recipes/:id
const deleteRecipe = (req, res) => {
    try {
        const data = getJsonData(BASE_PATH + "recipes.json");
        const recipes = data.filter(element => {
            return element.id != req.params.id;
        });

        saveJsonData(BASE_PATH + "recipes.json", recipes);

        console.log("Status:  ", 204);
        res.status(204);
        res.send("");
    }
    catch (err) {
        console.log("Status:  ", 500);
        console.log(err);
        res.status(500);
        res.send("Internal Server Error");
    }
};


module.exports = { getRecipes, getRecipe, postRecipe, putRecipe, deleteRecipe };
