export interface JwtPayload {
    id: string;
    email: string;
    name: string;
    role: string;
}
export declare const generateToken: (payload: JwtPayload) => Promise<string>;
