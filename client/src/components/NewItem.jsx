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
        <div>
            <h1>New Item</h1>
            <Link className="btn" to={'/home'}>Navigate Home</Link>
            <form onSubmit={formHandler}>
                {/* {Object.keys(errors).map( (key) => (
                    <p key="{key}">{errors[key].message}</p>
                ))} */}

                <div>
                    <label htmlFor="itemName">Item Name</label>
                    <input type="text" name="itemName" id="itemName" value={itemName} onChange={e => setItemName(e.target.value)}></input>
                    { errors.itemName ? <p className="text-danger">{errors.itemName.message}</p> : null }
                </div>
                <div>
                    <label>Link</label>
                    <input type="text" value={link} onChange={e => setLink(e.target.value)}></input>
                    { errors.link ? <p className="text-danger">{errors.link.message}</p> : null }
                </div>
                <div>
                    <label>Quantity</label>
                    <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)}></input>
                    { errors.quantity ? <p className="text-danger">{errors.quantity.message}</p> : null }
                </div>
                <div>
                    <label>Priority</label>
                    <select value={priority} onChange={e => setPriority(e.target.value)}>
                        <option value="Low">Low</option>
                        <option value="Medium" selected>Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
                <div>
                    <label>Comment(s)</label>
                    <input type="text" value={comments} onChange={e => setComments(e.target.value)}></input>
                </div>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default NewItem;