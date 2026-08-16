import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// jwt token: 
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
// .eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0
// .KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {

    // Express automatically parses incoming HTTP headers 
    // into a lower-case JavaScript object (req.headers), 
    // making req.headers.authorization available.
    
    // NOTE: headers as json and authorization as headers 
    // key is comming from frontend that is written in fetch call
    // something like: 
        // await fetch('http://127.0.0.1:5000/contact', {
            //   method: 'POST',
            //   headers: {
            //     'Content-Type': 'application/json',
            //     // 3. You manually attach the Authorization header here!
            //     'Authorization': `Bearer ${token}` 
            //   },
            //   body: JSON.stringify({ message: userMessage })
        // });
    
    const authHeader = req.headers.authorization;

    // if header or bearer is missing means tokem isn't provided by frontend
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: "Access denied. No token provided."
        });
    }
    
// this is the HTTP req header
    // POST /contact protocal/its version
    // Host: frontend path
    // Content-Type: application/json (i'm using)
    // Authorization: Bearer eyJhciXVCJ9.eyJ1cDAwfQ.s6K8sTV2wX
    
    // now we are splitng it to grab only the: Authorization token without the keyword: Bearer
    // now split() will break it into two parts bcoz of space saperation
// like this: 
// ["Bearer", 
// "eyJhciXVCJ9.eyJ1cDAwfQ.s6K8sTV2wX"]
    // now it's an erray so take the token means inedx[1]
const token = authHeader.split(' ')[1];
if (!token ) {
    return res.status(401).json({
        message:"Access denied. No token provided."
    });
}

try {
        // now verify() meathod is comming from JWT LIB
        // verify(): it takes token and the JWT key and ...
        // checks 3 dot format like: Header.Payload.Signature 
        // now it re-calculates the signature if token is modified so if fails
        // otherwise returns according to your code 
        // here as verif() returns decoded obj so we're storing obj in a var
        const decoded = jwt.verify(token, (process.env.JWT_KEY as string));

        // now attaching a new propertie to req named user and assigning it decoded obj 
        req.user = decoded; 
        next();
    } catch (error) {
        return res.status(403).json({
            message: "Invalid or Expired token"
        });
    }
};

