import React from 'react';
import axios from 'axios';

import imageWrapper from '../../hoc/ImageWrapper';
import EmptyComp from '../../hoc/EmptyComp';
import './Support.css';

class Support extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: null
        };
    }
    clickHandler = () => {
        console.log(this.props);
        this.props.history.push('user/check-problems/'+this.state.user.userId);
    };
    componentDidMount(){
        axios.get('/api/users').then(resp => {
            const users = resp.data;
            const rIndex = Math.floor(Math.random() * users.length);
            const rUser = users[rIndex];
            this.setState({
                user: rUser
            });
        }).catch(err => console.log(err.message));
    }
    render(){
        return (
            <EmptyComp>
                <h1 className={"header"}>WELCOME TO T-MOBILE SUPPORT</h1>
                <div className={'helper'} onClick={this.clickHandler}>Help ?</div>
            </EmptyComp>
        );
    }
}


export default imageWrapper(Support, 'support-comp');