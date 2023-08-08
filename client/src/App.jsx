import './App.css';
import React, {useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Main from './components/Main';
import LoginRegRoutes from './components/LoginRegRoutes';

function App() {
  const [errors, setErrors] = useState([]);
  const [authError, setAuthError] = useState("");

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/*' element={<Main errors={errors} setErrors={setErrors} authError={authError} setAuthError={setAuthError}/>} />
          <Route path='/user/*' element={<LoginRegRoutes errors={errors} setErrors={setErrors} authError={authError} setAuthError={setAuthError}/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
