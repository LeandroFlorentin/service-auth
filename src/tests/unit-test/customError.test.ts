import CustomError from "../../utils/customError";

describe("Testing in customError files", () => {
    it("Testing CustomError constructor", () => {
        const error = new CustomError("Test error message", 400,);
        expect(typeof error).toEqual("object");
        expect(error.message).toEqual("Test error message");
        expect(error.status).toEqual(400);
    });
    it("Testing CustomError with default status", () => {
        const error = new CustomError("Default status error");
        expect(typeof error).toEqual("object");
        expect(error.message).toEqual("Default status error");
        expect(error.status).toEqual(500); 
    });
});