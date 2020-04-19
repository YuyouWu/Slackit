import React from 'react';
import { Item } from 'semantic-ui-react';
import axios from 'axios';

class PostList extends React.Component {
    constructor() {
        super();
        this.state = {
            currentSub: localStorage.getItem('currentSub') || 'all',
            postsData: []
        }
    }

    componentDidMount() {
        axios.get(`https://old.reddit.com/r/${this.state.currentSub}.json`).then((res) => {
            this.setState({
                postsData: res.data.data.children
            })
        });
    }

    render() {
        return (
            <div style={{ height: '100vh', paddingTop: 20, overflow: 'auto' }}>
                <Item.Group>
                    {this.state.postsData ?
                        this.state.postsData.map((post, i) => {
                            const author = post.data.author;
                            const title = post.data.title
                            return (
                                <Item 
                                    className="postTile"
                                    style={{
                                        paddingLeft: 20
                                    }}
                                    onClick ={() => {
                                        console.log(title);
                                    }}
                                > 
                                    <Item.Content>
                                        <Item.Meta
                                            style={{
                                                fontWeight: 'bold',
                                                color: 'black'
                                            }}
                                        >
                                            {author}
                                        </Item.Meta>
                                        <Item.Meta
                                            style={{
                                                color: 'black'
                                            }}
                                        >
                                            {title}
                                        </Item.Meta>
                                    </Item.Content>
                                </Item>

                            )
                        })
                        : (
                            <p> You done goofed </p>
                        )
                    }
                </Item.Group>
            </div>
        )
    }
}
export default PostList