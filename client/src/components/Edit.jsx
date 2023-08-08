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
        <div className="edit-page-container">
            <nav className="d-flex flex-row justify-content-between align-items-center">
                <Link className="mt-4 mx-5 btn logo-header" to={'/home'} >Wishfor__</Link>
                <Link className="mx-5 btn btn-light nav-home-btn" to={'/home'}>Navigate Home</Link>
            </nav>
            <div>
                <form className="form-container row g-3 mt-5 d-flex flex-column justify-content-center align-items-center" onSubmit={updateItemHandler}>
                    <h1 className="d-flex justify-content-center mb-5" style={{fontSize: "30px"}}>Currently Editing {itemName}</h1>
                    <div className="row mb-3 d-flex flex-row">
                        <div className="col-md-6 d-flex flex-column">
                            <label className="form-label" htmlFor="itemName">Item Name</label>
                            <input className="form-control" type="text" name="itemName" id="itemName" value={itemName} onChange={e => setItemName(e.target.value)}></input>
                            { errors.itemName ? <p className="text-danger">{errors.itemName.message}</p> : null }
                        </div>
                        <div className="col-md-6 d-flex flex-column">
                            <label className="form-label" htmlFor="link">Link</label>
                            <input className="form-control" type="text" name="link" id="link" value={link} onChange={e => setLink(e.target.value)}></input>
                            { errors.link ? <p className="text-danger">{errors.link.message}</p> : null }
                        </div>
                    </div>
                    <div className="row d-flex flex-row align-items-center">
                        <div className="col d-flex flex-column">
                            <label className="form-label" htmlFor="quantity">Quantity</label>
                            <input className="form-control" type="number" name="quantity" id="quantity" value={quantity} onChange={e => setQuantity(e.target.value)}></input>
                            { errors.quantity ? <p className="text-danger">{errors.quantity.message}</p> : null }
                        </div>
                        <div className="col d-flex flex-column">
                            <label className="form-label" htmlFor="priority">Priority</label>
                            <select className="form-select" value={priority} name="priority" id="priority" onChange={e => setPriority(e.target.value)}>
                                <option value="Low">Low</option>
                                <option value="Medium" selected>Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-md-11 mb-3 d-flex flex-column">
                        <label className="form-label">Comment(s)</label>
                        <textarea className="form-control" type="text" name="comments" id="comments" value={comments} onChange={e => setComments(e.target.value)}></textarea>
                    </div>
                    <div className="col-12 d-flex justify-content-center">
                        <button className="btn btn-secondary">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Edit;