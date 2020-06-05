import { Status } from "https://deno.land/std/http/http_status.ts";
import { Context } from "https:deno.land/x/oak/mod.ts";
import FastestValidator from "https://dev.jspm.io/fastest-validator";
import { fetchData, updateData } from "../middlewares/configMiddleware.ts";
import { BASE_DIR, GPIO_HANDLER } from "../settings.ts";
import { ConfigSchema } from "../types.ts";
import { startIfIsNot } from "../middlewares/processes.ts";

const v = new FastestValidator();


export const optionsConfig = (ctx: Context) => {
    console.log("# ----- OPTIONS:/config ----- #");
    ctx.response.headers = new Headers();
    ctx.response.headers.append("Access-Control-Allow-Origin", "*");
    ctx.response.headers.append("Access-Control-Allow-Methods","POST,PUT");
    ctx.response.headers.append("Access-Control-Allow-Headers", "Content-Type");
    ctx.response.headers.append("Connection", "keep-alive");
    ctx.response.headers.append("Access-Control-Max-Age", "86400");
    ctx.response.status = Status.NoContent;
}


// @desc    Returns data
// @route   Get /data
export const getData = async (ctx: Context) => {
    ctx.response.headers = new Headers();
    ctx.response.headers.append("Access-Control-Allow-Origin", "*");
    ctx.response.headers.append('Access-Control-Allow-Methods','GET,POST,PUT');
    ctx.response.headers.append('Content-Type','application/json');
    try {
        console.log("# ----- GET:/data ----- #");
        const data: {
            [key: string]: any
        } = await fetchData(BASE_DIR + "data.json")
        console.log("Status:", Status.OK);
        ctx.response.status = Status.OK;
        ctx.response.body = data;
    }
    catch (err) {
        console.log("BASE_DIR invalid!");
        console.log(err);
        console.log("Status:", Status.InternalServerError);
        ctx.response.status = Status.InternalServerError;
        ctx.response.body = "Internal Server Error";
    }
}


// @desc    Returns configuration
// @route   Get /config
export const getConfig = async (ctx: Context) => {
    ctx.response.headers = new Headers();
    ctx.response.headers.append("Access-Control-Allow-Origin", "*");
    ctx.response.headers.append('Access-Control-Allow-Methods','GET,POST,PUT');
    ctx.response.headers.append('Content-Type','application/json');
    try {
        console.log("# ----- GET:/config ----- #");
        const config: {
            [key: string]: any
        } = await fetchData(BASE_DIR + "config.json");
        console.log("Status:", Status.OK);
        ctx.response.status = Status.OK;
        ctx.response.body = config;
    }
    catch (err) {
        console.log("BASE_DIR invalid!");
        console.log(err);
        console.log("Status:", Status.InternalServerError);
        ctx.response.status = Status.InternalServerError;
        ctx.response.body = "Internal Server Error";
    }
};


// @desc    Updates configuration
// @route   PUT /config
export const putConfig = async (ctx: Context) => {
    ctx.response.headers = new Headers();
    ctx.response.headers.append("Access-Control-Allow-Origin", "*");
    ctx.response.headers.append('Access-Control-Allow-Methods','GET,POST,PUT');
    try {
        console.log("# ----- PUT:/config ----- #");
        if (!ctx.request.hasBody) {
            console.log("Status:", Status.BadRequest);
            ctx.response.status = Status.BadRequest;
            ctx.response.body = {
                success: false,
                msg: "Invalid input!"
            };
        }
        else {
            const { value } = await ctx.request.body();
            const result: Boolean | Array<object> = v.validate(value, ConfigSchema);
    
            if (result === true && value.length !== 0) {
                console.log("Validation successful!");
                const config: {
                    [key: string]: any
                } = value;
    
                await updateData(BASE_DIR + "config.json", config);
                await startIfIsNot(GPIO_HANDLER);
                
                console.log("Status:", Status.OK);
                ctx.response.status = Status.OK;
                ctx.response.body = {
                    msg: "You have succeessfully updated configuration."
                };
            }
            else {
                console.log("Validation not successful!");
                console.log(result);
                console.log("Status:", Status.BadRequest);
                ctx.response.status = Status.BadRequest;
                ctx.response.body = {
                    msg: "Invalid input!"
                };
            }  
        }
    }
    catch (err) {
        console.log("BASE_DIR invalid!");
        console.log(err);
        console.log("Status:", Status.InternalServerError);
        ctx.response.status = Status.InternalServerError;
        ctx.response.body = "Internal Server Error";
    }
};


