import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import './Signin.css';

const Signin = ({ onRouteChange, loadUser, user, isSignedIn }) => {
    const [signInEmail, setSignInEmail] = useState('');
    const [signInPassword, setSignInPassword] = useState('');
    const history = useHistory();

    const onEmailChange = (e) => {
        setSignInEmail(e.target.value);
    }

    const onPasswordChange = (e) => {
        setSignInPassword(e.target.value);
    }

    const onSubmitSignIn = () => {
        // console.log("this is clicking!")
        // run a fetch to server
        fetch('https://rocky-oasis-94549.herokuapp.com/signin', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: signInEmail,
                password: signInPassword
            })
        })
        .then(resp => resp.json())
        .then(user => {
            // console.log(user);
            // console.log(user.id);
            if(user.id){
                loadUser(user);
                onRouteChange('home');
                // isSignedIn(true);
                history.push('/home');
            }
        })
        // console.log(signInEmail, signInPassword);
        
    }

    return (
        //AS IS THE ENTER BUTTON DOESNT WORK ON SUBMIT BC ITS NOT FORM
        <article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <section className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address"  
                                id="email-address"
                                onChange={onEmailChange}    
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input 
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password"  
                                id="password"
                                onChange={onPasswordChange}
                            />
                        </div>
                        </fieldset>
                        <div className="">
                            <input 
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                type="submit" 
                                value="Sign in"
                                onClick={onSubmitSignIn}
                            />
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick={() => onRouteChange('register')}
                                className="f6 link dim black db pointer">Register</p>
                            
                        </div>
                </section>
            </main>
        </article>
        
    )
}

export default Signin
