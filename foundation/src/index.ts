import express from "express";
import _ from "lodash";
import minimist from "minimist";

export const app = express();

const args = minimist(process.argv.slice(2));

app.get("/", (req:any, res:any) => {
    const chunked = _.chunk([1,2,3,4], 2);
    res.send(`Args: ${JSON.stringify(args)} Chunked: ${JSON.stringify(chunked)}`);
});

if (process.env.NODE_ENV !== "test") {
    app.listen(3000, () => {
        console.log("Server running on port 3000");
    });
}
