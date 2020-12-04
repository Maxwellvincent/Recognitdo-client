import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import "./Login.css";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const Login = ({ onRouteChange, loadUser, user, isLogin,setAuth }) => {
  // const [signInEmail, setSignInEmail] = useState("");
  // const [signInPassword, setSignInPassword] = useState("");
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  })

  const {email, password} = inputs;

  const onChange = (e) => {
    setInputs({...inputs, [e.target.name]: e.target.value})
  }

  const onSubmit = (data,e) => {
    onSubmitLogin(e);
  };

  // const onEmailChange = (e) => {
  //   setSignInEmail(e.target.value);
  // };

  // const onPasswordChange = (e) => {
  //   setSignInPassword(e.target.value);
  // };

  const onSubmitLogin = async (e) => {
    e.preventDefault();
    // http://localhost:3001/auth/login
    // https://rocky-oasis-94549.herokuapp.com/login

    try {
      const body = {email, password};

      const response = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body)
      })

    const parseRes = await response.json();

    localStorage.setItem("token", parseRes.token);

    setAuth(true);
      // .then((resp) => resp.json())
      // .then((user) => {
      //   if (user.id) {
      //     loadUser(user);
      //     toast.success("Login Successfully!");
      //     // onRouteChange("dashboard");
      //     history.push("/dashboard");
      //   } else {
      //     toast.error("Unsuccesfull login attempt");
      //   }
      // });

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
            <legend className="f1 fw6 ph0 mh0">Login</legend>
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
                value={email}
                ref={register({ required: true })}
                // onChange={onEmailChange}
                onChange={e => onChange(e)}
              />
              {errors.email && <span>This field is required</span>}
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
                value={password}
                ref={register({ required: true })}
                // onChange={onPasswordChange}
                onChange={e => onChange(e)}
              />
              {errors.password && <span>This field is required</span>}
            </div>
          </fieldset>
          <div className="">
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Login"
              onSubmit={(e) => onSubmitLogin(e)}
            />
          </div>
          <div className="lh-copy mt3">
            <Link
              to="/register"
              style={{ textDecoration: "none", cursor: "pointer" }}
            >
              <p className="f6 link dim black db pointer">Register</p>
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

export default Login;
