import React, {useEffect, useState} from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from "axios";

import Home from "./Home";
import NewItem from "./NewItem";
import Edit from "./Edit";
import NewCategory from "./NewCategory";
import ViewCategory from "./Category";

const Main = ({authError, setAuthError}) => {
    const [allItems, setAllItems] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
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

    useEffect(() => {
        axios.get('http://localhost:8000/api/categories',{withCredentials: true})
            .then(res => setAllCategories(res.data))
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

    const deleteCategory = (id) => {
        axios.delete(`http://localhost:8000/api/category/${id}`)
            .then(res => {
                const updatedAllCategories = allCategories.filter(categories => categories._id !== res.data._id)
                setAllCategories(updatedAllCategories);
                navigate('/home');
            })
    }

    return (
        <div>
            <Routes>
                <Route path='/home' element={<Home allCategories={allCategories} allItems={allItems} deleteItem={deleteItem} deleteCategory={deleteCategory} />} />
                <Route path='/new' element={<NewItem allItems={allItems} setAllItems={setAllItems} allCategories={allCategories} setAllCategories={setAllCategories} />} />
                <Route path='/edit/:id' element={<Edit allItems={allItems} setAllItems={setAllItems} />} />
                <Route path='/category/new' element={<NewCategory allCategories={allCategories} setAllCategories={setAllCategories}/>} />
                <Route path='/category/:id' element={<ViewCategory allCategories={allCategories} deleteItem={deleteItem}/>}/>
            </Routes>
        </div>
    )
}

export default Main;