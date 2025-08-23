import { ZodError } from "zod";
export const validateBody = (schema) => {
    return (req, res, next) => {
        try {
            const validatedData = schema.parse(req.body);
            req.body = validatedData;
            next();
        }
        catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({
                    error: "Validation Failed",
                    details: error.issues.map((err) => ({
                        field: err.path.join("."),
                        message: err.message,
                    })),
                });
            }
            next(error);
        }
    };
};
export const validateParams = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.params);
            next();
        }
        catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({
                    error: "Invalid Params",
                    details: error.issues.map((err) => ({
                        field: err.path.join("."),
                        message: err.message,
                    })),
                });
            }
            next(error);
        }
    };
};
export const validateQuery = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.query);
            next();
        }
        catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({
                    error: "Invalid Query",
                    details: error.issues.map((err) => ({
                        field: err.path.join("."),
                        message: err.message,
                    })),
                });
            }
            next(error);
        }
    };
};
//# sourceMappingURL=validation.js.map