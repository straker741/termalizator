export const fetchData = async (fullPath: string): Promise<{ [key: string]: any }> => {
    const data = await Deno.readFile(fullPath);
  
    const decoder = new TextDecoder();
    const decodedData = decoder.decode(data);
  
    return JSON.parse(decodedData);
};

export const saveData = async (fullPath: string, data: { [key: string]: any }): Promise<void> => {
    const encoder = new TextEncoder();
    await Deno.writeFile(fullPath, encoder.encode(JSON.stringify(data)));
};

export const updateData = async (fullPath: string, newData: { [key: string]: any }): Promise<void> => {
    let data: {
        [key: string]: any
    } = await fetchData(fullPath);

    const keys = Object.keys(data);
    for (let key of keys) {
        data[key] = (key in newData ? newData[key] : data[key]);
    }
    await saveData(fullPath, data);
};
