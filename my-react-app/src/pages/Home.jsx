/* React imports */
import React from 'react';
/* Sub-component imports */
import HomePageCard from '../components/HomePageCard';
import HomePageCardData from '../../json/home_page_cards.json'
/* Library imports */
/* JSON imports */

function Home(props) {

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
      <div>
        <div id="main-container">
            <div id="mosaic-section">
                {HomePageCardData.homePageCards.map(createHomePageCard)}
            </div>
        </div>
      </div>
    );
}

export default Home;