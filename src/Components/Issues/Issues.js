import React from 'react';
import imageWrapper from '../../hoc/ImageWrapper';
import './Issues.css';

class Issues extends React.Component{
    constructor(props){
    super(props);
    this.state = {
        issue : {}
    };
}
    render(){
        const {issue} = this.state;
        return (
            <div className="issues">
                <h1>Issues</h1>
                {issue? (
                    <div>
                        <p><span>Issue Id: </span><span>{issue.issueId}</span></p>
                        <p><span>Customer Name: </span><span>{issue.customerName}</span></p>
                        <p><span>Region: </span><span>{issue.region}</span></p>
                        <p><span>Problem: </span><span>{issue.problem}</span></p>
                        <p><span>Given Solution: </span><span>{issue.solution}</span></p>
                    </div>
                ) : null}
            </div>
        );
    }
}

export default imageWrapper(Issues, 'support-comp');