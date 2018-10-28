import React from 'react';

const imageWrapper = (WrapperComp, classes) => {
    return class extends React.Component{
        render(){
            return (
                <div className={classes}>
                    <WrapperComp {...this.props}/>
                </div>
            );
        }
    }
};

export default imageWrapper;