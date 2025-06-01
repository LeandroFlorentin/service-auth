import { responseStructure } from "../../utils/response";

describe("Testing in response files", () => {
    it("Testing responseStructure function with valid parameters", () => {
        const status = 200;
        const message = "Success";
        const data = { id: 1, name: "Test" };
        const response = responseStructure(status, message, data);
        expect(response).toBeDefined();
        expect(response).toMatchObject({
            status,
            message,
            data
        })
    });
});