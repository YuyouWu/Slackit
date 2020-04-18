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
                    active={selectedSub === 'all'}
                    onClick={this.handleSubClick}
                >
                    # all
                </Menu.Item>
                <Menu.Item
                    name='home'
                    active={selectedSub === 'home'}
                    onClick={this.handleSubClick}

                >
                    # home
                </Menu.Item>
                <Menu.Item>
                    Direct Message
                </Menu.Item>
            </Menu >
        )
    }
}

export default SubredditList