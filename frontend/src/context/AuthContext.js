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

    const loginUser = async (e, username, password) => {
        if(e) {
            e.preventDefault();
        }
        const res = await axios.post("http://127.0.0.1:8000/api/token/", {
            'username':username,
            'password': password,
        });

        const data = res.data;

        if(res.status === 200) {
            setAuthTokens(data);
            setUser(jwt_decode(data.access));
            localStorage.setItem('authTokens', JSON.stringify(data));
            navigate('/');
        } else {
            alert("Something went wrong");
        }
         
    };

    const signupUser = async (e, user) => {
        e.preventDefault();
        const res = await axios.post("/api/register/", user); 
        console.log("Response", res)
        if (res.status === 200 || res.status === 201) {
            loginUser(null, user.username, user.password);
        } else {
            alert("Ooops somethign went wrong");
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


