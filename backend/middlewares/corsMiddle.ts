import { Request, Response, NextFunction } from "express";
// filter out undefined values to make sure that array is of strings
const allowedOriginLArr: string[] = [
    process.env.MY_SITE_FRONTEND_URL,
    process.env.LOCALHOST_FRONTEND_URL,
].filter((url): url is string => Boolean(url));

// cors setuop to only my mysite
export const corsFuncAllowedOrigins = (req: Request, res: Response, next: NextFunction) => {

    const origin = req.headers.origin;
    const referer = req.headers.referer;

    // checking if origin is in arr or if not handling undefined origin safely
    const isMyOrigin = origin ? allowedOriginLArr.includes(origin) : false;

    // .some is an array method. it chexks whole array adn if even any one condition is true it returns true
    // without checkign any other and we are not using includes(); becauees it asks only for plain value not a func
    // adn here we need to use startsWith(); method 
    const isMyReferer = referer 
    ? allowedOriginLArr.some((url) => {
        return url && referer.startsWith(url);
    }) : false;

    if (!isMyOrigin && !isMyReferer) {
        return res.status(403).json({
            error: "UNAUTHORIZED_CLIENT",
            message: "Direct API requests or third-party apps are not allowed. Please visit our website."
        });
    }
    if (origin) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }
    next();
};



