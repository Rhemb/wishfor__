import React from "react";
import { Routes, Route } from 'react-router-dom';

import Login from "./Login";
import Register from "./Registration";

const LoginRegRoutes = ({errors, setErrors, authError, setAuthError}) => {
    return (
        <Routes>
            <Route path="/login" element={<Login authError={authError} setAuthError={setAuthError} />} />
            <Route path="/register" element={<Register errors={errors} setErrors={setErrors} authError={authError} setAuthError={setAuthError} />} />
        </Routes>
    )
}

export default LoginRegRoutes;