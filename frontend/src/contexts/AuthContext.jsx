import { createContext, useContext, useState } from "react"; // import 
const AuthContext = createContext(); // assigning it to var it's a kind of func / method that creates context obj

export const AuthProvider = ({ children }) => { // creating componenet

    // func to get full_name
    const [ isAuthorized, setIsAuthorized ] = useState(() => {
        return localStorage.getItem('authUser') || null;
    });

    //login func
    const authUserFunc = (full_name, token) => {
        localStorage.setItem('authUser', full_name);
        if ( token ) {
            localStorage.setItem('token', token);
        }
        setIsAuthorized(full_name);
    };

    // logout func
    const logout = () => {
        localStorage.removeItem('authUser');
        localStorage.removeItem('token');
        setIsAuthorized(null);
    };

    // exporting like this so that i can import it in only one line rather importing
    // useContext and AuthContext saperately

    return (
        // wrapping childern in 'AuthContext.Provider' so that wait lets 1st see what is childern
        // when we'll wrap our App.jsx inside AuthProvider like: <AuthProvider> <App /> </AuthProvider>
            // so now every single file inside App can use these funcs that we're passing in <<AuthContext.Provider> as: value={func, func1, ...}
            // because App.jsx will be passed as children here

        <AuthContext.Provider value={{isAuthorized, authUserFunc, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

    export const useAuth = () => {
        return useContext(AuthContext);
    };
// this is 'context' AKA 'React context API'
    // how it works?
    // import { createaContext } from "react";
    // assign it to variable like: const myvar = createaContext();
    // now create a COMPONENT function that asking for a parameter 
    // this COMPONENT will hold all SHARED FUNCTION those you want to use in other components
    // now in return wrap your chiledren in 



