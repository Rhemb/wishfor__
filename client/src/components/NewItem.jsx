import React, {useState} from "react";
import {Link ,useNavigate} from 'react-router-dom';
import axios from 'axios'

const NewItem = ({allItems, setAllItems}) => {
    const [itemName, setItemName] = useState("");
    const [link, setLink] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [priority, setPriority] = useState("");
    const [comments, setComments] = useState("");
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const formHandler = e => {
        e.preventDefault();

        const newItem = { itemName, link, quantity, priority, comments }

        axios.post('http://127.0.0.1:8000/api/items', newItem)
            .then( res => {
                setAllItems([...allItems, res.data])
                navigate('/home')
            })
            .catch (err => {
                setErrors(err.response.data.errors);
            })
    }
    return (
        <div className="mx-5">
            <nav className="d-flex flex-row justify-content-between">
                <h1>New Item</h1>
                <Link className="btn" to={'/home'}>Navigate Home</Link>
            </nav>
            <form className="form-container mt-5 d-flex flex-column justify-content-center align-items-center" onSubmit={formHandler}>
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
                <button className="mb-3 btn">Submit</button>
            </form>
        </div>
    )
}

export default NewItem;