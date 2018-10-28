import React from 'react';
import axios from 'axios';

import imageWrapper from '../../hoc/ImageWrapper';
import EmptyComp from '../../hoc/EmptyComp';
import './Repissue.css';

class Repissue extends React.Component{
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
        axios.get('http://localhost:9000/api/v1/rep/issue/1').then(resp => {
            console.log(resp.data);
            // const users = resp.data;
            // const rIndex = Math.floor(Math.random() * users.length);
            // const rUser = users[rIndex];
            this.setState({
                data: resp.data.userdata,
                issue: resp.data.issue
            });
        }).catch(err => console.log(err.message));
    }
    render(){
        let data = null;
        let issue = null;
        let dom = null;
        if(this.state.data && this.state.issue){
            data = this.state.data;
            issue = this.state.issue;
            dom =      <table className={"all"}>
            <tbody>

                <tr><td>First Name: {data.firstname}</td><td>Last Name: {data.lastname}</td><td>Age: {data.age}</td><td>Sex: {data.sex}</td></tr>
                <tr><td>Account Status: {data.account_stt}</td><td>Past Bill Issues: {data.amnt_bill_issues}</td><td>No of Disconnections: {data.amnt_disconnections_ten_min}</td><td>Total Tech Issues: {data.amnt_tech_issues}</td></tr>
                <tr><td>Avg Bill Paid: {data.avg_bill_paid}</td><td>Avg data rate: {data.avg_speed}</td><td>Communication Pref: {data.common_interaction_type}</td><td>Device age: {data.device_age}</td></tr>
                <tr><td>Failed login: {data.failed_acct_login}</td><td>Failed message(s):{data.failed_msg_amnt}</td><td>Issue origin: {data.issue_origin}</td><td>Issue status: Unresolved</td></tr>

            </tbody>
        </table>
        }
        return (
            <EmptyComp>
                <h1 className={"header"}>Issue Details</h1>
                <div className={"tabel"} >
                    {dom}
                </div>
                <div className={'update'} onClick={this.clickHandler}>Update</div>
            </EmptyComp>
        );
    }
}


export default imageWrapper(Repissue, 'support-comp');