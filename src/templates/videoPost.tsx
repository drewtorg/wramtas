import React from 'react';
import { graphql, Link } from 'gatsby';
import MainLayout from '../layouts';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Img from 'gatsby-image';
import { richTextToComponents } from '../utils/render';
import IFrame from '../components/IFrame/IFrame';


const VideoPost = ({ data }: any) => {
  const video = data.contentfulVideoPost;
  return (
    <MainLayout>
      <div className="videopost">
          <h1>{video.title}</h1>
          <IFrame iframe={video.embedLink} />
          {richTextToComponents(video.body.json)}
          <p>Published: {new Date(video.publishDate).toDateString()}</p>
      </div>
    </MainLayout>
  );
};
export default VideoPost;
export const pageQuery = graphql`
  query($slug: String!) {
    contentfulVideoPost(slug: { eq: $slug }) {
      id
      title
      body {
          json
      }
      embedLink
      publishDate
    }
  }
`;
