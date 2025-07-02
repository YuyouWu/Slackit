import React from 'react';
import { Button, Item, Image, Sticky, Loader, Dimmer, Divider } from 'semantic-ui-react';
import axios from 'axios';
import isImageUrl from 'is-image-url';
import ReactPlayer from 'react-player'
import parse from 'html-react-parser';

import CommentList from './CommentList';

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

function decodeHtml(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
}

class PostView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postData: '',
            commentData: '',
            loading: true,
            title: props.title,
            width: 600, // Default width
            isResizing: false,
            startX: 0,
            startWidth: 600
        }
        this.resizeRef = React.createRef();
    }

    getPostData = () => {
        axios.get(`https://www.reddit.com${this.props.permaLink}.json`).then(res => {
            this.setState({
                loading: false,
                postData: res.data[0].data.children[0].data,
                commentData: res.data[1].data.children
            });
        })
    }

    renderPostImage = () => {
        return (
            <div>
                <Image
                    src={this.state.postData.url}
                    style={{
                        maxWidth: '500px',
                        maxHeight: '500px',
                        width: 'auto',
                        height: 'auto'
                    }}
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
                    width="500px"
                    height="300px"
                />
            )
        }
    }

    renderGIF = () => {
        if (this.state.postData.media && this.state.postData.media.oembed && this.state.postData.media.oembed['thumbnail_url']) {
            if (this.state.postData.media.oembed['provider_name'] !== "YouTube" && !this.state.postData.url.endsWith("gifv")) {
                return (
                    <Image
                        src={this.state.postData.media.oembed['thumbnail_url']}
                        style={{
                            maxWidth: '500px',
                            maxHeight: '500px',
                            width: 'auto',
                            height: 'auto'
                        }}
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
                        width="500px"
                        height="300px"
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
                <div>
                    {parse(decodeHtml(this.state.postData['selftext_html']))}
                </div>
            )
        }
    }

    componentDidMount() {
        this.getPostData();
        // Add global mouse event listeners for resizing
        document.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('mouseup', this.handleMouseUp);
    }

    componentWillUnmount() {
        // Clean up event listeners
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseup', this.handleMouseUp);
    }

    handleMouseDown = (e) => {
        e.preventDefault();
        // Store the initial mouse position and current width when starting to resize
        this.setState({ 
            isResizing: true,
            startX: e.clientX,
            startWidth: this.state.width
        });
    }

    handleMouseMove = (e) => {
        if (this.state.isResizing) {
            // Calculate the change in mouse position
            const deltaX = this.state.startX - e.clientX;
            // Apply the change to the starting width
            const newWidth = this.state.startWidth + deltaX;
            
            // Set minimum and maximum width constraints
            const minWidth = 300;
            const maxWidth = window.innerWidth * 0.8;
            
            if (newWidth >= minWidth && newWidth <= maxWidth) {
                this.setState({ width: newWidth });
                // Notify parent component of width change
                if (this.props.onWidthChange) {
                    this.props.onWidthChange(newWidth);
                }
            }
        }
    }

    handleMouseUp = () => {
        this.setState({ isResizing: false });
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
            <div style={{ 
                width: '100%',
                height: '100%',
                position: 'relative',
                borderLeft: '1px solid #DCDCDC',
                paddingLeft: '20px'
            }}>
                {/* Resize handle */}
                <div
                    style={{
                        position: 'absolute',
                        left: -5,
                        top: 0,
                        bottom: 0,
                        width: 10,
                        cursor: 'col-resize',
                        backgroundColor: 'transparent',
                        zIndex: 1000
                    }}
                    onMouseDown={this.handleMouseDown}
                />
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
                <Divider/>
                {this.state.commentData &&
                    <CommentList commentData={this.state.commentData} level={0}/>
                }
            </div>
        )
    }
}
export default PostView