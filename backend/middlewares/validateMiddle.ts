
import { Request, Response, NextFunction } from 'express';
import { ZodType, z } from 'zod';

export const validate = (schema: ZodType) =>
    (req: Request, res: Response, next: NextFunction) => {

        // .safeParse() returns an obj : { success: true, data} ot obj: { success: false, data}
        const result = schema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                message: "validation failed",

                errors: z.treeifyError(result.error)
            });
        }
        req.body = result.data;
        next();
    };
