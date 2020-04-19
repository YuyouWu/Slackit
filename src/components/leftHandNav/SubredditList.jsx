import React from 'react';
import { Menu, Input, Grid } from 'semantic-ui-react';
import PostList from './../PostList';

class SubredditList extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedSub: localStorage.getItem('currentSub') || 'all',
            enteredSub: '',
            subList: JSON.parse(localStorage.getItem('subList')) || []
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


    render() {
        const { selectedSub, enteredSub, subList } = this.state
        return (

            <Grid>
                <Grid.Row style={{ height: '100vh' }}>
                    <Grid.Column width={2} style={{ paddingRight: 0, minWidth: '150px', maxWidth:'350px' }}>
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
                                        name={sub}
                                        key={i}
                                        fitted='vertically'
                                        color='blue'
                                        active={selectedSub === sub}
                                        onClick={this.handleSubClick}
                                    >
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
                                onClick={this.handleSubClick}

                            >
                                <p style={{ paddingTop: 5, paddingBottom: 5 }}> - UUWU</p>
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