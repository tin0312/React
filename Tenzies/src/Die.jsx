import React from "react";

export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  }
  const dot = {
    backgroundColor: props.isHeld ? "white" : "black",
  }

  {
    /*if props.value = 1 */
  }
  return (
    <div className="die-face" style={styles} onClick={props.holdDice}>
      <h2 className="die-num">
        { props.value === 1 &&
        <div className="dice-face-face first-face">
          <span style = {dot} className="dot"></span>
        </div>
}       { props.value === 2 &&
        <div className="dice-face second-face">
          <span style = {dot} className="dot"></span>
          <span style = {dot} className="dot"></span>
        </div>
}       { props.value === 3 &&

        <div className="dice-face third-face">
          <span style = {dot} className="dot"></span>
          <span style = {dot} className="dot"></span>
          <span style = {dot} className="dot"></span>
        </div>
}       { props.value === 4 &&

        <div className="fourth-face dice-face">
          <div className="column">
            <span style = {dot} className="dot"></span>
            <span style = {dot} className="dot"></span>
          </div>
          <div className="column">
            <span style = {dot} className="dot"></span>
            <span style = {dot} className="dot"></span>
          </div>
        </div>
}       { props.value === 5 &&
        <div className="fifth-face dice-face">
          <div className="column">
            <span style = {dot} className="dot"></span>
            <span style = {dot} className="dot"></span>
          </div>

          <div className="column">
            <span style = {dot} className="dot"></span>
          </div>

          <div className="column">
            <span style = {dot} className="dot"></span>
            <span style = {dot} className="dot"></span>
          </div>
        </div>
}       { props.value === 6 &&
        <div className="sixth-face dice-face">
          <div className="column">
            <span style = {dot} className="dot"></span>
            <span style = {dot} className="dot"></span>
            <span style = {dot} className="dot"></span>
          </div>
          <div className="column">
            <span style = {dot} className="dot"></span>
            <span style = {dot} className="dot"></span>
            <span style = {dot} className="dot"></span>
          </div>
        </div>}
        
      </h2>
    </div>
  );
}
