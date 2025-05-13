import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Home.css';

import CardGrid from '../component/CardGrid';
import TrendingRoundSection from '../component/TrendingRoundSection';
import ContactSection from '../component/ContactSection';

const Home = () => {
  return (
    <>
      <TrendingRoundSection />

      <div className="home-container">
        
        <div className="carousel-box">
          <Carousel
            autoPlay
            interval={3000}
            infiniteLoop
            showThumbs={false}
            showArrows={false}   
            showStatus={false}
            showIndicators={false}
            stopOnHover={false}
          >
            <div>
              <img
                src="https://i.postimg.cc/KzNGN51v/pic1.webp"
                alt="Outfit 1"
              />
            </div>
            <div>
              <img
                src="https://i.postimg.cc/ZnsTkKPG/pexels-godisable-jacob-226636-1154861.jpg"
                alt="Outfit 2"
              />
            </div>
            <div>
              <img
                src="https://i.postimg.cc/Qtp9r5VR/pexels-sam-lion-5709643.jpg"
                alt="Outfit 3"
              />
            </div>
          </Carousel>
        </div>

        <div className="right-section">
          <h1>New Trending Arrivals</h1>
          <p className="subtext">Discover the latest styles curated just for you</p>
          <button className="view-more-btn">View More</button>
        </div>
      </div>

      <section>
        <CardGrid />
      </section>

      <ContactSection />
    </>
  );
};

export default Home;
