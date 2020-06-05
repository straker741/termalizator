import { exec, OutputMode } from "https://deno.land/x/exec/mod.ts";

export const startIfIsNot = async (process: string): Promise<Boolean> => {
    let response = await exec(`bash -c "ps fx | grep ${process}"`, {output: OutputMode.Capture});

    if (response.status.code !== 0) {
        return false;
    }
    else {
        if (response.output.split('\n').length < 3) {
            const result = await exec(`nohup python3 $HOME/termalizator/scripts/${process} >/dev/null 2>&1 &`);
            return result.status.code === 0 ? true : false;
        }
        else {
            return true;
        }
    }
};

export const killProcess = async (process: string): Promise<void> => {
    await exec(`pkill -f ${process}`);
};


startIfIsNot("gpio");
// deno run --allow-read --allow-run processes.ts