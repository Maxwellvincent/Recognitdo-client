import React, { useState } from 'react'
import {useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';

const Register = ({ onRouteChange, loadUser }) => {
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerName, setRegisterName] = useState('');
    const history = useHistory();

    const onEmailChange = (e) => {
        setRegisterEmail(e.target.value);
    }

    const onNameChange = (e) => {
        setRegisterName(e.target.value);
    }

    const onPasswordChange = (e) => {
        setRegisterPassword(e.target.value);
    }

    const onSubmitRegister = (e) => {
        e.preventDefault();
        // run a fetch to server
        fetch('https://rocky-oasis-94549.herokuapp.com/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email: registerEmail,
                password: registerPassword,
                name: registerName
            })
        })
        .then(resp => resp.json())
        .then(user => {
            if(user){
                console.log(user);
                toast.success("Login Successfully!");
                loadUser(user);
                onRouteChange('home')
                history.push('/home');
            } else {
                toast.error("User already exists");
            }
        })
        console.log(registerName, registerPassword, registerEmail);
        
    }

    return (
        <article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <form className="measure" style={{"textAlign": "center"}}>
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="text" 
                                name="name"  
                                id="name"
                                required
                                onChange={onNameChange}    
                            />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address"  
                                id="email-address"
                                required
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
                                required
                                onChange={onPasswordChange}
                            />
                        </div>
                        </fieldset>
                        <div className="">
                            <input 
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                type="submit" 
                                value="Register"
                                onClick={e => onSubmitRegister(e)}
                            />
                        </div>
                        {/* <div className="lh-copy mt3">
                            <p 
                                onClick={onRouteChange('register')}
                                className="f6 link dim black db"
                                > 
                                Register</p>
                        </div> */}
                </form>
            </main>
        </article>
    )
}

export default Register
