import React from "react";
import './Popup.css'

function Notify(props)
{
    return(props.trigger) ? (
        <div className="notify">
            <div className="notify-inner">
                <button className="close-btn" onClick={()=> props.setTrigger(false)} >X</button>
                { props.children }
            </div>

        </div>
    ) : "";
}

export default Notify