import Clarifai from "clarifai";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Nav from "./components/Navigation/Navigation";
// import Logo from "./components/Logo/Logo";
// import ImageForm from "./components/ImageForm/ImageForm";
// import Rank from "./components/Rank/Rank";
import Particles from "react-particles-js";
// import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import config from "./config";
import "./App.css";
import LandingPage from "./components/LandingPage/LandingPage";

toast.configure();

const app = new Clarifai.App({
  apiKey: `${config.API_KEY}`,
});

const particleOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [box, setBox] = useState({});
  const [user, setUser] = useState({
    name: "",
    entries: "",
  });

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  async function isAuth(){
    try {
      const response = await fetch('https://rocky-oasis-94549.herokuapp.com/auth/is-verify', {
        method: "GET",
        headers: {token : localStorage.token}
      });

      const parseRes = await response.json();
      
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    isAuth()
  })

  const calculateFaceLocation = (data) => {
    const clarafaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarafaiFace.left_col * width,
      topRow: clarafaiFace.top_row * height,
      rightCol: width - clarafaiFace.right_col * width,
      bottomRow: height - clarafaiFace.bottom_row * height,
    };
  };

  const displayFaceBox = (box) => {
    setBox(box);
  };

  const onInputChange = (e) => {
    // setInput("");
    setInput(e.target.value);
  };



  const onSubmit = async () => {
    setImageUrl(input);
    setInput("");
    await app.models
      .predict(Clarifai.FACE_DETECT_MODEL, input)
      .then(async (response) => {
        if (response) {
          // https://rocky-oasis-94549.herokuapp.com/image
          await fetch("https://rocky-oasis-94549.herokuapp.com/image", {
            method: "PUT",
            headers: { "Content-Type": "application/json",token: localStorage.token },
            body: JSON.stringify({
              id: user.id,
            }),
          });
          user.entries++
        }
        return displayFaceBox(calculateFaceLocation(response));
      })
      .catch((err) => console.error(err));
  };

  const loadUser = (data) => {
    setUser({
      name: data.name,
      entries: data.entries,
    });
  };



  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route
            exact
            path="/dashboard"
            render={props => isAuthenticated ? (
              <div>
                <Dashboard {...props}
                  loadUser={loadUser} 
                  setAuth={setAuth} 
                  particleOptions={particleOptions}
                  onInputChange={onInputChange}
                  onSubmit={onSubmit}
                  box={box}
                  input={input}
                  imageUrl={imageUrl}
                  setUser={setUser}
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                  user={user}
                  />
              </div>
            ) : <Redirect to="/login"/>}
          />
          <Route
            exact
            path="/login"
            render={props => !isAuthenticated ? (
              <div>
                <Particles className="particles" params={particleOptions} />
                <Login 
                  setAuth={setAuth}
                  />
              </div>
            ): <Redirect to="/dashboard"/>}
          />
          <Route
            exact
            path="/register"
            render={props => !isAuthenticated ? (
              <div>
                <Particles className="particles" params={particleOptions} />
                <Register
                  setAuth={setAuth}
                />
              </div>
            ) : <Redirect to='/dashboard'/>}
          />
          </Switch>
      </Router>
    </div>
  );
}

export default App;
