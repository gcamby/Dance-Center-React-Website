import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HomePageCard from '../components/HomePageCard';

function Home() {
    
    const [homePageCards, setHomePageCards] = useState([]);

    useEffect(() => {
      const fetchHomePageCards = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/home-page-cards');
          setHomePageCards(response.data);
        } catch (error) {
          console.error('Error fetching homePageCard:', error);
        }
      };

      fetchHomePageCards();
    }, []);

    function createHomePageCard(card) {
        return(
            <HomePageCard 
            key = {card.id}
            route = {card.route}
            imgSource = {card.imgSource}
            altText = {card.altText}
            title = {card.title}
            text = {card.text}
            />
        );
      }
    
    return(
        <div id="main-container">
            <div id="mosaic-section">
                {homePageCards.map(createHomePageCard)}

            </div>
        </div>
    );
}

export default Home;