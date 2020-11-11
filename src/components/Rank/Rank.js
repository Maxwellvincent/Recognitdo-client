import React from 'react'
import './Rank.css';

const Rank = ({user}) => {
  console.log(user);
  // const {name, entries} = user.user
    return (
        <div>
            <div className='white f3'>
              {`${user.name.toUpperCase()}, you have submited `} 
            </div>
            <div className='white f1'>
              {`${user.entries} images`}  
            </div>
        </div>
    )
}

export default Rank
