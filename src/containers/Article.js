import React, { Component } from 'react';
import styled from 'styled-components';

import Comment from '../components/Comment';
import CreateComment from '../components/CreateComment';

const Layout = styled.div`
  width: 74vw;
  margin: auto;
  padding-top: 5vh;
  padding-bottom: 10vh;
`;

const ArticleImage = styled.img`
  max-height: 25vh;
  max-width: 100%;
  margin-bottom: 0.8rem;
  margin-top: 1rem;
`;

const ArticleHeader = styled.h1`
  font-family: 'Myriad Pro';
  margin-bottom: 0.5em;
`;

const ArticleText = styled.p`
  font-family: 'Myriad Pro';
  margin-bottom: 2.5em;
  line-height: 1.2;
  white-space: pre-line;
`;

class Article extends Component {

  render() {
    const commentsSortedByDate = [...this.props.comments].sort((commentA, commentB) => Date.parse(commentB.date) - Date.parse(commentA.date));

    return (
      <Layout>
        <ArticleHeader>{this.props.header}</ArticleHeader>
        {
          this.props.image && <ArticleImage src={this.props.image}/>
        }
        {console.log(this.props.image)}
        <ArticleText>{this.props.text}</ArticleText>
        <CreateComment postId={this.props.id}/>
        {commentsSortedByDate.map(comment => {
          return <Comment key={`${comment.username}-${comment.date}`} username={comment.username} text={comment.text} date={comment.date} avatar={comment.avatar}/>
        })}
      </Layout>
    );
  }
}

export default Article;