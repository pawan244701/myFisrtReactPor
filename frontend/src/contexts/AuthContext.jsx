import { createContext, useContext, useState } from "react";
const AuthContext = createContext(); // assigning it to var it's a kind of func / method that creates context obj

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(() => {
        return localStorage.getItem('authUser') || null;
    });

    // here storing token in state so that in every file dealing with token 
    // can use dericatly without touching localstorage manually 
    const [token, setToken] = useState(() => {
        return localStorage.getItem('token') || null;
    });

    const authUserFunc = (full_name, authToken) => {
        localStorage.setItem('authUser', full_name);
        setUser(full_name);

        if (authToken) {
            localStorage.setItem('token', authToken);
            setToken(authToken);
        }
    };
    const logout = () => {
        localStorage.removeItem('authUser');
        localStorage.removeItem('token');
        setUser(null);
        setToken(null);
    };

    return (
        // wrapping childern in 'AuthContext.Provider' so that wait lets 1st see what is childern
        // when we'll wrap our App.jsx inside AuthProvider like: <AuthProvider> <App /> </AuthProvider>
            // so now every single file inside App can use these funcs that we're passing in <<AuthContext.Provider> as: value={func, func1, ...}
            // because App.jsx will be passed as children here

        <AuthContext.Provider 
        value={{
            user,
            token, // passing it so other can use
            isAuthorized: !!token, // this will return boolean True if token exists 
            authUserFunc, 
            logout
        }}
            >
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


