import React, { Component, Fragment } from 'react';
import ArticlePreview from '../components/ArticlePreview';
import Header from '../components/Header';
import Article from './Article';
import styled from 'styled-components';
import { connect } from 'react-redux';
import axios from 'axios';

import { Switch, Route, Link } from 'react-router-dom';

import * as postsActions from '../store/actions/posts';

const api = 'http://localhost:3001/' 

const Layout = styled.div`
  width: 74vw;
  margin: auto;
  display: grid;
  grid-gap: 4vw;
  grid-template-columns: 1fr;
  padding: 70px 0;

  @media only screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  & > a {
    color: inherit;
    text-decoration: none;
  }

`;

class ArticlesOverview extends Component {


  componentDidMount() {
    this.props.loadPosts();
  }

  render() {
    let postsSortedByDate;
    if(this.props.posts.length !== 0) 
      postsSortedByDate = [...this.props.posts].sort((postA, postB) => Date.parse(postB.date) - Date.parse(postA.date))
        .map((post) =>
          <Link to={`/posts/${post.id}`} key={post.id}> 
            <ArticlePreview 
              key={post.id.toString()} 
              header={post.header} 
              text={post.text} 
              image={post.image}
              date={post.date}
            />
          </Link>
        );
    else
      postsSortedByDate = <p style={{fontFamily: 'Myriad Pro', fontSize: '1.5em'}}>Пока здесь нет ни одного поста</p>;

    return (
      <Fragment>
        <Header/>
        <Layout>
          { postsSortedByDate }
        </Layout>

        <Switch>
          {this.props.posts.map(post => {
            return <Route key={post.id} path={`/posts/${post.id}`} render={props => 
              <Article {...props} header={post.header} text={post.text} image={post.image} comments={post.comments}/>
            }/>
          })}
        </Switch>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts
});

const mapDispatchToProps = dispatch => {
  return {
    loadPosts: () => {
      axios.get(`${api}posts`)
        .then(response => {
          console.log(response);
          let loadedPosts = response.data;
          dispatch({type: postsActions.loadPosts, posts: loadedPosts});
        });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesOverview);