import React from 'react';
import axios from 'axios';

import imageWrapper from '../../hoc/ImageWrapper';
import EmptyComp from '../../hoc/EmptyComp';
import './Rep.css';

class Rep extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: null
        };
    }
    clickHandler = () => {
        console.log(this.props);
        // axios.get('http://localhost:9000/api/v1/rep/issue/555').then(resp => {
        //     console.log(resp.data);
        //     this.setState({
        //         isLoading: false,
        //         problems: resp.data.issue
        //     });
        // }).catch(err => console.log(err.message));
        this.props.history.push('/rep/issue');
        //this.props.history.push('user/check-problems/1');
    };
    componentDidMount(){
        axios.get('http://localhost:9000/api/v1/rep/31').then(resp => {
            console.log(resp.data);
            this.setState({
                isLoading: false,
                problems: resp.data.issue
            });
        }).catch(err => console.log(err.message));
    }
    render(){
        let p = null;
        let problems = null;
        if(this.state.problems){
            p = this.state.problems;
            problems = <table>
                <tr><td>Account ID</td><td>Date</td><td>Issue Type</td></tr>
                <tr onClick={(event) => this.clickHandler(event, p)}><td>{p.user_id}</td><td>{p.date}</td><td>Billing</td></tr>
            </table>
        }
        return (
            <EmptyComp>
                <h1 className={"header"}>Representative Dashboard</h1>
                <div className={"listing"}>{problems}</div>
            </EmptyComp>
        );
    }
}


export default imageWrapper(Rep, 'support-comp');