import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";

const ViewCategory = ({allCategories, deleteItem}) => {
    const [category, setCategory] = useState({});
    const [allItems, setAllItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const {id} = useParams();

    
    useEffect( () => {
        axios.get(`http://127.0.0.1:8000/api/category/${id}`)
        .then(res => setCategory(res.data))
        .catch(err => console.log(err));
    }, [id])
    
    let categoryNames = [];
    categories.forEach(category => {
        categoryNames.push(category.categoryName);
    })
    // console.log(`category names arr: ${categoryNames}`);
    // console.log(categoryNames.includes('Car Parts'));

    useEffect(() => {
        axios.get('http://localhost:8000/api/categories',{withCredentials: true})
            .then(res => setCategories(res.data))
            .catch(err => {
                console.log(err)
                // setAuthError("You Must be Logged In!");
                navigate('/user/login')
            })
    } /*,[] */)

    useEffect(() => {
        axios.get('http://localhost:8000/api/items',{withCredentials: true})
            .then(res => setAllItems(res.data))
            .catch(err => {
                console.log(err)
                // setAuthError("You Must be Logged In!");
                navigate('/user/login')
            })
    }, [])

    
    // console.log(`category name : ${category.categoryName}`);
    // console.log(`all items in cat page: ${allItems}`);
    // allItems.forEach((item) => console.log(`this is item in allitem list: ${item['category']}`));
    
    let filteredItems = [];
    allItems.forEach((item) => {
        if(category.categoryName === item.category){
            filteredItems.push(item);
        }
    });

    console.log(categoryNames.includes(category.categoryName))
    return (
        <div className="category-page mx-5">
            <div className="d-flex flex-row align-items-center justify-content-between mt-4">
                <Link className="text-decoration-none logo-header" style={{color:"lightblue"}} to={'/home'} >Wishfor__</Link>
                <div className="d-flex flex-row">
                    <Link to={'/new'} className="btn me-4">Add Item </Link>
                    <Link to={'/home'} className="category-home-btn">Navigate Home</Link>
                </div>
            </div>
            <div className="category-subheader mt-2 d-flex flex-row align-items-center">
                <h3 className="me-5">Current Lists</h3>
            </div>
            <div className="d-flex flex-row mt-2">
                <div className="category-sidebar-container">
                    { allCategories.map(category => {
                        return (
                            <ul key={category._id} className="">
                                    <li className="">
                                        <Link to={`/category/${category._id}`} className="text-decoration-none text-dark">
                                            <p className="category-sidebar-list">{category.categoryName}</p>
                                        </Link>
                                    </li>
                            </ul>
                        )
                    })}
                </div>
                <div className="d-flex flex-column">
                    <h1 style={{fontSize:"35px", marginBottom:"20px"}}>{category.categoryName}</h1>
                    { !categoryNames.includes(category.categoryName) ?
                        <div className="d-flex flex-column align-items-center"> 
                            <h1 className="text-dark">Nothing to See Here Yet!</h1>
                            <Link to={'/new'} className="btn text-dark">Start Building Your Wishlist</Link>
                        </div> 
                        : filteredItems.map(item => {
                            return (
                                <div className="list-item-container-category" key={item._id}>
                                    <ul className="list d-flex flex-row justify-content-evenly align-items-center">
                                        <div className="list-section">
                                            <p className="item-label">Name</p>
                                            <li className="list-item"><a href={item.link} alt="item link" rel="noreferrer" target="_blank">{item.itemName}</a></li>
                                        </div>
                                        <div className="list-section">
                                            <p className="item-label">Qty</p>
                                            <li className="list-item">{item.quantity}</li>
                                        </div>
                                        <div className="list-section">
                                            <p className="item-label">Priority</p>
                                            <li className="list-item">{item.priority}</li>
                                        </div>
                                        <div className="list-section">
                                            <p className="item-label">Comment(s)</p>
                                            <li className="list-item">{item.comments}</li>
                                        </div>
                                        <div className="action-container d-flex">
                                            <br></br>
                                            <Link to={`/edit/${item._id}`}><img className="action-icon" src={require('../images/edit-icon.png')} alt="edit-icon"></img></Link>
                                            <img className="action-icon mx-5" src={require('../images/delete-icon.png')} alt="delete-icon" id={item._id} onClick={deleteItem}></img>
                                        </div>
                                    </ul>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </div>
    )
}

export default ViewCategory;