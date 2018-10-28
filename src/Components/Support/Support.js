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
        this.props.history.push('user/check-problems/'+this.state.user.id);
        //this.props.history.push('user/check-problems/1');
    };
    componentDidMount(){
        axios.get('http://10.21.55.203:9000/api/v1/users').then(resp => {
            console.log(resp);
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