import React from 'react';
class PostList extends React.Component {
    constructor() {
        super();
        this.state = {
            currentSub: localStorage.getItem('currentSub') || 'all',
        }
    }
    render() {
        return(
            <div style={{height:'100vh'}}>
                {this.state.currentSub}
            </div>
        )
    }
}
export default PostList