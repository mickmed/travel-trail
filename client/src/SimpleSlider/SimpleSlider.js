import React from "react";
import Slider from "react-slick";
import "./SimpleSlider.css"

export default class SimpleSlider extends React.Component {
  
 
  render() {
    let locationInfo = this.props.locationInfo;
// console.log(locationInfo && locationInfo.city)
    let imgObjs = [];
    for (let key in locationInfo) { 
      if (key === "images") {
       
        imgObjs.push(locationInfo[key]);
      }
    }
    let images = [];
   
    imgObjs[0] &&
      imgObjs[0].map(image => {
       
        images.push(image.imageBase64);
      });
  
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div>
      {/* <p>{locationInfo && locationInfo.city}</p> */}
      <Slider {...settings}>
      
        {imgObjs[0] &&
          imgObjs[0].map(
            (image, index) => 
            
            <div className="sliderImage">
             
                <img src={image.imageBase64} />
              
            </div>
          )}
        
      </Slider>
      </div>
    );
  }
}
