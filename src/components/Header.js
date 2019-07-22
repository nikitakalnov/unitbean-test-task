import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import BlackLogo from '../assets/BlackLogo.svg';
import AddArticle from '../assets/AddArticleButton.svg';

import { Link } from 'react-router-dom';

const HeaderLayout = styled.div`
  width: 74vw;
  margin: auto;
  padding-top: 60px;
  display: flex;
  justify-content: space-between;
  /* align-items: flex-start; */
  align-items: stretch;
`;

const Logo = styled.img`
  height: 7vh;
`;

const ArticlesNumber = styled.p`
  font-size: 2.3em;
  font-family: 'Myriad Pro Light', sans-serif;
  margin: 12px 0;
`;

const AddArticleButton = styled.img`
  height: 15vh;
  cursor: pointer;
`;

const header = (props) => {
  return (
    <HeaderLayout>
      <span>
        <Logo src={BlackLogo}/>
        <ArticlesNumber>{`Статьи, ${props.postsNumber}`}</ArticlesNumber>
      </span>
      <Link to="/new"><AddArticleButton src={AddArticle}/></Link>
    </HeaderLayout>
  );
}

const mapStateToProps = state => (
  {
    postsNumber: state.posts.length
  }
);

export default connect(mapStateToProps)(header);