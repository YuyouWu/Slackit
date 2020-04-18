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
                style={{ 
                    height: '100vh', 
                    backgroundColor: '#1D2229',
                    borderRadius: 0
                }}

            >
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
                    <p style={{paddingTop:5, paddingBottom:5}}># all</p>
                </Menu.Item>
                <Menu.Item
                    name='home'
                    fitted='vertically'
                    color='blue'
                    active={selectedSub === 'home'}
                    onClick={this.handleSubClick}

                >
                    <p style={{paddingTop:5, paddingBottom:5}}># home</p>
                </Menu.Item>
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
                    <p style={{paddingTop:5, paddingBottom:5}}> - UUWU</p>
                </Menu.Item>

            </Menu >
        )
    }
}

export default SubredditList