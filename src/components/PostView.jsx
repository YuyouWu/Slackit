import React from 'react';
import { Button, Item, Image, Loader, Dimmer } from 'semantic-ui-react';
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
            loading: true,
            title: props.title
        }
    }

    getPostData = () => {
        axios.get(`https://www.reddit.com${this.props.permaLink}.json`).then(res => {
            this.setState({
                loading: false,
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
                <video width="500" height="300" controls>
                    <source src={this.state.postData['secure_media']['reddit_video']['fallback_url']} />
                </video>
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
            if (this.state.postData.media.oembed['provider_name'] !== "YouTube" && !this.state.postData.url.endsWith("gifv")) {
                return (
                    <Image
                        fluid
                        src={this.state.postData.media.oembed['thumbnail_url']}
                    />
                )
            }
        }
        if (this.state.postData.url && this.state.postData.url.endsWith("gifv")) {
            if (this.state.postData.preview && this.state.postData.preview['reddit_video_preview']) {
                return (
                    <ReactPlayer
                        url={this.state.postData.preview['reddit_video_preview']['fallback_url']}
                        controls={true}
                    />
                )
            }
        }
    }

    renderLink = () => {
        return (
            <Button href={this.state.postData.url}>{this.state.postData.url}</Button>
        )
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
            this.setState({
                loading: true
            });
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
                            {this.state.loading &&
                                <Dimmer active inverted>
                                    <Loader inverted />
                                </Dimmer>
                            }
                            {this.renderPostVideo()}
                            {isImageUrl(this.state.postData.url) &&
                                this.renderPostImage()
                            }
                            {this.renderGIF()}
                            {this.renderText()}
                            <div>
                                {this.renderLink()}
                            </div>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </div>
        )
    }
}
export default PostView