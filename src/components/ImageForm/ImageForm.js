import React from 'react'
import './ImageForm.css';

function ImageForm({ onInputChange, onSubmit }) {
    return (
        <div>
            <p className="f3">
                {'This will detect a face in your picture.'}
            </p>
            <div className="center">
                <div className="form center pa4 br3 shadow-5">
                    <label htmlFor="user-img" style={{color: "white", padding: '.3rem'}}>Insert Image Url:</label>
                    <input 
                    className='f4 pa2 w-70 center' type="text"
                    id="user-img"
                    onChange={onInputChange}
                    />
                    <button 
                        className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
                        onClick={onSubmit}
                    >
                        Detect
                    </button>
                </div>
                
            </div>
        </div>
    )
}

export default ImageForm