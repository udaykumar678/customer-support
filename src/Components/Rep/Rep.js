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
        this.props.history.push('user/check-problems/'+this.state.user.id);
        //this.props.history.push('user/check-problems/1');
    };
    componentDidMount(){
        axios.get('http://localhost:9000/api/v1/rep/31').then(resp => {
            console.log(resp.data);
            // this.setState({
            //     isLoading: false,
            //     problems: resp.data.genIssues
            // });
        }).catch(err => console.log(err.message));
    }
    render(){
        let problems = null;
        if(this.state.problems){
            problems = this.state.problems.map(p => <p key={p.id}>
                <input type="radio" name={"problem"} value={p.id} id={"problem-"+p.id} onClick={(event) => this.clickHandler(event, p)}/>
                <label htmlFor={"problem-"+p.id}>{p.name + ' - '+ p.description}</label>
            </p>);
        }
        return (
            <EmptyComp>
                <h1 className={"header"}>Representative Dashboard</h1>
                <div className={'helper'} onClick={this.clickHandler}>Help ?</div>
            </EmptyComp>
        );
    }
}


export default imageWrapper(Rep, 'support-comp');