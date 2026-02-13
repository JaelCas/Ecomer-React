import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; //importat axios 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const navigate = useNavigate();

    const login = async (email, password) => {
        try {
            const response = await axios.post("http://localhost:8081/api/login", {
                email: email,
                password: password
            });

            const data
        } catch (error) {
            
        }
    }
}