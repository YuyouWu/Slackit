import React from 'react';
import { Menu } from 'semantic-ui-react';

class SubredditList extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedSub: 'all'
        }
    }

    handleSubClick = (e, { name }) => {
        this.setState({
            selectedSub: name
        })
    }

    render() {
        const { selectedSub } = this.state
        return (
            <Menu
                inverted
                vertical
                borderless
                style={{ height: '100vh' }}

            >
                <Menu.Item>
                    Channels
                </Menu.Item>
                <Menu.Item
                    name='all'
                    fitted='vertically'
                    active={selectedSub === 'all'}
                    onClick={this.handleSubClick}
                >
                    <p style={{paddingTop:5, paddingBottom:5}}># all</p>
                </Menu.Item>
                <Menu.Item
                    name='home'
                    fitted='vertically'
                    active={selectedSub === 'home'}
                    onClick={this.handleSubClick}

                >
                    <p style={{paddingTop:5, paddingBottom:5}}># home</p>
                </Menu.Item>
                <Menu.Item>
                    Direct Message
                </Menu.Item>
            </Menu >
        )
    }
}

export default SubredditList