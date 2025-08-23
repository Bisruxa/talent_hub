import { SignJWT } from "jose";
import { createSecretKey } from "crypto";
import env from "../../env.js";
export const generateToken = (payload) => {
    const secret = env.JWT_SECRET;
    const secretKey = createSecretKey(secret, "utf-8");
    return new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(env.JWT_EXPIRES_IN || "7d")
        .sign(secretKey);
};
//# sourceMappingURL=jwt.js.map