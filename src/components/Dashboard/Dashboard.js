import React, { Fragment } from 'react';
import Particles from 'react-particles-js';
import FaceRecognition from '../FaceRecognition/FaceRecognition';
import ImageForm from '../ImageForm/ImageForm';
import Logo from '../Logo/Logo';
import Nav from '../Navigation/Navigation';
import Rank from '../Rank/Rank';

const Dashboard = ({isLogin, onRouteChange,particleOptions,user,onInputChange,onSubmit,box,imageUrl}) => {
    return (
        <Fragment>
            <div>
            {<h1>Hello</h1>}
              {/* <Nav 
                // isLogin={isLogin} 
                // onRouteChange={onRouteChange} 
                /> */}
              {/* <Particles className="particles" params={particleOptions} /> */}
              {/* <Logo /> */}
              {/* <Rank user={user} /> */}
              {/* <ImageForm onInputChange={onInputChange} onSubmit={onSubmit} /> */}
              {/* <FaceRecognition box={box} imageUrl={imageUrl} /> */}
            </div>
            
        </Fragment>
    )
}


export default Dashboard;