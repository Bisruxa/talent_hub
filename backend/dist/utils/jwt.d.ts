import { type JWTPayload } from "jose";
export interface MyJWTPayload extends JWTPayload {
    id: string;
    email: string;
    name: string;
    role: string;
}
export declare const generateToken: (payload: MyJWTPayload) => Promise<string>;
