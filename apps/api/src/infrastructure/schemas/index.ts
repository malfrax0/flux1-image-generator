import fs from "node:fs/promises";
import { mergeTypeDefs } from "@graphql-tools/merge";
import path from "node:path";

export const getTypeDefs = async () => {
    const files = await fs.readdir(__dirname);

    console.log(__dirname)
    console.log(files);
    const allSchema = [];
    for (const file of files) {
        if (file.endsWith(".graphql")) {
            console.log(`Loading ${file}`)
            const schemaData = await fs.readFile(path.join(__dirname, file));
            allSchema.push(schemaData.toString());
        }
    }

    return mergeTypeDefs(allSchema);
}

export default getTypeDefs;