import Clarifai from 'clarifai';
import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageForm from './components/ImageForm/ImageForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register'
import config from './config';
import './App.css';
import LandingPage from './components/LandingPage/LandingPage';


toast.configure();
const app = new Clarifai.App({
  
  apiKey: `${config.API_KEY}`
 });


const particleOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

function App() {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [box, setBox] = useState({});
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
            id: '',
            name: '',
            email: '',
            entries: 0,
            joined: ''
  });

  useEffect(() => {
    fetch('https://rocky-oasis-94549.herokuapp.com/api/')
    .then(resp => resp.json())
  })

  const calculateFaceLocation = (data) => {
    const clarafaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarafaiFace.left_col * width,
      topRow: clarafaiFace.top_row * height,
      rightCol: width - (clarafaiFace.right_col * width),
      bottomRow: height - (clarafaiFace.bottom_row * height)
    }
  }

  const displayFaceBox = (box) => {
    setBox(box);
  }


  const onInputChange = e => {
    setInput(e.target.value)
  };

  const onSubmit = async () => {
    setImageUrl(input);
    await app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        input)
      .then( async response => {
        if(response){
          await fetch('https://rocky-oasis-94549.herokuapp.com/image', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: user.id
            })
          })
          .then(async response => response.json())
          .then(async count => {
            user.entries = count;
          })
        }
          return displayFaceBox(calculateFaceLocation(response));
        })
      .catch(err => console.error(err))
  }

  const onRouteChange = (route) => {
    if(route === 'signout') {
      setIsSignedIn(false)
      
    } else if(route === 'home'){
      setIsSignedIn(true)
      
    } else if (route === 'signin'){
      setIsSignedIn(false);
    }
    setRoute(route);
  }

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    });
  }

  return (
    <div className="App">
      <Router>
        {/* <Particles 
          className="particles" 
          params={particleOptions}
        /> */}
        {/* <Nav isSignedIn={isSignedIn} onRouteChange={onRouteChange}/> */}
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/home" render={ props => 
            <div>
              <Nav isSignedIn={isSignedIn} onRouteChange={onRouteChange}/> 
              <Particles className="particles" params={particleOptions}/>
              <Logo/>
              <Rank user={user}/>
              <ImageForm onInputChange={onInputChange} onSubmit={onSubmit}/>
              <FaceRecognition box={box} imageUrl={imageUrl}/>
            </div>
          
          } 
        />
        <Route exact path="/signin" render={props => 
                <div>
                    <Particles className="particles" params={particleOptions}/>
                    <Signin onRouteChange={onRouteChange} loadUser={loadUser}/>
                </div>
                }
        />
        <Route exact path="/register" render={props => 
                <div>
                    <Particles className="particles" params={particleOptions}/>
                    <Register onRouteChange={onRouteChange} loadUser={loadUser} isSignedIn={isSignedIn}/>
                </div>
                }
        />
          {/* {route === 'home' 
            ? <>
                <Logo/> 
                <Rank user={user}/>
                <ImageForm onInputChange={onInputChange} onSubmit={onSubmit}/>
                <FaceRecognition box={box} imageUrl={imageUrl}/>
              </>
            : (route === 'signin' 
                ? 
                  <Signin onRouteChange={onRouteChange} loadUser={loadUser}/> 
                  : <Register onRouteChange={onRouteChange} loadUser={loadUser}/>
            )
          } */}
      </Router>
    </div>
  );

}

export default App;
