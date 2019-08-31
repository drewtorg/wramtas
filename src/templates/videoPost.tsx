import React from 'react';
import { graphql, Link } from 'gatsby';
import MainLayout from '../layouts';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Img from 'gatsby-image';
import { richTextToComponents } from '../utils/render';


const VideoPost = ({ data }: any) => {
  const video = data.contentfulVideoPost;
  return (
    <MainLayout>
      <div className="videopost">
          {/* Video */}
      </div>
    </MainLayout>
  );
};
export default VideoPost;
// export const pageQuery = graphql`
//   query($slug: String!) {
//     contentfulVideoPost(slug: { eq: $slug }) {
//       id
//       title
//       bodyHtml {
//           json
//       }
//       videoLink
//       publishDate
//     }
//   }
// `;
