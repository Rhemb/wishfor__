import React, {useEffect, useState} from "react";
import { Routes, Route,useNavigate } from 'react-router-dom';
import axios from "axios";

import WelcomePage from "./WelcomePage";
import Home from "./Home";
import NewItem from "./NewItem";
import Edit from "./Edit";

const Main = (props) => {
    const [allItems, setAllItems] = useState([])
    const navigate = useNavigate();
    
    useEffect(() => {
        axios.get('http://localhost:8000/api/items')
            .then(res => setAllItems(res.data))
            .catch( err => console.log(err));
    }, [])

    const deleteItem = (id) => {
        axios.delete(`http://localhost:8000/api/items/${id}`)
            .then(res => {
                const updatedAllItems = allItems.filter(items => items._id !== res.data._id)
                setAllItems(updatedAllItems);
                navigate('/home');
            })
    }

    return (
        <div>
            <Routes>
                <Route path='/' element={<WelcomePage />} />
                <Route path='/home' element={<Home allItems={allItems} deleteItem={deleteItem} />} />
                <Route path='/new' element={<NewItem allItems={allItems} setAllItems={setAllItems} />} />
                <Route path='/edit/:id' element={<Edit />} />
            </Routes>
        </div>
    )
}

export default Main;