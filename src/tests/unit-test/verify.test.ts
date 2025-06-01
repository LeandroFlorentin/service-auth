import { verifyBody } from "../../utils/verify";

describe("Testing in verify files", () => {
    it("Testing verifyBody function with valid parameters",()=> {
        const elements = ["name", "email"];
        const body = { name: "John Doe", email: "leandro@hotmail.com"}
        const isValid = verifyBody(elements, body);
        expect(isValid).toBe(true);
    })
    it("Testing verifyBody function with missing elements", () => {
        const elements = ["name", "email"];
        const body = { name: "John Doe", email:"" };
        const isValid = verifyBody(elements, body);
        expect(isValid).toBe(false);
    })
})