import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ShieldCheck, Lock, Eye, EyeOff, Loader2, ArrowLeft, CheckCirle, Shield } from "lucide-react";
import axios from "axios";

export default function VerifyCode() {
    const navigate = useNavigate();
    const location = useLocation();

    //Recuperar el email que ForgotPassword envio al navegador 
    const email = location.state?.email || "";

    //Codigo OTP: array de 6 pisiciones, una por cada digito 
    const [code, setCode] = useState(["", "", "", "", "", "",]);

    const [newPassword, setNewPassword]         = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword]       = useState(false);
    const [showConfirm, setShowConfirm]         = useState(false);
    const [loading, setLoading]                 = useState(false);
    const [message, setMessage]                 = useState({ type: "", text: ""});

    //Referencia a los 6 inputs para mover el foco automatico 
    const inputsRef = useRef([]);
}