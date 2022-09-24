import  React, { useEffect, useState, createContext} from "react";
import axios from 'axios';
import jwt_decode from 'jwt-decode'
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({children}) => {
    
    const [authTokens, setAuthTokens] = useState(()=>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    const [user, setUser] = useState(()=>localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const loginUser = async (e, username, password, setErrors) => {
        if (e) { 
            e.preventDefault();
        }

        let res;
        // If user is not authorized, set response to e.response
        try {
            res = await axios.post("/api/token/", 
                {
                    'username':username,
                    'password': password,
                }
            );
        } catch (e) {
            res=e.response
        }

        const data = res.data;

        if(res.status === 200) {
            setAuthTokens(data);
            setUser(jwt_decode(data.access));
            localStorage.setItem('authTokens', JSON.stringify(data));
            navigate('/');
        } else {
            setErrors(true);
        }
    };

    const signupUser = async (e, user, setErrors) => {
        e.preventDefault();

        let res;
        try {
            res = await axios.post("/api/register/", user); 
        } catch(e) {
            res = e.response;
        }

        if (res.status === 200 || res.status === 201) {
            loginUser(null, user.username, user.password, setErrors);
        } else {
            setErrors(true);
        }
    }
    

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        navigate('/login');
    }

    useEffect(()=>{
        if(authTokens) {
            setUser(jwt_decode(authTokens.access));
        }
        setLoading(false);

    }, [authTokens, loading])

    const contextData = {
        setAuthTokens: setAuthTokens,
        setUser:setUser,
        logoutUser: logoutUser,
        loginUser: loginUser,
        signupUser: signupUser,
        user: user,
        authTokens: authTokens,

    }
    return (
        <AuthContext.Provider value={ contextData }>
            {children}
        </AuthContext.Provider>
    )
}


