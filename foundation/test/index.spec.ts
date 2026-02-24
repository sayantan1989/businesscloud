import request from "supertest";
import { expect } from "chai";
import {app} from "../src/index";

describe("Express App", () => {

    it("should return status 200 on GET /", async () => {
        const res = await request(app).get("/");
        expect(res.status).to.equal(200);
    });

    it("should return chunked array in response", async () => {
        const res = await request(app).get("/");
        expect(res.text).to.include("[[1,2],[3,4]]");
    });

});