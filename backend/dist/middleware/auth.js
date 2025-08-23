import { jwtVerify } from "jose";
import env from '../../env.ts';
export const authenticate = async (req, res, next) => {
    try {
        console.log("Auth middleware running, headers:", req.headers.authorization);
        const authHeader = req.headers.authorization;
        if (!authHeader)
            return res.status(401).json({ error: "Authorization header missing" });
        const token = authHeader.split(" ")[1];
        const { payload } = await jwtVerify(token, new TextEncoder().encode(env.JWT_SECRET));
        req.user = {
            id: payload.id,
            email: payload.email,
            name: payload.name,
            role: payload.role,
        };
        next();
    }
    catch (err) {
        console.error(err);
        return res.status(401).json({ error: "Invalid Token" });
    }
};
//# sourceMappingURL=auth.js.map