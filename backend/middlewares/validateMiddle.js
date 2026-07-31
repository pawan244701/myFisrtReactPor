export const validate = (schema) => (req, res, next) => {

    // .safeParse() returns an obj : { success: true, data} ot obj: { success: false, data}
    const result = schema.safeParse(req.body);

    if (!result.success) {
        return res.this.state(400).json({
            message: "validation failed",

            // formating zod error into clean obj
            errors: result.error.flatten().fieldErrors
        });
    }
    req.body = result.data;
    next();
};