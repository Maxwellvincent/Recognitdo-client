import React from 'react'
import {Link} from 'react-router-dom';
import './Navigation.css';


const Nav = ({onRouteChange, isSignedIn}) => {

        if(isSignedIn) {
            return (
                <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <p className='f3 link dim black underline pa3 pointer' 
                        onClick={() => onRouteChange('signin')}
                    >
                        Sign Out
                    </p>
                </nav>
            )
        } else {
            return (
                <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Link to="/sigin" >
                        <p className='f3 link dim black underline pa3 pointer' 
                            // onClick={() => onRouteChange('signin')}
                        >
                        Sign In
                        </p>
                    </Link>
                    <Link to="/register">
                        <p className='f3 link dim black underline pa3 pointer' 
                            // onClick={() => onRouteChange('register')}
                        >
                            Register
                        </p>
                    </Link>
                    
                </nav>
            )
            
        }
}

export default Nav
