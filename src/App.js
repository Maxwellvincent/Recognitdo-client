import Clarifai from 'clarifai';
import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Link, useHistory } from "react-router-dom";
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

// Checking API

const app = new Clarifai.App({
  // apiKey: '710e4185216f486dbfa1fa62118ae660'
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
  const history = useHistory();

  useEffect(() => {
    fetch('http://localhost:3001/api/')
    .then(resp => resp.json())
    .then(console.log)
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
    console.log(box)
    setBox(box);
  }


  const onInputChange = e => {
    setInput(e.target.value)
  };

  const onSubmit = () => {
    console.log(input);
    setImageUrl(input);
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        input)
      .then(response => {
        if(response){
          fetch('http://localhost:3001/image', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            console.log(count);
            setUser({
              entries: count
            })
          })
        }
        // console.log(response)
          return displayFaceBox(calculateFaceLocation(response));
          // console.log(response.outputs[0].data.regions[0].region_info.bounding_box)
        })
      .catch(err => console.log(err))
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
    console.log(data);
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    });
    // setUser({user: {
    //   id: data.id,
    //   name: data.name,
    //   email: data.email,
    //   entries: data.entries,
    //   joined: data.joined,
    // }});
    console.log(user);
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

                // components={{
                // Particles: <Particles className="particles" params={particleOptions}/>,
                // Logo: <Logo/>, 
                // Rank: <Rank user={user}/>,
                // ImageForm: <ImageForm onInputChange={onInputChange} onSubmit={onSubmit}/>,
                // FaceRecognition: <FaceRecognition box={box} imageUrl={imageUrl}/>
                // }}
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
                    <Register onRouteChange={onRouteChange} loadUser={loadUser}/>
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
