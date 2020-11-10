import React from 'react'
import {Link, useHistory} from 'react-router-dom';
import './Navigation.css';


const Nav = ({onRouteChange, isSignedIn}) => {
    const history = useHistory();

        if(isSignedIn) {
            return (
                <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Link to="/signin" >
                        <p className='f3 link dim black underline pa3 pointer' 
                        onClick={() => onRouteChange('signin')}
                        // onClick={history.push('/signin')}
                        >
                        Sign Out
                        </p>
                    </Link>
                </nav>
            )
        } else {
            return (
                <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Link to="/sigin" >
                        <p className='f3 link dim black underline pa3 pointer' 
                            // onClick={() => onRouteChange('signin')}
                            onClick={history.push('/signin')}
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
