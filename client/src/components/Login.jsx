import React, {useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = ({authError, setAuthError}) => {
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();

    const [formState, setFormState] = useState ({
        email: '',
        password: '',
    })

    const loginHandler = e => {
        e.preventDefault();
        setFormState({
            ...formState,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = e =>{
        e.preventDefault();
        console.log(formState);
        axios.post('http://localhost:8000/api/login', formState, {withCredentials: true})
            .then(res => {
                console.log('Login Data:', res.data);
                navigate('/home');
            })
            .catch(err => {
                    console.log(err);
                    setLoginError(err.response.data.message);
            })
    }

    return (
        <div className="split login-main-container">
            <div className="login-left-container d-flex align-items-center">
                <div className="centered fade-in-text">
                    <h1 className="login-reg-header">Welcome Back</h1>
                    <p className="text-center">Log in to continue where you left off</p>
                </div>
            </div>
            <div className="split login-right-container">
                <div className="login centered">
                <Link className="logo-header" style={{textDecoration: "none", color: "lightgray"}} to={'/'} >Wishfor__</Link>
                <div className="text-danger">
                    <p>{authError}</p>
                    <p>{loginError ? loginError : ""}</p>
                </div>
                    <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
                        <div>
                            <div className="d-flex flex-column mb-4 mt-4">
                                <label htmlFor="email">Email</label>
                                <input className="login-input text-center" type="text" name="email" id="email" value={formState.email} onChange={loginHandler} />
                            </div>
                            <div className="d-flex flex-column mb-4">
                                <label htmlFor="loginpw">Password</label>
                                <input className="login-input text-center" type="password" name="password" id="loginpw" value={formState.password} onChange={loginHandler} />
                            </div>
                        </div>
                        <div className="d-flex flex-row align-items-center">
                            <button type='submit' className="sign-in-button btn mb-3 mx-3">Sign In</button>
                            <p>New Here? <Link to={'/user/register'}>Sign Up</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
    
}

export default Login;