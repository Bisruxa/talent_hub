import bcrypt from "bcrypt";
import env from "../../env.js";
export const hashPassword = async (password) => {
    return bcrypt.hash(password, env.BCRYPT_ROUNDS);
};
export const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};
//# sourceMappingURL=password.js.map