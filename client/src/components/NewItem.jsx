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
        <div className="new-item-container">
            <div className="new-item-inner-container">
                <nav className="d-flex flex-row justify-content-between align-items-center">
                    <Link className="mt-4 mx-5 btn logo-header" to={'/home'} >Wishfor__</Link>
                    <Link className="mx-5 btn btn-light nav-home-btn" to={'/home'}>Navigate Home</Link>
                </nav>
                <form className="row g-3 form-container mt-5 d-flex flex-column justify-content-center align-items-center" onSubmit={formHandler}>
                    <h1 className="d-flex justify-content-center mb-5">New Item</h1>
                    <div className="row d-flex flex-row">
                        <div className="col-md-6 d-flex flex-column mb-3">
                            <label className="form-label" htmlFor="itemName">Item Name</label>
                            <input className="form-control" type="text" name="itemName" id="itemName" value={itemName} onChange={e => setItemName(e.target.value)}></input>
                            { errors.itemName ? <p className="text-danger">{errors.itemName.message}</p> : null }
                        </div>
                        <div className="col-md-6 d-flex flex-column">
                            <label className="form-label" htmlFor="link">Link</label>
                            <input className="form-control" placeholder="ex: https://itemlink.com" type="text" name="link" id="link" value={link} onChange={e => setLink(e.target.value)}></input>
                            { errors.link ? <p className="text-danger">{errors.link.message}</p> : null }
                        </div>
                    </div>
                    <div className="row mb-3 d-flex flex-row align-items-center">
                        <div className="col-md-6 d-flex flex-column">
                            <label className="form-label" htmlFor="quantity">Quantity</label>
                            <input className="form-control" type="number" name="quantity" id="quantity" value={quantity} onChange={e => setQuantity(e.target.value)}></input>
                            { errors.quantity ? <p className="text-danger">{errors.quantity.message}</p> : null }
                        </div>
                        <div className="col-md-6 d-flex flex-column">
                            <label className="form-label" htmlFor="priority">Priority</label>
                            <select className="form-select" value={priority} name="priority" id="priority" onChange={e => setPriority(e.target.value)}>
                                <option value="Low">Low</option>
                                <option value="Medium" selected>Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-11 d-flex flex-column">
                        <label className="form-label">Comment(s): <span style={{fontStyle:"italic" , fontSize: "14px"}}>(optional)</span></label>
                        <textarea className="form-control" rows="2" cols="50" type="text" name="comments" id="comments" placeholder="ex: size small" value={comments} onChange={e => setComments(e.target.value)}></textarea>
                    </div>
                    <div className="col-12 d-flex justify-content-center">
                        <button className="mb-3 btn btn-primary">Submit</button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default NewItem;