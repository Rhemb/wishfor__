import React, {useEffect, useState} from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from "axios";

import Home from "./Home";
import NewItem from "./NewItem";
import Edit from "./Edit";

const Main = ({authError, setAuthError}) => {
    const [allItems, setAllItems] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        axios.get('http://localhost:8000/api/items',{withCredentials: true})
            .then(res => setAllItems(res.data))
            .catch(err => {
                console.log(err)
                setAuthError("You Must be Logged In!");
                navigate('/user/login')
            })
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
                <Route path='/home' element={<Home allItems={allItems} deleteItem={deleteItem} />} />
                <Route path='/new' element={<NewItem allItems={allItems} setAllItems={setAllItems} />} />
                <Route path='/edit/:id' element={<Edit allItems={allItems} setAllItems={setAllItems} />} />
            </Routes>
        </div>
    )
}

export default Main;