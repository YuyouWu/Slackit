import React from 'react';
import { Item, Grid } from 'semantic-ui-react';
import axios from 'axios';
import slackbot from './../img/slackbot.png'

import PostView from './PostView';

class PostList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSub: props.currentSub || 'all',
            postsData: [],
            title: '',
            author: '',
            showPost: false
        }
    }

    getPostList = () => {
        axios.get(`https://old.reddit.com/r/${this.state.currentSub}.json`).then((res) => {
            this.setState({
                postsData: res.data.data.children
            })
        });
    }

    closePostView = () => {
        this.setState({
            showPost: false
        });
    }

    componentDidMount() {
        this.getPostList();
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
            this.getPostList();
        }
    }

    render() {
        return (
            <Grid>
                <Grid.Row style={{ height: '100vh' }}>
                    <Grid.Column width={this.state.showPost ? 10 : 16}>
                        <div style={{ height: '100vh', paddingTop: 20, overflow: 'auto' }}>
                            <Item.Group style={{ paddingTop: 10 }}>
                                {this.state.postsData ?
                                    this.state.postsData.map((post, i) => {
                                        const author = post.data.author;
                                        const title = post.data.title
                                        const permaLink = post.data.permalink;
                                        return (
                                            <Item
                                                key={i}
                                                className="postTile"
                                                style={{
                                                    paddingLeft: 20
                                                }}
                                                onClick={() => {
                                                    this.setState({
                                                        permaLink: permaLink,
                                                        title: title,
                                                        author: author,
                                                        showPost: true
                                                    });
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
                                                    {
                                                        this.state.currentSub === 'all' &&
                                                        <Item.Meta
                                                            style={{
                                                                color: 'gray'
                                                            }}
                                                        >
                                                            {post.data['subreddit_name_prefixed']}
                                                        </Item.Meta>

                                                    }
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
                    </Grid.Column>
                    {this.state.showPost &&
                        <Grid.Column width={6}>
                            <div style={{ height: '100vh', paddingTop: 20, overflow: 'auto' }}>
                                <PostView closePostView={this.closePostView} permaLink={this.state.permaLink} title={this.state.title} author={this.state.author} />
                            </div>
                        </Grid.Column>
                    }
                </Grid.Row>
            </Grid>
        )
    }
}
export default PostList