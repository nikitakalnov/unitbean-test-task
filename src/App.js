import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ArticlesOverview from './containers/ArticlesOverview';
import SuccessfulAddingArticle from './components/SuccessfulAddingArticle';
import './App.css';
import { connect } from 'react-redux';

import CreateArticle from './components/CreateArticle';
import Article from './containers/Article';

const App = (props) => {
  return (
    <div className="App">

      <Route exact path="/" component={ArticlesOverview}/>
      <Route exact path="/new-successful" render={(props) => <SuccessfulAddingArticle {...props} />} />
      <Route path="/new" component={CreateArticle}/>
      <Switch>
        {props.posts.map(post => {
          return <Route key={post.id} path={`/posts/${post.id}`} render={props => 
            <Article {...props} header={post.header} text={post.text} image={post.image} comments={post.comments} id={post.id}/>
          }/>
        })}
      </Switch>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    posts: state.posts
  }
}

export default connect(mapStateToProps)(App);
