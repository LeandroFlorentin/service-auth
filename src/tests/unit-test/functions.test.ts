import { getBearerToken,verifyEmail,verifyPassword } from "../../utils/functions"

describe("Testing in functions files",()=>{
    it("Testing getBearerToken function", () => {
        const tokenSend = "Bearer abc";
        const token = getBearerToken(tokenSend);
        expect(token).toBeDefined();
        expect(typeof token).toEqual("string");
        expect(token).toEqual("abc");
    })

    it("Testing verifyEmail function", () => {
        const validEmail = "leandro.florentin@hotmail.com";
        const invalidEmail = "leandro.florentin@.com";
        const validEmailResult = verifyEmail(validEmail);
        const invalidEmailResult = verifyEmail(invalidEmail);
        expect(validEmailResult).toEqual(true)
        expect(invalidEmailResult).toEqual(false)
    })
    it("Testing verifyPassword function", () => {
        const validPassword = "Leandro1234";
        const invalidPassword = "leandro";
        const validPasswordResult = verifyPassword(validPassword);
        const invalidPasswordResult = verifyPassword(invalidPassword);
        expect(validPasswordResult).toEqual(true)
        expect(invalidPasswordResult).toEqual(false)
    })
})