import express from "express";
import _ from "lodash";
import minimist from "minimist";

const app = express();

const args = minimist(process.argv.slice(2));

app.get("/", (req, res) => {
    const chunked = _.chunk([1,2,3,4], 2);
    res.send(`Args: ${JSON.stringify(args)} Chunked: ${JSON.stringify(chunked)}`);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});