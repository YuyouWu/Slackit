import React from 'react';
import { Item } from 'semantic-ui-react';
import axios from 'axios';
import slackbot from './../img/slackbot.png'

class PostList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSub: props.currentSub || 'all',
            postsData: []
        }
    }

    getPostData = () => {
        axios.get(`https://old.reddit.com/r/${this.state.currentSub}.json`).then((res) => {
            this.setState({
                postsData: res.data.data.children,
            })
        });
    }

    componentDidMount() {
        this.getPostData();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.currentSub !== prevState.currentSub) {
            return ({
                currentSub: nextProps.currentSub
            })
        } else return null;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.currentSub !== this.state.currentSub) {
            this.getPostData();
        }
    }

    render() {
        return (
            <div style={{ height: '100vh', paddingTop: 20, overflow: 'auto' }}>
                {/* <Item.Group>
                    <Item
                        style={{
                            paddingLeft: 20,
                            position: "absolute",
                        }}
                    >
                        <Item.Content>
                            <Item.Meta
                                style={{
                                    fontWeight: 'bold',
                                    color: 'black'
                                }}
                            >
                                # {this.state.currentSub}
                            </Item.Meta>
                        </Item.Content>
                    </Item>
                </Item.Group> */}
                <Item.Group style={{ paddingTop: 10 }}>
                    {this.state.postsData ?
                        this.state.postsData.map((post, i) => {
                            const author = post.data.author;
                            const title = post.data.title
                            return (
                                <Item
                                    key={i}
                                    className="postTile"
                                    style={{
                                        paddingLeft: 20
                                    }}
                                    onClick={() => {
                                        console.log(title);
                                    }}
                                >
                                    <Item.Image
                                        style={{
                                            height: 35,
                                            width: 35,
                                            marginTop: 5,
                                            borderRadius: '10%',
                                            overflow: 'hidden'
                                        }}
                                        src={slackbot}
                                    />
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