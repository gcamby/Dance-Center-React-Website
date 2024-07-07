/* React imports */
import React from "react";
/* Sub-component imports */
/* Library imports */
/* JSON imports */



function HomePageCard(props){
    return(
        <a href={props.route}>
        <div className="home-page-card">
            <img src={props.imgSource} alt={props.altText} className="home-page-card-image"></img>
            <div className="home-page-card-container">
              <h4 className="home-page-card-title">{props.title}</h4>
              <p className="home-page-card-text">{props.text}</p>
            </div>
        </div>
        </a>
    );


}

export default HomePageCard