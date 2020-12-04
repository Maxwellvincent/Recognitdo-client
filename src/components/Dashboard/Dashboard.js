import React, { Fragment, useState,useEffect } from 'react';
import Particles from 'react-particles-js';
import FaceRecognition from '../FaceRecognition/FaceRecognition';
import ImageForm from '../ImageForm/ImageForm';
import Logo from '../Logo/Logo';
import Nav from '../Navigation/Navigation';
import Rank from '../Rank/Rank';

const Dashboard = ({isLogin, onRouteChange,particleOptions,setUser,setAuth, isAuthenticated, onInputChange,onSubmit,box,imageUrl}) => {
  const [userData,setUserData] = useState({
    name: "",
    entries: ""
  });

  async function getName() {
    try {
      const response = await fetch("http://localhost:3001/dashboard/", {
        method: "GET",
        headers:{token: localStorage.token}
      });

      const parseRes = await response.json();
      // console.log(parseRes);

      setUserData({name: parseRes.name, entries: parseRes.entries})
    } catch (err) {
      console.error(err.message);
    }
  }

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token")
    setAuth(false);
  }

  useEffect(() => {
    getName()
    // To update the names once submitted i need to implement something here, that will trigger the entries to update. 
  },[])

    return (
        <Fragment>
            <div>

              <Nav
                logout={logout}
                setAuth={setAuth}
                isAuthenticated={isAuthenticated} 
                // isLogin={isLogin} 
                // onRouteChange={onRouteChange} 
                />
              <Particles className="particles" 
                params={particleOptions} 
                />
              {/* <Logo /> */}
              <Rank user={userData} />
              <ImageForm onInputChange={onInputChange} onSubmit={onSubmit} getName={getName}/>
              <FaceRecognition box={box} imageUrl={imageUrl} />
            </div>
            
        </Fragment>
    )
}


export default Dashboard;