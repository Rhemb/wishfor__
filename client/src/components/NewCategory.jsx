import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewCategory = ({allCategories, setAllCategories}) => {
    const [categoryName, setCategoryName] = useState("");
    const [categoryDescription, setCategoryDescription] = useState("");
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const submitHandler = e => {
        e.preventDefault();

        const newCategory = {categoryName, categoryDescription}

        axios.post('http://localhost:8000/api/category', newCategory)
            .then(res=> {
                setAllCategories([...allCategories, res.data])
                navigate('/home');
            })
            .catch (err => {
                console.log(err);
                // setErrors(err.response.data.errors);
            })
    }
    return (
        <>
            <h1>Create a new Category</h1>
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor="categoryName">Name</label>
                    <input type="text" id="categoryName" value={categoryName} onChange={e => setCategoryName(e.target.value)}></input>
                    {/* {errors.categoryName ? <p>{errors.categoryName}</p> : null} */}
                </div>
                <div>
                    <label htmlFor="categoryDesc">Description</label>
                    <input type="text" id="categoryDesc" value={categoryDescription} onChange={e => setCategoryDescription(e.target.value)}></input>
                    {/* {errors.categoryDescription ? <p>{errors.categoryDescription}</p> : null} */}
                </div>
                <div>
                    <button className="btn btn-primary">Create Category</button>
                </div>
            </form>
        </>
    )
}

export default NewCategory;