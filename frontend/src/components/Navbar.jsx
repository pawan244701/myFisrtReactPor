import './Navbar.css'
export const Navbar = () => {
    return (
        <div className="main-container">
            <div className="logo-container">
                <a href="#" >Logo</a>
            </div>
            <div className='nav-links-container'>
                <a href="#" className='nav-links'>Home</a>
                <a href="#" className='nav-links'>Games</a>
                <a href="#" className='nav-links'>Anime</a>
            </div>
            <div className='nav-button-container'>
                <button>Login</button>
                <button>Signup</button>
            </div>
        </div>
    )
}