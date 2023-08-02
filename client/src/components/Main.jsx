import React, {useState} from "react";
import { Routes, Route } from 'react-router-dom';
import axios from "axios";

import WelcomePage from "./WelcomePage";
import Home from "./Home";
import NewItem from "./NewItem";
import Edit from "./Edit";

const Main = (props) => {
    const [allItems, setAllItems] = useState([])
    
    return (
        <div>
            <Routes>
                <Route path='/' element={<WelcomePage />} />
                <Route path='/home' element={<Home />} />
                <Route path='/new' element={<NewItem allItems={allItems} setAllItems={setAllItems} />} />
                <Route path='/edit/:id' element={<Edit />} />
            </Routes>
        </div>
    )
}

export default Main;