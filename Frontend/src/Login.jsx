import { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch (`${backendUrl}/auth/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify(formData),
            });
            const data = await res.json();

            if(res.ok){
                login(data.token, data.user);
                navigate("/");
            } else{
                alert(data.message || "Login failed");
            }

        } catch (error) {
            console.error("Error during login:", error);
            alert("An error occurred. Please try again.");
        }
    };
    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Welcome back</h2>
                <form onSubmit={handleSubmit}>
                    <input type="email" className="auth-input" placeholder="Email" 
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                    <input type="password" className="auth-input" placeholder="Password" 
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                    <button className="auth-btn" type="submit">Login</button>
                </form>
                <Link to="/register" className="auth-link">Don't have an account? <span>Sign Up</span></Link>
            </div>
        </div>
    );

};

export default Login;