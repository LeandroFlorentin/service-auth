import { getToken, verifyToken, decodedToken } from "../../utils/jwt";

describe("JWT utils", () => {
  const data = { id: 1, username: "testuser", role:"user",email:"asd@hotmail.com" };

  it("should generate a valid JWT token", () => {
    const token = getToken(data);
    expect(typeof token).toBe("string");
  });

  it("should verify a valid JWT token", () => {
    const token = getToken(data);
    const payload = verifyToken(token) as any;
    expect(payload).toHaveProperty("data");
    expect(payload.data).toMatchObject(data);
  });

  it("should decode a valid JWT token", () => {
    const token = getToken(data);
    const decoded = decodedToken(token);
    expect(decoded).toHaveProperty("data");
    expect(decoded.data).toMatchObject(data);
  });

  it("should throw error for invalid token", () => {
    expect(() => verifyToken("invalid.token.here")).toThrow();
    expect(() => decodedToken("invalid.token.here")).toThrow();
  });
});