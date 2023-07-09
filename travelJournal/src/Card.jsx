import React from "react";

export default function Card(props) {
  return (
    <>
      <div className="card">
        <img className="card--image" src={props.imageUrl} alt="" />
        <div className="card--content">
          <div className="card--location">
            <span className="material-symbols-outlined">location_on</span>
            <span className="location--text">{props.location}</span>
            <a className="location--map" href={props.googleMapsUrl}>
              View on Google Maps
            </a>
          </div>
          <h1 className="card--name">{props.title}</h1>
          <span className="card--time">
            {props.startDate} - {props.endDate}
          </span>
          <p className="card--description">{props.description}</p>
        </div>
      </div>
    </>
  );
}

