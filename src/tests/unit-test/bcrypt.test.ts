import {comparePassword, hashPassword} from "../../utils/bcrypt"

describe("Testing in bcrypt files",() => {
    it("Testing bcrypt hash", async () => {
        const password = "testPassword123"
        const hashedPassword = await hashPassword(password)
        expect(typeof hashedPassword).toEqual("string")
        expect(hashedPassword).toBeDefined()
        expect(hashedPassword).not.toEqual(password)
    })
    it("Testing bcrypt compare", async () => {
        const password = "testPassword123"
        const passwordError = "testPassword1234"
        const hashedPassword = await hashPassword(password)
        const isMatch = await comparePassword(password, hashedPassword)
        const isNotMatch = await comparePassword(passwordError, hashedPassword)
        expect(typeof isMatch).toEqual("boolean")
        expect(isMatch).toBe(true)
        expect(isNotMatch).toBe(false)
    })
})