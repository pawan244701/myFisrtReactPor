import { createContext, useContext, useState } from "react";
import { useEffect } from "react";
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

    const [ isVisible, setIsVisible ] = useState(false);
    const [ profileDetails, setProfileDetails ] = useState(null);

    const checkUserProfile = async (authToken) => {
        const activeToken = authToken || token;
        if (!activeToken) {
            setIsVisible(false);
            setProfileDetails(null);
            return;
        }
        // VITE_MY_PUBLIC_ACCOUNT_API
        // VITE_MY_PUBLIC_ACCOUNT_API_LOCAL
        try {
            const response = await fetch(import.meta.env.VITE_MY_PUBLIC_ACCOUNT_API, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${activeToken}`
                }
            });
            const data = await response.json();
            if (response.ok && data.profile) {
                setIsVisible(true);
                setProfileDetails(data.profile.username);

                setUser(data.profile.username);
                localStorage.setItem('authUser', data.profile.username);
            } else {
                setIsVisible(false);
                setProfileDetails(null);
            }
        } catch (error) {
            // console.error('Error verifiing pro: ', error);
            setIsVisible(false);
            setProfileDetails(null);
        }
    }
    // fetching profile whenever token changge or init load
    useEffect(()=> {
        if (token) {
            checkUserProfile(token);
        } else {
            setIsVisible(false);
            setProfileDetails(null);
        }
    }, [token]);

    const authUserFunc = (nameORsername, authToken) => {
        // here acceptign full_name on if pub-acc isn't available

        if (nameORsername) {
            localStorage.setItem('authUser', nameORsername);
            setUser(nameORsername);
        }

        if (authToken) {
            localStorage.setItem('token', authToken);
            setToken(authToken);
            // checking profile after stting token
            checkUserProfile(authToken);
        }
    };
    const logout = () => {
        localStorage.removeItem('authUser');
        localStorage.removeItem('token');
        setUser(null);
        setToken(null);
        setIsVisible(false);
        setProfileDetails(null);
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
            logout,
            isVisible,
            setIsVisible,
            profileDetails,
            setProfileDetails,
            checkUserProfile
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


