const allowedOriginLArr = [
    process.env.MY_SITE_FRONTEND_URL,
    process.env.LOCALHOST_FRONTEND_URL
];


// cors setuop to only my mysite
export const corsFuncAllowedOrigins = (req, res, next) => {

    const origin = req.headers.origin;
    const referer = req.headers.referer;

    // checking if origin is in arr or not
    const isMyOrigin = allowedOriginLArr.includes(origin);

    // .some is an array method. it chexks whole array adn if even any one condition is true it returns true
    // without checkign any other and we are not using includes(); becauees it asks only for plain value not a func
    // adn here we need to use startsWith(); method 
    const isMyReferer = referer && allowedOriginLArr.some((url) => {
        return url && referer.startsWith(url);
    });

    if (!isMyOrigin && !isMyReferer) {
        return res.status(403).json({
            error: "UNAUTHORIZED_CLIENT",
            message: "Direct API requests or third-party apps are not allowed. Please visit our website."
        });
    }
    next();
};
