import React from 'react';
import { Item, Button } from 'semantic-ui-react';
import parse from 'html-react-parser';

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

class CommentList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            level: props.level + 1,
            expandedComments: {}
        }
    }

    handleExpand = (index) => {
        this.setState((prevState) => ({
            expandedComments: {
                ...prevState.expandedComments,
                [index]: true
            }
        }));
    }

    render() {
        return (
            <Item.Group>
                {this.props.commentData.map((comment, i) => {
                    if (comment.kind !== "more") {
                        const hasReplies = comment && comment.data && comment.data.replies && comment.data.replies.data && comment.data.replies.data.children && comment.data.replies.data.children.length > 0;
                        const isExpanded = this.state.expandedComments[i];
                        return (
                            <Item key={i}>
                                <Item.Image
                                    style={{
                                        height: 35,
                                        width: 35,
                                        marginTop: 5,
                                        borderRadius: '10%',
                                        overflow: 'hidden'
                                    }}
                                    src={profilePicArr[i % 9]}
                                />

                                <Item.Content>
                                    <Item.Meta
                                        style={{
                                            fontWeight: 'bold',
                                            color: 'black'
                                        }}
                                    >
                                        {comment.data.author}
                                    </Item.Meta>
                                    <Item.Meta
                                        style={{
                                            color: 'black'
                                        }}
                                    >
                                        <div>
                                            {parse(decodeHtml(comment.data['body_html']))}
                                        </div>
                                    </Item.Meta>
                                    {this.state.level < 3 && hasReplies && (
                                        <CommentList commentData={comment.data.replies.data.children} level={this.state.level} />
                                    )}
                                    {this.state.level === 3 && hasReplies && !isExpanded && (
                                        <Button onClick={() => this.handleExpand(i)} style={{marginTop: '8px'}}>Expand more replies</Button>
                                    )}
                                    {this.state.level === 3 && hasReplies && isExpanded && (
                                        <CommentList commentData={comment.data.replies.data.children} level={this.state.level} />
                                    )}
                                </Item.Content>
                            </Item>
                        )
                    }
                    return null; // Return null for "more" comments
                })}
            </Item.Group>
        )
    }
}
export default CommentList