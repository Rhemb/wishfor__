import React from "react";

const WelcomePage = () => {
    return (
        <div className="homepage-container">
            <div className="main-body d-flex flex-column align-items-center text-white position-absolute top-50 start-50 translate-middle">
                <h1 id="welcome-header">Wishfor__</h1>
                <p className="mb-5 welcome-subheader">Everything you <span className="emphasize-text">wish for</span>, all in one place.</p>
                <div>
                    <a className="welcome-button btn btn-light" href={'/user/login'}>Start Wishing</a>
                </div>
            </div>
        </div>
    )
}

export default WelcomePage;