import React, { useState } from 'react';

function NotificationList({ name, imgSrc, time }) {
    return (
        <div className="notification-list">
            <div className="notification-list_img">
                <img src={imgSrc} alt="user" />
            </div>
            <div className="notification-list_detail">
                <p><b>{name}</b> reacted to your post</p>
                <p><small>{time}</small></p>
            </div>
        </div>
    );
}

function GenerateNotifications() {
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    return (
        <div className={` ${expanded ? 'expanded' : 'notification-ui_dd'}`}>
            <div className="notification-ui_dd-header bg-body-secondary" onClick={toggleExpanded}>
                <h3 className="text-start">Notification</h3>
            </div>
            <div className={`notification-ui_dd-content ${expanded ? 'show' : 'hide'}`}>
                <div className="notification-column">
                    <h5 className="text-start text-black-50">New</h5>
                    <NotificationList 
                        name="John Doe"
                        imgSrc="https://i.imgur.com/zYxDCQT.jpg"
                        time="10 mins ago"
                    />
                    <NotificationList
                        name="Richard Miles"
                        imgSrc="https://i.imgur.com/w4Mp4ny.jpg"
                        time="1 day ago"
                    />
                </div>
                <div className="notification-column">
                    <h5 className="text-start text-black-50">Earlier</h5>
                    <NotificationList
                        name="Brian Cumin"
                        imgSrc="https://i.imgur.com/ltXdE4K.jpg"
                        time="1 day ago"
                    />
                    <NotificationList
                        name="Lance Bogrol"
                        imgSrc="https://i.imgur.com/CtAQDCP.jpg"
                        time="1 day ago"
                    />
                </div>
            </div>
            <div className="notification-ui_dd-footer">
                {/* <button className="btn btn-success btn-block" onClick={toggleExpanded}>
                    {expanded ? 'Collapse' : 'View All'}
                </button> */}
            </div>
        </div>
    );
}

export default function App() {
    return <GenerateNotifications />;
}
