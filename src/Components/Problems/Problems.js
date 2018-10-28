import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import ReactDom from 'react-dom';
import Popup from 'react-popup';

import imageWrapper from '../../hoc/ImageWrapper';
import EmptyComp from '../../hoc/EmptyComp';
import './Problems.css';

class Problems extends  React.Component{
    constructor(props){
        super(props);
        this.state = {
            problemId: null,
            problemDesc: sessionStorage.getItem('description') || '',
            problems: null,
            isLoading: false,
            userId: null,
            error: false,
            problem: null
        }
    }
    clickHandler = (event, p) => {
        this.setState({
            problemId: event.target.value,
            problem: p
        });
    };
    changeHandler = (event) => {
        sessionStorage.setItem('description', event.target.value);
        this.setState({
            problemDesc: event.target.value
        });
    };
    componentDidMount(){
        const userId = this.props.match.params.userId;
        if(userId && this.state.userId !== userId){
            this.setState({isLoading: true, userId: userId});
            axios.get('http://localhost:9000/api/v1/user/help/'+userId).then(resp => {
                console.log(userId);
                axios.get('http://localhost:9000/api/v1/user/issues/'+userId).then(resp => {
                    console.log(resp.data);
                    this.setState({
                        isLoading: false,
                        problems: resp.data.genIssues
                    });
                });
            });
            /*axios.get('http://localhost:3004/genIssues').then(resp => {
                /!*let userIssue  = {};
                resp = resp.data;
                if(resp.userIssue) {
                    userIssue.id = resp.userIssue.id;
                    userIssue.name = resp.userIssue.id + " " + resp.userIssue.date;
                    userIssue.description = "User Generated";
                    resp.genIssues.push(userIssue);
                }*!/
                console.log(resp);
                this.setState({
                    isLoading: false,
                    problems: resp.data
                });
            });*/
        }
    }
    selfFix = (event) => {
        event.preventDefault();

    };
    requestRep = (event) => {
        event.preventDefault();
        const {problem} = this.state;
        problem.details = this.state.problemDesc;
        axios.post('http://localhost:9000/api/v1/user/issues/4', problem).then(resp => {
            console.log(resp);
            sessionStorage.removeItem('description');
            this.props.history.push('/user/check-problem/done/');

        });
    };

    render(){
        const userId = this.props.match.params.userId;
        let redirect = null;
        if(!userId){
            redirect = <Redirect to="/"/>
        }
        let problems = null;
        if(this.state.problems){
            problems = this.state.problems.map(p => <p key={p.id}>
                <input type="radio" name={"problem"} value={p.id} id={"problem-"+p.id} onClick={(event) => this.clickHandler(event, p)}/>
                <label htmlFor={"problem-"+p.id}>{p.name + ' - '+ p.description}</label>
            </p>);
        }
        return (
            <EmptyComp>
                {redirect}
                {this.state.problems ? (
                    <form className={'form-inline mnb'}  >
                        <h1 className={"card-header"}>Please select the problems that you are facing.</h1>
                        {problems}
                        {/*<p id="other-problem">
                            <input type="radio" name={"problem"} value={"others"}
                                   onClick={this.clickHandler} disabled={false}
                                   id={"others"}/>
                            <label htmlFor={'other-problem'}>Others</label>
                        </p>*/}
                        <textarea rows={10} cols={50}
                                  value={this.state.value} onChange={this.changeHandler} placeholder={"Enter your comments here"}>
                    </textarea>
                        <div className={'btn-group'}>
                            {/*<button onClick={this.selfFix} disabled={!this.state.problemId}>Self Fix</button>*/}
                            <button onClick={this.requestRep} disabled={!this.state.problemId}>Request for Help</button>
                            <button  >Self Help</button>
                        </div>
                    </form>
                ): null}
            </EmptyComp>
        );
    }
}

export default imageWrapper(Problems, 'support-comp');