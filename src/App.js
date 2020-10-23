import Clarifai from 'clarifai';
import React, {useState} from 'react';
import Nav from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageForm from './components/ImageForm/ImageForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import './App.css';


const app = new Clarifai.App({
  apiKey: '710e4185216f486dbfa1fa62118ae660'
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


  const onInputChange = e => {
    setInput(e.target.value)
  };

  const onSubmit = () => {
    setImageUrl(input);
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        input)
      .then(response => console.log(response.outputs[0].data.regions[0].region_info.bounding_box))
      .catch(err => console.log(err))
  }

  return (
    <div className="App">
      <Particles 
        className="particles" 
        params={particleOptions}
      />
      <Nav/>
      <Logo />
      <Rank/>
      <ImageForm 
        onInputChange={onInputChange} 
        onSubmit={onSubmit}/>
      <FaceRecognition imageUrl={imageUrl}/> 
    </div>
  );
}

export default App;
