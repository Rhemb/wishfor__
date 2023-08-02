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
                <nav className="home-nav d-flex flex-row align-items-center"><h1 className="logo-header">Wishfor__</h1><Link to={'/new'} className="btn text-white">Add Item </Link></nav>
                { allItems.length === 0 ?
                    <div className="d-flex flex-column align-items-center"> 
                        <h1 className="text-white">Nothing to See Here.</h1>
                        <Link to={'/new'}>Start Building Your Wishlist</Link>
                    </div> 
                    : allItems.map(item => {
                        return (
                            <div className="list-item-container mb-4" key={item._id}>
                                <ul className="d-flex flex-row justify-content-evenly">
                                    <li className="list-item"><a href={item.link} alt="item link" rel="noreferrer" target="_blank">{item.itemName}</a></li>
                                    <li className="list-item">{item.quantity}</li>
                                    <li className="list-item">{item.priority}</li>
                                    <li className="list-item">{item.comments}</li>
                                    <div>
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