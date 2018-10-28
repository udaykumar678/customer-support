import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

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
            error: false
        }
    }
    clickHandler = (event) => {
        this.setState({
            problemId: event.target.value
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
            axios.get('/api/user/help/'+userId).then(resp => {
                this.setState({
                    isLoading: false,
                    problems: resp.data
                });
            });
        }
    }
    selfFix = (event) => {
        event.preventDefault();

    };
    requestRep = (event) => {
        event.preventDefault();
        const data = {
            problemId: this.state.problemId,
            description: this.state.problemDesc
        };
        axios.post('/api/user/issues', data).then(resp => {

            sessionStorage.removeItem('description');
        });
    };
    render(){
        const userId = this.props.match.params.userId;
        let redirect = null;
        if(!userId){
            redirect = <Redirect to="/"/>
        }
        let error = null;
        let problems = null;
        if(this.state.problems){
            problems = this.state.problems.map(p => <p key={p.id}>
                <input type="radio" name={"problem"} value={p.id} id={"problem-"+p.id} onClick={this.clickHandler}/>
                <label htmlFor={"problem-"+p.id}>{p.description}</label>
            </p>);
        }
        return (
            <EmptyComp>
                {redirect}
                {this.state.problems ? (
                    <form className={'form-inline'}>
                        <h1 className={"card-header"}>Please select the problems that you are facing.</h1>
                        {problems}
                        <p id="other-problem">
                            <input type="radio" name={"problem"} value={"others"}
                                   onClick={this.clickHandler} disabled={false}
                                   id={"others"}/>
                            <label htmlFor={'other-problem'}>Others</label>
                        </p>
                        <textarea rows={10} cols={50}
                                  value={this.state.value} onChange={this.changeHandler} placeholder={"Enter your comments here"}>
                    </textarea>
                        <div className={'btn-group'}>
                            <button onClick={this.selfFix} disabled={!this.state.problemId}>Self Fix</button>
                            <button onClick={this.requestRep} disabled={!this.state.problemId}>Request for Help</button>
                        </div>
                    </form>
                ): null}
            </EmptyComp>
        );
    }
}

export default imageWrapper(Problems, 'support-comp');