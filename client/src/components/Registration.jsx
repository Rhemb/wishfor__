import React, {useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';

const Register = ({errors, setErrors, authError, setAuthError}) => {
    const [formState, setFormState] = useState ({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const navigate = useNavigate();

    const formHandler = e => {
        e.preventDefault();

        setFormState({
            ...formState,
            [e.target.name] : e.target.value
        })
    }
    
    const handleSubmit = e => {
        e.preventDefault();
        
        axios.post('http://localhost:8000/api/register', formState, {withCredentials: true})
            .then(res => {
                console.log(res.data);
                navigate('/home');
            })
            .catch(err => {
                console.log(err);
                setErrors(err.response.data.errors)
                // setAuthError("You Must be Logged in.")
                // navigate('/user/register')
            })
    }


    return (
        <div className="split register-main-container">
            <div className="split register-left d-flex align-items-center">
                <div className="centered fade-in-text">
                    <h1 className="login-reg-header text-center">Nice to Meet You</h1>
                    <p className="text-center">Just a few things before you get started.</p>
                </div>
            </div>
            <div className="split register-right">
                <div className="register centered">
                    <div className="mb-4">
                        <Link className="logo-header" style={{textDecoration: "none", color: "lightgray"}}to={'/'} >Wishfor__</Link>
                    </div>
                    <div className="text-danger"><p>{authError}</p></div>

                    <form className="d-flex flex-column" onSubmit={handleSubmit}>
                        <div className="d-flex justify-content-center">
                            <div className="col d-flex flex-column align-items-center mb-4">
                                <label className="form-label" htmlFor="email">Email</label>
                                <input className="register-input" type="text" id="email" name="email" value={formState.email} onChange={formHandler}/>
                                { errors.email ? <p className="text-danger">{errors.email.message}</p> : null }
                            </div>
                        </div>
                        <div className="d-flex flex-row mb-4">
                            <div className="col d-flex flex-column mx-4">
                                <label className="form-label" htmlFor="firstName">First Name</label>
                                <input className="register-input" type="text" id="firstName" name="firstName" value={formState.firstName} onChange={formHandler}/>
                                { errors.firstName ? <p className="text-danger">{errors.firstName.message}</p> : null }
                            </div>
                            <div className="col d-flex flex-column">
                                <label className="form-label" htmlFor="lastName">Last Name</label>
                                <input className="register-input" type="text" id="lastName" name="lastName" value={formState.lastName} onChange={formHandler}/>
                                { errors.lastName ? <p className="text-danger">{errors.lastName.message}</p> : null }
                            </div>
                        </div>
                        <div className="d-flex flex-row mb-3">
                            <div className="col d-flex flex-column mx-4">
                                <label className="form-label" htmlFor="password">Password</label>
                                <input className="register-input" type="password" name="password" id="password" value={formState.password} onChange={formHandler}/>
                                { errors.password ? <p className="text-danger">{errors.password.message}</p> : null }
                            </div>
                            <div className="col d-flex flex-column mb-4">
                                <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                                <input className="register-input" type="password" id="confirmPassword" name="confirmPassword" value={formState.confirmPassword} onChange={formHandler}/>
                                { errors.confirmPassword ? <p className="text-danger">{errors.confirmPassword.message}</p> : null }
                            </div>
                        </div>
                        <div className="col-12 mb-3">
                            <button className="btn signup-btn">Sign Up</button>
                        </div>
                    </form>
                    <p>Already a member? <a href={'/user/login'}>Sign In</a></p>
                </div>
            </div>
        </div>
    )
}

export default Register;