import React from 'react';
import { Button, Item, Image } from 'semantic-ui-react';
import axios from 'axios';
import isImageUrl from 'is-image-url';
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
            <div style={{marginRight: 10}}>
                <Image
                    fluid
                    src={this.state.postData.url}
                />
            </div>
        )
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
            <div>
                <Button
                    basic
                    style={{float: 'right', marginRight: 10}}
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
                            {isImageUrl(this.state.postData.url) && 
                                this.renderPostImage()
                            }
                        </Item.Content>
                    </Item>
                </Item.Group>
            </div>
        )
    }
}
export default PostView