import React from 'react';
import { Grid } from 'semantic-ui-react'

import SubredditList from './components/leftHandNav/SubredditList'
import PostList from './components/PostList'

import './App.css';

function App() {
  return (
    <div className="App">
      <Grid>
        <Grid.Row style={{height: '100vh'}}>
          <Grid.Column width={3}>
            <SubredditList />
          </Grid.Column>
          <Grid.Column width={13}>
            <PostList />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default App;
