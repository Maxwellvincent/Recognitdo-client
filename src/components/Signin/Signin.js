import React, {useState} from 'react';
import {useHistory, Link} from 'react-router-dom';
import './Signin.css';
import {toast} from 'react-toastify';
import {useForm} from 'react-hook-form';

const Signin = ({ onRouteChange, loadUser, user, isSignedIn }) => {
    const [signInEmail, setSignInEmail] = useState('');
    const [signInPassword, setSignInPassword] = useState('');
    const {register, handleSubmit, watch, errors} = useForm();
    const history = useHistory();
    const onSubmit = data => {
       
        onSubmitSignIn();
      };

    const onEmailChange = (e) => {
        setSignInEmail(e.target.value);
    }

    const onPasswordChange = (e) => {
        setSignInPassword(e.target.value);
    }

    const onSubmitSignIn = async () => {
        // e.preventDefault();
        // run a fetch to server
        await fetch('https://rocky-oasis-94549.herokuapp.com/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'},
            body: JSON.stringify({
                email: signInEmail,
                password: signInPassword
            })
        })
        .then(resp => resp.json())
        .then(user => {
            if(user.id){
                loadUser(user);
                toast.success("Login Successfully!");
                onRouteChange('home');
                // isSignedIn(true);
                history.push('/home');
            } else {
                toast.error("Unsuccesfull login attempt");
            }
        });
        
    }

    return (
        //AS IS THE ENTER BUTTON DOESNT WORK ON SUBMIT BC ITS NOT FORM
        <article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <form className="measure" 
                    style={{"textAlign": "center"}} 
                    onSubmit={handleSubmit(onSubmit)}
                    >
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email">Email</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email"  
                                id="email"
                                required
                                ref={register({required:true})}
                                onChange={onEmailChange}    
                            />
                            {errors.email && <span>This field is required</span>}
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input 
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password"  
                                id="password"
                                required
                                ref={register({required:true})}
                                onChange={onPasswordChange}
                            />
                            {errors.password && <span>This field is required</span>}
                        </div>
                        </fieldset>
                        <div className="">
                            <input 
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                type="submit" 
                                value="Sign in"
                                // onClick={(e) => onSubmitSignIn(e)}
                                onSubmit={(e) => onSubmitSignIn(e)}
                            />
                        </div>
                        <div className="lh-copy mt3">
                            <Link to="/register" style={{"textDecoration": "none", "cursor": "pointer"}}>
                                <p 
                                    // onClick={() => onRouteChange('register')}
                                    className="f6 link dim black db pointer">
                                    Register
                                </p>
                            </Link> 
                        </div>
                        <div className="lh-copy mt3">
                            <Link to="/" style={{"textDecoration": "none", "cursor": "pointer"}}>
                                <p 
                                // onClick={onRouteChange('register')}
                                className="f6 link dim black db"
                                > 
                                Home Page</p>
                            </Link>
                        </div>
                </form>
            </main>
        </article>
        
    )
}

export default Signin
