import express from "express";
import _ from "lodash";
import minimist from "minimist";
import dotenv from "dotenv";

export const app = express();

dotenv.config();

const args = minimist(process.argv.slice(2));

app.get("/", (req:any, res:any) => {
    const chunked = _.chunk([1,2,3,4], 2);
    res.send(`Args: ${JSON.stringify(args)} Chunked: ${JSON.stringify(chunked)}`);
});

if (process.env.NODE_ENV !== "test") {
    const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}
