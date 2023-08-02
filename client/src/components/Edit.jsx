import React, {useState, useEffect} from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

const Edit = ({allItems, setAllItems}) => {
    const [itemName, setItemName] = useState("");
    const [link, setLink] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [priority, setPriority] = useState("");
    const [comments, setComments] = useState("");
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/items/${id}`)
            .then( res => {
                setItemName(res.data.itemName);
                setLink(res.data.link);
                setQuantity(res.data.quantity);
                setPriority(res.data.priority);
                setComments(res.data.comments);
            })
            .catch (err => console.log(err));      
    },[id])

    const updateItemHandler = e => {
        e.preventDefault();

        const editItem = { itemName, link, quantity, priority, comments }

        axios.patch(`http://127.0.0.1:8000/api/items/${id}`, editItem)
            .then(res => {
                const updatedItem = res.data;
                const updatedAllItems = allItems.map ( item => {
                    return item._id === updatedItem._id ? updatedItem : item;
                })
                setAllItems(updatedAllItems);
                navigate('/home')
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="mx-5">
            <nav className="home-nav d-flex flex-row align-items-center"><h1 className="logo-header">Wishfor__</h1><Link to={'/home'} className="btn">Navigate Home</Link></nav>
            <div>
                <h1>Currently Editing {itemName}</h1>
                <form className="form-container mt-5 d-flex flex-column justify-content-center align-items-center" onSubmit={updateItemHandler}>
                    <div className="d-flex flex-row">
                        <div className="d-flex flex-column">
                            <label htmlFor="itemName">Item Name</label>
                            <input type="text" name="itemName" id="itemName" value={itemName} onChange={e => setItemName(e.target.value)}></input>
                            { errors.itemName ? <p className="text-danger">{errors.itemName.message}</p> : null }
                        </div>
                        <div className="d-flex flex-column">
                            <label htmlFor="link">Link</label>
                            <input type="text" name="link" id="link" value={link} onChange={e => setLink(e.target.value)}></input>
                            { errors.link ? <p className="text-danger">{errors.link.message}</p> : null }
                        </div>
                    </div>
                    <div className="mb-3 d-flex flex-row align-items-center">
                        <div className="d-flex flex-column">
                            <label htmlFor="quantity">Quantity</label>
                            <input type="number" name="quantity" id="quantity" value={quantity} onChange={e => setQuantity(e.target.value)}></input>
                            { errors.quantity ? <p className="text-danger">{errors.quantity.message}</p> : null }
                        </div>
                        <div className="d-flex flex-column">
                            <label htmlFor="priority">Priority</label>
                            <select value={priority} name="priority" id="priority" onChange={e => setPriority(e.target.value)}>
                                <option value="Low">Low</option>
                                <option value="Medium" selected>Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-3 d-flex flex-column">
                        <label>Comment(s)</label>
                        <input type="text" name="comments" id="comments" value={comments} onChange={e => setComments(e.target.value)}></input>
                    </div>
                    <button className="btn">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Edit;