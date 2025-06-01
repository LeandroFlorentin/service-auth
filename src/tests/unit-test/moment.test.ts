import { getDate } from "../../utils/moment";

describe("Testing in moment files", () => {
    it("Testing getDate function with date parameter", () => {
        const date = "2023-10-01";
        const formattedDate = getDate(date);
        expect(formattedDate).toBeDefined();
        expect(typeof formattedDate).toEqual("string")
    })
    it("Testing getDate function without date parameter", () => {
        const formattedDate = getDate();
        expect(formattedDate).toBeDefined();
        expect(typeof formattedDate).toEqual("string");
    })
    it("Testing getDate function with invalid date parameter", () => {
        const date = "invalid-date";
        const formattedDate = getDate(date);
        expect(formattedDate).toBeDefined();
        expect(typeof formattedDate).toEqual("string");
        expect(formattedDate).toEqual("Invalid date");
    })
})