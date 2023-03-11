import React from "react";
import './loader.css';

function Loader() {
  return (
      <div className="loaderContainer">
        <h6 style={{color: "red"}}>Espere por favor ...</h6>
        <div className="lds-roller">
          <div>
          </div>
          <div>
          </div>
          <div>
          </div>
          <div>
          </div>
          <div>
          
          </div>
          <div>
          </div>
          <div>
          </div>
          <div>
          </div>
          </div>
      </div>
  );
}

export default Loader;