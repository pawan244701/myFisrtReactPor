// .d => stands for declaration.
// .d.ts => files contains zero exe.. code and exists solely to give type adn structural hints to TS compiler
// it got wiped during compile time, means no existence during runtime

import { Request } from "express";
declare global {                    // breaks out of module scoping and exposes these type modifications globaly across entire project
    namespace Express {             // targets the container where express keeps its internal type definations (inside node_modules/@types/express)
        interface Request {         // matches Express's existing Request interface name to preform "declaration mergeing "
            user?: {                // my optional property to Requset interfavce
                email: string;
                userId: number;
                full_name: string;
            };
        }
    }
}
