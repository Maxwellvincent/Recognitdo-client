import React from 'react'
import Header from '../LandingPage/components/Header';
import Card from '../LandingPage/components/Card';
import Contact from '../LandingPage/components/Contact';
import Button from '../Button/Button';
import './Landing.css';

const LandingPage = () => {
    return (
        <div className="landing-main">
            <Header/>
            <Card
                className="section"
                img='https://images.unsplash.com/photo-1485796826113-174aa68fd81b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'
                title='About the Company'
                description='With a focus on face recognition technology we build on the experience gained through hundreds of successful installations worldwide. With this application you can identify a face within an image. The more images that are identified, a user will see an increase in their number of entries.'
            />
            <Card
                className="section bg-grey"
                img='https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_1024/https://connectedremag.com/wp-content/uploads/2019/10/facial-recognition-connected-real-estate-1024x916.png'
                title='The Technology'
                description='Our technology is world-class and pioneering - designed for a wide range of commercial environments, from retail outlets and hospitals to sports arenas and hotels, the FRC system identifies an individuals face.'
            />
            <Card
                className="section"
                // img='./Capture1.PNG'
                title='How to get started?'
                description={<>To test the application sign into the application with <strong>guest@mail.com</strong> and password <strong>123</strong>. Once logged in you can submit an image url of an individuals head, and our facial recognition software with outline a face upon the image.</>}
            />
            <div className="btn-order">
                <Button route="signin"/>
                <Button route="register"/>
            </div>
           
            <Contact/>
        </div>
    )
}

export default LandingPage
