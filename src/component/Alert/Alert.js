import React, { useState, useEffect } from 'react';

// const Alert = (props) => {
function DialogLong() {
    const [myArray, setMyArray] = useState([]);

    const addElement = function (newElement) {
        setTheArray(oldArray => [...oldArray, newElement]);
    }
    return (
        <>
            <div id="alert_container">
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>Holy guacamole!</strong> You should check in on some of those fields below.
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </div>
        </>
    )
}

function Alert({ data, data: { Headers, Msg } }) {
    console.log(data);
    const [visible, setVisible] = useState(true);

    const handle = (val) => {
        setVisible(val);
        setTimeout(() => {
            setVisible(false);
        }, 2500)
    }

    useEffect(() => {
        setTimeout(() => {
            setVisible(false);
        }, 2500)
    }, []);

    return (<>
        {/* <button type="button" className="btn btn-primary" id="liveToastBtn" onClick={(e) => { handle(true); }}>Show live toast</button> */}
        {visible ? <div className="toast-container position-fixed top-0 end-0 p-3"  >
            <div className="toast d-inline-block" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header">
                    {/* <img src="..." className="rounded me-2" alt="..." /> */}
                    <strong className="me-auto">{Headers}</strong>
                    {/* <small>11 mins ago</small> */}
                    <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" onClick={(e) => { handle(false); }} ></button>
                </div>
                <div className="toast-body">
                    {Msg}
                </div>
            </div>
        </div> : <></>}
    </>)
}
export { DialogLong, Alert }