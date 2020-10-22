import React from 'react';
import Nav from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageForm from './components/ImageForm/ImageForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';

import './App.css';

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
  return (
    <div className="App">
      <Particles 
        className="particles" 
        params={particleOptions}
      />
      <Nav/>
      <Logo />
      <Rank/>
      <ImageForm />
      {/* 
      <FaceRecognition/> */}
    </div>
  );
}

export default App;
