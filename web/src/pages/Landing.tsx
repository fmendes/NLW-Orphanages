import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import '../styles/pages/landing.css';

import logoImg from '../images/Logo.svg';

function Landing() {
    return (
        <div id="page-landing">
          <div className="content-wrapper" >
            <img src={logoImg} alt="Happy"/>
    
            <main>
              <h1>Bring happiness to the world</h1>
              <p>Visit orphanages and change the life of many kids.</p>
            </main>
    
            <div className="location">
              <strong>Plano</strong>
              <span>Texas</span>
            </div>
    
            <Link to="/app" className="enter-app" >
              <FiArrowRight size={26} color="rgba( 0,0,0,0.6 )" />
            </Link>
    
          </div>
          {/* <Title text="Hello world" />
          <Title text="Hello world 2" /> */}
        </div>
    );
}

export default Landing;