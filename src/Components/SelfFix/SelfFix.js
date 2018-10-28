import React from 'react';
import axios from 'axios';

import EmptyComp from '../../hoc/EmptyComp';
import imageWrapper from '../../hoc/ImageWrapper';
class SelfFix extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            steps: null,
            pId : null
        };
    }
    componentDidMount(){
        const pId = this.props.match.params.pId;
        axios.get('/api/steps/'+pId).then(resp => {
            this.setState({
                steps: resp.data,
                pId: pId
            });
        });
    }
    requestRep = (event) => {
        event.preventDefault();
        const data = {
            problemId: this.state.pId,
            description: sessionStorage.getItem('description') || ''
        };
        axios.post('/api/user/issues', data).then(resp => {

            sessionStorage.removeItem('description');
        });
    };
    render(){
        let steps = null;
        if(this.state.steps){
            steps = this.props.steps.map(step => <li key={step.id}>{step.description}</li>);
        }
        return (
            <EmptyComp>
                <h1 className={"card-header"}>Please follow the below steps to fix the issue</h1>
                {steps}
                {
                    this.state.steps ? (
                        <div>
                            <p>
                                Click <b>Yes</b> if you have fixed the issue else <b>No</b> to send a request to Customer Representative.
                            </p>
                            <div>
                                <span onClick={() => this.props.history.push('/')}>Yes</span>
                                <span>No</span>
                            </div>
                        </div>
                    ) : null
                }
            </EmptyComp>
        );
    }
}
export default imageWrapper(SelfFix, 'support-comp');