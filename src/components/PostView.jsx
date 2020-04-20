import React from 'react';
import { Button, Item, Image, Sticky, Loader, Dimmer } from 'semantic-ui-react';
import axios from 'axios';
import isImageUrl from 'is-image-url';
import ReactPlayer from 'react-player'

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
                <Sticky>
                    <div style={{ backgroundColor: 'white', borderBottom: '1px solid #DCDCDC' }}>
                        <Item style={{ padding: 20 }}>
                            <Item.Content>
                                <Item.Meta
                                    style={{
                                        fontWeight: 'bold',
                                        color: 'black'
                                    }}
                                >
                                    <Button
                                        basic
                                        floated="right"
                                        onClick={() => {
                                            this.props.closePostView()
                                        }}
                                    >
                                        X
                                    </Button>
                                    Thread
                                </Item.Meta>
                                <Item.Meta
                                    style={{
                                        color: 'black',
                                        marginTop: 5
                                    }}
                                >
                                    #{this.props.currentSub}
                                </Item.Meta>
                            </Item.Content>
                        </Item>
                    </div>
                </Sticky>

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
                            src={profilePicArr[this.props.profilePicIdx]}
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