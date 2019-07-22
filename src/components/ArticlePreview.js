import React from 'react';
import styled from 'styled-components';

import { createTextPreview, constructDate } from '../helpers';

const ArticlePreviewLayout = styled.div`
  display: inline-block;
  box-shadow: 1px 2px 4px 2px rgba(0, 0, 0, 0.25);
  /* width: 35vw;
  height: 32vw;*/
  width: 100%;
  height: 52vh;
  border-radius: 5px;
  font-family: 'Myriad Pro', sans-serif;
`;

const PostImage = styled.div`
  background-image: url(${props => props.image});
  background-position: center;
  height: 42%;
  width: 100%;
  border-radius: 5px 5px 0 0;
`;

const PostHeader = styled.h3`
  margin-top: 14px;
  margin-bottom: 8px;
  font-weight: normal;
  padding: 0 25px;
`;

const PostText = styled.p`
  font-family: 'Myriad Pro Light', sans-serif;
  /* border-top: 1px solid #c4c4c4; */
  padding: 12px 25px;
  margin: 0;
`;

const PostDate = styled.p`
  font-family: 'Myriad Pro Light', sans-serif;
  margin-top: 0;
  margin-bottom: 12px;
  padding: 0 25px;
`;

const TextWrapper = styled.div`
  width: 100%;
  border-top: 1px solid #c4c4c4;
`;

// Высота картинки - 14vw

const articlePreview = (props) => {

  return (
    <ArticlePreviewLayout>
      <PostImage image={props.image}></PostImage>
      <PostHeader>{props.header}</PostHeader>
      <PostDate>{constructDate(props.date)}</PostDate>
      <TextWrapper>
        <PostText>{createTextPreview(props.text, 145)}</PostText>
      </TextWrapper>
    </ArticlePreviewLayout>
  );
}

export default articlePreview;