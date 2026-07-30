import rateLimit from 'express-rate-limit';


// rateLimit an exteranl package that helps us to track incomign reqs from client
// so that we genrally protect server to attacks like: brutefroce
export const authLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // seting 10 minutes
    max: 10,                  // eact IP 10 attempts
    message: {
        status: 429,
        error: 'Too many Requests',
        message: 'Too many attempts! Please try again afert 10 minutes.'
    }
});
