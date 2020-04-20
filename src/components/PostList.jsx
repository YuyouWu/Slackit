import React from 'react';
import { Item, Grid, Label, Button, Dimmer, Loader, Icon, Sticky } from 'semantic-ui-react';
import axios from 'axios';
import PostView from './PostView';

import profilePic0 from './../img/profilePic0.png'
import profilePic1 from './../img/profilePic1.png'
import profilePic2 from './../img/profilePic2.png'
import profilePic3 from './../img/profilePic3.png'
import profilePic4 from './../img/profilePic4.png'
import profilePic5 from './../img/profilePic5.png'
import profilePic6 from './../img/profilePic6.png'
import profilePic7 from './../img/profilePic7.png'
import profilePic8 from './../img/profilePic8.png'
import profilePic9 from './../img/profilePic9.png'

const profilePicArr = [
    profilePic0,
    profilePic1,
    profilePic2,
    profilePic3,
    profilePic4,
    profilePic5,
    profilePic6,
    profilePic7,
    profilePic8,
    profilePic9
]

class PostList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSub: props.currentSub || 'all',
            postsData: [],
            title: '',
            author: '',
            postHint: '',
            loading: true,
            page: 0,
            showPost: false
        }
    }

    getPostList = () => {
        axios.get(`https://old.reddit.com/r/${this.state.currentSub}.json`).then((res) => {
            this.setState({
                loading: false,
                postsData: res.data.data.children
            }, () => {
                console.log(this.state.postsData);
            })
        });
    }

    getNextPage = () => {
        const lastPostID = this.state.postsData[this.state.postsData.length - 1].data.name;
        //Fetch 25 more post after the last post 
        axios.get(`https://old.reddit.com/r/${this.state.currentSub}/.json?count=25&after=${lastPostID}`).then((res) => {
            this.setState({
                loading: false,
                postsData: res.data.data.children
            })
        });
    }

    getPrevPage = () => {
        const firstPostID = this.state.postsData[0].data.name;
        //Fetch 25 more post after the last post 
        axios.get(`https://old.reddit.com/r/${this.state.currentSub}/.json?count=26&before=${firstPostID}`).then((res) => {
            this.setState({
                loading: false,
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
            this.setState({
                loading: true
            });
            this.getPostList();
        }
    }

    render() {
        return (
            <Grid>
                <Grid.Row style={{ height: '100vh' }}>
                    <Grid.Column width={this.state.showPost ? 10 : 16} style={{ paddingLeft: 0 }}>
                        {this.state.loading &&
                            <Dimmer active inverted>
                                <Loader inverted />
                            </Dimmer>
                        }
                        <div style={{ height: '100vh', overflow: 'auto' }}>
                            <Sticky>
                                <div style={{ backgroundColor: 'white', borderBottom: '1px solid #DCDCDC'}}>
                                    <Item style={{ padding: 20 }}>
                                        <Item.Content>
                                            <Item.Meta
                                                style={{
                                                    fontWeight: 'bold',
                                                    color: 'black'
                                                }}
                                            >
                                                #{this.state.currentSub}
                                            </Item.Meta>
                                            <Item.Meta
                                                style={{
                                                    color: 'black',
                                                    marginTop: 5
                                                }}
                                            >
                                                {
                                                    this.state.postsData && this.state.postsData[0] ?
                                                        (
                                                            <div>
                                                                <Icon name="user outline" style={{ fontSize: 12, color: 'grey' }} />
                                                                {this.state.postsData[0].data['subreddit_subscribers']}
                                                            </div>
                                                        )
                                                        :
                                                        null
                                                }
                                            </Item.Meta>
                                        </Item.Content>
                                    </Item>
                                </div>
                            </Sticky>

                            <Item.Group style={{ paddingTop: 10 }}>
                                {this.state.postsData ?
                                    this.state.postsData.map((post, i) => {
                                        const author = post.data.author;
                                        const title = post.data.title
                                        const permaLink = post.data.permalink;
                                        const score = post.data.score;
                                        const postHint = post.data['post_hint'];
                                        const profilePicIdx = i%9;
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
                                                        postHint: postHint,
                                                        profilePicIdx: profilePicIdx,
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
                                                    src={profilePicArr[profilePicIdx]}
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
                                                    <Item.Meta>
                                                        {/* <Label basic size="tiny"><Icon name="thumbs up outline"/> {score}</Label> */}
                                                        <Label basic size="tiny"><span role="img" aria-label="thumbs-up">👍</span> {score}</Label>
                                                    </Item.Meta>
                                                </Item.Content>
                                            </Item>
                                        )
                                    })
                                    : (
                                        <p> You done goofed </p>
                                    )
                                }
                                {this.state.page > 0 &&
                                    <Button
                                        style={{ marginBottom: 10, marginLeft: 20 }}
                                        onClick={() => {
                                            this.setState({
                                                loading: true,
                                                page: this.state.page - 1
                                            });
                                            this.getPrevPage();
                                        }}
                                    >
                                        Prev Page
                                </Button>
                                }

                                <Button
                                    style={{ marginBottom: 10, marginLeft: 20 }}
                                    onClick={() => {
                                        this.setState({
                                            loading: true,
                                            page: this.state.page + 1
                                        });
                                        this.getNextPage();
                                    }}
                                >
                                    Next Page
                                </Button>
                            </Item.Group>
                        </div>
                    </Grid.Column>
                    {this.state.showPost &&
                        <Grid.Column width={6} style={{paddingLeft:0}}>
                            <div style={{ height: '100vh', overflow: 'auto' }}>
                                <PostView
                                    closePostView={this.closePostView}
                                    permaLink={this.state.permaLink}
                                    currentSub={this.state.currentSub}
                                    title={this.state.title}
                                    author={this.state.author}
                                    postHint={this.state.postHint}
                                    profilePicIdx={this.state.profilePicIdx}
                                />
                            </div>
                        </Grid.Column>
                    }
                </Grid.Row>
            </Grid>
        )
    }
}
export default PostList