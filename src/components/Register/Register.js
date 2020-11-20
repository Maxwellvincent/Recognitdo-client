import React, { useState } from 'react'
import {useHistory, Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import {useForm} from 'react-hook-form';

const Register = ({ onRouteChange, loadUser,isSignedIn }) => {
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerName, setRegisterName] = useState('');
    const {register, handleSubmit, watch, errors} = useForm();
    const history = useHistory();
    const onSubmit = data => {
        onSubmitRegister()
      }; 

    const onEmailChange = (e) => {
        setRegisterEmail(e.target.value);
    }

    const onNameChange = (e) => {
        setRegisterName(e.target.value);
    }

    const onPasswordChange = (e) => {
        setRegisterPassword(e.target.value);
    }

    const onSubmitRegister = async() => {
        // e.preventDefault();
        // run a fetch to server
        await fetch('https://rocky-oasis-94549.herokuapp.com/register', {
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
            
            if(user !== "unable to register"){
                
                toast.success("Registered Successfully!");
                loadUser(user);
                onRouteChange('home')
                // isSignedIn(true)
                history.push('/home');
            } else {
                toast.error("User already exists");
            }
        })
        
    }

    return (
        <article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <form className="measure" 
                    style={{"textAlign": "center"}} 
                    onSubmit={handleSubmit(onSubmit)}
                    >
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
                                ref={register({required:true})}
                                onChange={onNameChange}    
                            />
                            {errors.name && <span>Name field is required</span>}
                        </div>
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
                            {errors.email && <span>Email field is required</span>}
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
                            {errors.email && <span>Password is required</span>}
                        </div>
                        </fieldset>
                        <div className="">
                            <input 
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                type="submit" 
                                value="Register"
                                onSubmit={e => onSubmitRegister(e)}
                            />
                        </div>
                        <div className="lh-copy mt3">
                            <Link to="/signin" style={{"textDecoration": "none", "cursor": "pointer"}}>
                                <p 
                                onClick={onRouteChange('signin')}
                                className="f6 link dim black db"
                                > 
                                Login</p>
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

export default Register
