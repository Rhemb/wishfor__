import React from "react";
import { Link } from "react-router-dom";

const Home = ({allItems, deleteItem}) => {
    // console.log(allItems)
    const deleteHandler = e => {
        const itemId = e.target.id;
        deleteItem(itemId);
    }
    return (
        <div className="home-background">
            <div className="home-container">
                <nav className="mb-5 home-nav d-flex flex-row align-items-center"><Link className="btn mt-5 logo-header" to={'/'} >Wishfor__</Link><Link to={'/new'} className="add-item btn mt-4 text-white">Add Item </Link></nav>
                
                { allItems.length === 0 ?
                    <div className="d-flex flex-column align-items-center"> 
                        <h1 className="text-white">Nothing to See Here.</h1>
                        <Link to={'/new'} className="btn text-white">Start Building Your Wishlist</Link>
                    </div> 
                    : allItems.map(item => {
                        return (
                            <div className="list-item-container mb-5" key={item._id}>
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
                                    <div className="action-container">
                                        <br></br>
                                        <Link to={`/edit/${item._id}`}><img className="action-icon" src={require('../images/edit-icon.png')} alt="edit-icon"></img></Link>
                                        <img className="action-icon" src={require('../images/delete-icon.png')} alt="delete-icon" onClick={deleteHandler}></img>
                                    </div>
                                </ul>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home;