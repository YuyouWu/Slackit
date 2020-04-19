import React from 'react';
import { Button, Item, Image } from 'semantic-ui-react';
import axios from 'axios';
import isImageUrl from 'is-image-url';
import ReactPlayer from 'react-player'

import slackbot from './../img/slackbot.png'


class PostView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postData: '',
            commentData: '',
            title: props.title
        }
    }

    getPostData = () => {
        axios.get(`https://www.reddit.com${this.props.permaLink}.json`).then(res => {
            this.setState({
                postData: res.data[0].data.children[0].data,
                commentData: res.data[1].data.children
            })
        })
    }

    renderPostImage = () => {
        return (
            <div>
                <Image
                    fluid
                    src={this.state.postData.url}
                />
            </div>
        )
    }

    renderPostVideo = () => {
        if (this.state.postData['secure_media'] && this.state.postData['secure_media']['reddit_video'] && this.state.postData['secure_media']['reddit_video']['hls_url']) {
            return (
                <ReactPlayer
                    url={this.state.postData['secure_media']['reddit_video']['hls_url']}
                    controls={true}
                />
            )
        } else if (this.state.postData.url && this.state.postData['secure_media'] && this.state.postData['secure_media'].type === "youtube.com") {
            return (
                <ReactPlayer
                    url={this.state.postData.url}
                    controls={true}
                />
            )
        }
    }

    renderGIF = () => {
        if (this.state.postData.media && this.state.postData.media.oembed && this.state.postData.media.oembed['thumbnail_url']) {
            if (this.state.postData.media.oembed['provider_name'] !== "YouTube") {
                return (
                    <Image
                        fluid
                        src={this.state.postData.media.oembed['thumbnail_url']}
                    />
                )
            }
        }
    }

    renderText = () => {
        if (this.state.postData.selftext) {
            return (
                <p>
                    {this.state.postData.selftext}
                </p>
            )
        }
    }


    componentDidMount() {
        this.getPostData();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.title !== prevState.title) {
            return ({
                title: nextProps.title
            })
        } else return null;
    }


    componentDidUpdate(prevProps) {
        if (prevProps.title !== this.state.title) {
            this.getPostData();
        }
    }

    render() {
        return (
            <div style={{ marginRight: 20 }}>
                <Button
                    basic
                    style={{ float: 'right' }}
                    onClick={() => {
                        this.props.closePostView()
                    }}
                >
                    X
                </Button>
                <Item.Group>
                    <Item>
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
                                {this.props.author}
                            </Item.Meta>
                            <Item.Meta
                                style={{
                                    color: 'black'
                                }}
                            >
                                {this.props.title}
                            </Item.Meta>
                            {this.renderPostVideo()}
                            {isImageUrl(this.state.postData.url) &&
                                this.renderPostImage()
                            }
                            {this.renderGIF()}
                            {this.renderText()}
                        </Item.Content>
                    </Item>
                </Item.Group>
            </div>
        )
    }
}
export default PostView