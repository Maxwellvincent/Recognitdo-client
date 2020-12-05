import React, { Fragment, useState,useEffect } from 'react';
import Particles from 'react-particles-js';
import FaceRecognition from '../FaceRecognition/FaceRecognition';
import ImageForm from '../ImageForm/ImageForm';
import Logo from '../Logo/Logo';
import Nav from '../Navigation/Navigation';
import Rank from '../Rank/Rank';

const Dashboard = ({particleOptions,setUser, user,setAuth, isAuthenticated, onInputChange,onSubmit,box,imageUrl, loadUser}) => {


  async function getName() {
    try {
      const response = await fetch("http://localhost:3001/dashboard/", {
        method: "GET",
        headers:{token: localStorage.token}
      });

      const parseRes = await response.json();
      setUser({name: parseRes.name,entries: parseRes.entries})
      loadUser(parseRes);
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
  },[])

    return (
        <Fragment>
            <div>

              <Nav
                logout={logout}
                setAuth={setAuth}
                isAuthenticated={isAuthenticated} 
                />
              <Particles className="particles" 
                params={particleOptions} 
                />
              <Rank 
                user={user}  
                />
              <ImageForm onInputChange={onInputChange} onSubmit={onSubmit} getName={getName}/>
              <FaceRecognition box={box} imageUrl={imageUrl} />
            </div>
            
        </Fragment>
    )
}


export default Dashboard;