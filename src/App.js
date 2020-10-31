import Clarifai from 'clarifai';
import React, {useState, useEffect} from 'react';
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
  const [isSignedIn, setIsSignedIn] = useState(false)

  useEffect(() => {
    fetch('http://localhost:3001')
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
        console.log(response)
          displayFaceBox(calculateFaceLocation(response));
          // console.log(response.outputs[0].data.regions[0].region_info.bounding_box)
        })
      .catch(err => console.log(err))
  }

  const onRouteChange = (route) => {
    if(route === 'signout') {
      setIsSignedIn(false)
    } else if(route === 'home'){
      setIsSignedIn(true)
    }
    setRoute(route);
  }

  return (
    <div className="App">
      <Particles 
        className="particles" 
        params={particleOptions}
      />
      <Nav isSignedIn={isSignedIn} onRouteChange={onRouteChange}/>
      {route === 'home' 
        ? <>
            <Logo/> 
            <Rank />
            <ImageForm onInputChange={onInputChange} onSubmit={onSubmit}/>
            <FaceRecognition box={box} imageUrl={imageUrl}/>
          </>
        : (route === 'signin' 
            ? 
              <Signin onRouteChange={onRouteChange}/> 
              : <Register onRouteChange={onRouteChange}/>
        )
      }
    </div>
  );

}

export default App;
