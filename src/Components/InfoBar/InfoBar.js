import React from 'react';
import {withRouter} from 'react-router-dom';

import './InfoBar.css';
const infoBar = (props) => {
    let name = 'Standard User';
    if(props.location.pathname.indexOf('admin') > -1){
        name = 'Standard Representative';
    }
    return (
        <div className={"info-bar"}>
            <p className={"card-text"}>{name}</p>
        </div>
    );
};

export default withRouter(infoBar);