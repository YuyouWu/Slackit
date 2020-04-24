import React from 'react';
import { Menu, Input, Grid, Label, Icon, Divider, Popup } from 'semantic-ui-react';
import PostList from './../PostList';

class SubredditList extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedSub: localStorage.getItem('currentSub') || 'all',
            enteredSub: '',
            subList: JSON.parse(localStorage.getItem('subList')) || [],
            workspaceName: 'Slackit',
            userName: 'Username'
        }
        //Create key subList if none exists
        if (localStorage.getItem('subList') === null) {
            localStorage.setItem('subList', JSON.stringify([]));
        }
    }

    handleSubClick = (e, { name }) => {
        this.setState({
            selectedSub: name
        }, () => {
            localStorage.setItem('currentSub', name)
        });
    }

    handleAddSub = (event) => {
        if (event.key === 'Enter') {
            //
            let subList = JSON.parse(localStorage.getItem('subList'));
            subList.push(event.target.value.toLowerCase());
            localStorage.setItem('subList', JSON.stringify(subList));
            //
            this.setState({
                enteredSub: '',
                subList: JSON.parse(localStorage.getItem('subList')) || []
            })
        }
    }

    handleRemoveSub = (i) => {
        let subList = JSON.parse(localStorage.getItem('subList'));
        if (i > -1) {
            subList.splice(i, 1);
        }
        localStorage.setItem('subList', JSON.stringify(subList));
        this.setState({
            subList: JSON.parse(localStorage.getItem('subList')) || []
        })
    }

    render() {
        const { selectedSub, enteredSub, subList } = this.state
        return (

            <Grid>
                <Grid.Row style={{ height: '100vh' }}>
                    <Grid.Column width={2} style={{ paddingRight: 0, minWidth: '150px', maxWidth: '350px' }}>
                        <Menu
                            inverted
                            vertical
                            borderless
                            style={{
                                height: '100vh',
                                width: '100%',
                                backgroundColor: '#1D2229',
                                borderRadius: 0,
                                overflow: 'auto'
                            }}

                        >
                            <Popup
                                pinned
                                on="click"
                                position='bottom center'
                                trigger={
                                    <Menu.Item style={{ paddingBottom: 5 }}>
                                        <p style={{ display: 'inline' }}>
                                            {this.state.workspaceName}
                                        <Icon name="angle down" />
                                        </p>
                                    </Menu.Item>
                                }
                            >
                                <Input
                                    type="text"
                                    placeholder='Change Workspace Name'
                                    onChange={(event) => {
                                        this.setState({
                                            workspaceName: event.target.value
                                        })
                                    }}
                                />
                            </Popup>
                            <Popup
                                pinned
                                on="click"
                                position='bottom center'
                                trigger={

                                    <Menu.Item style={{ paddingTop: 5, paddingBottom: 10 }}>
                                        <p style={{ display: 'inline' }}>
                                            <Label circular color="green" style={{ fontSize: 5, marginRight: 10 }} />
                                     {this.state.userName}
                                </p>
                                    </Menu.Item>
                                }>
                                <Input
                                    type="text"
                                    placeholder='Change Username'
                                    onChange={(event) => {
                                        this.setState({
                                            userName: event.target.value
                                        })
                                    }}
                                />
                            </Popup>
                            <Divider />
                            <Menu.Item>
                                <Input
                                    type="text"
                                    value={enteredSub}
                                    placeholder='Add subreddit'
                                    onKeyPress={this.handleAddSub}
                                    onChange={(event) => {
                                        this.setState({
                                            enteredSub: event.target.value
                                        })
                                    }}
                                >
                                </Input>
                            </Menu.Item>
                            <Menu.Item>
                                Channels
                            </Menu.Item>
                            <Menu.Item
                                name='all'
                                fitted='vertically'
                                color='blue'
                                active={selectedSub === 'all'}
                                onClick={this.handleSubClick}
                            >
                                <p style={{ paddingTop: 5, paddingBottom: 5 }}># all</p>
                            </Menu.Item>
                            {subList.map((sub, i) => {
                                return (
                                    <Menu.Item
                                        className="subMenuItem"
                                        name={sub}
                                        key={i}
                                        fitted='vertically'
                                        color='blue'
                                        active={selectedSub === sub}
                                        onClick={this.handleSubClick}
                                    >
                                        <Label
                                            className="deleteSubLabel"
                                            as='a'
                                            color='red'
                                            style={{ marginTop: 5, paddingBottom: 5 }}
                                            size='tiny'
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                this.handleRemoveSub(i);
                                            }}
                                        >
                                            X
                                        </Label>
                                        <p style={{ paddingTop: 5, paddingBottom: 5 }}># {sub}</p>
                                    </Menu.Item>
                                )
                            })}
                            <Menu.Item>
                                Direct Message
                            </Menu.Item>
                            <Menu.Item
                                name='uuwu'
                                fitted='vertically'
                                color='blue'
                                active={selectedSub === 'uuwu'}
                            >
                                <p style={{ paddingTop: 5, paddingBottom: 5, display: 'inline' }}>
                                    <Label circular color="green" style={{ fontSize: 5, marginRight: 10 }} />
                                     UUWU
                                </p>
                            </Menu.Item>
                        </Menu >
                    </Grid.Column>
                    <Grid.Column width={14} tyle={{ paddingLeft: 0 }}>
                        <PostList currentSub={selectedSub} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        )
    }
}

export default SubredditList