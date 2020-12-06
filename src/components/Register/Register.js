import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const Register = ({ onRouteChange, loadUser, isLogin, setAuth }) => {
  // const [registerEmail, setRegisterEmail] = useState("");
  // const [registerPassword, setRegisterPassword] = useState("");
  // const [registerName, setRegisterName] = useState("");
  const { register, handleSubmit, errors } = useForm();
  // const history = useHistory();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: ""
  })

  const {email, password, name} = inputs;

  const onChange = (e) => {
    setInputs({...inputs,[e.target.name] : e.target.value});
  }

  const onSubmit = (data,e) => {
    onSubmitRegister(e);
  };

  const onSubmitRegister = async (e) => {
    e.preventDefault()
    // "http://localhost:3001/auth/register"
    // "https://rocky-oasis-94549.herokuapp.com/register"

    try {

      const body = {email, password, name};
      const response = await fetch("https://rocky-oasis-94549.herokuapp.com/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body)
    })

    const parseRes = await response.json();

    localStorage.setItem('token', parseRes.token);

    setAuth(true);

    } catch (err) {
      console.error(err.message);
    }
  
  };

  return (
    <article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <form
          className="measure"
          style={{ textAlign: "center" }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="name">
                Name
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="name"
                id="name"
                required
                ref={register({ required: true })}
                onChange={onChange}
              />
              {errors.name && <span>Name field is required</span>}
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email">
                Email
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email"
                id="email"
                required
                ref={register({ required: true })}
                onChange={onChange}
              />
              {errors.email && <span>Email field is required</span>}
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                required
                ref={register({ required: true })}
                onChange={onChange}
              />
              {errors.email && <span>Password is required</span>}
            </div>
          </fieldset>
          <div className="">
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Register"
              onSubmit={(e) => onSubmitRegister(e)}
            />
          </div>
          <div className="lh-copy mt3">
            <Link
              to="/dashboard"
              style={{ textDecoration: "none", cursor: "pointer" }}
            >
              <p
                className="f6 link dim black db"
              >
                Login
              </p>
            </Link>
          </div>
          <div className="lh-copy mt3">
            <Link to="/" style={{ textDecoration: "none", cursor: "pointer" }}>
              <p className="f6 link dim black db">Home Page</p>
            </Link>
          </div>
        </form>
      </main>
    </article>
  );
};

export default Register;
