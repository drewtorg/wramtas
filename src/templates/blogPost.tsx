import React from 'react';
import { graphql } from 'gatsby';
import MainLayout from '../layouts';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Img from 'gatsby-image';

const BlogPost = ({ data }: any) => {
  const post = data.contentfulBlogPost;
  return (
    <MainLayout>
      <div className="blogpost">
        <h1>{post.title}</h1>
        <div className="row justify-content-center">
          <div className="col-xs-12 col-sm-8">
            <Img fluid={post.heroImage.fluid} />
          </div>
        </div>
        {documentToReactComponents(post.bodyHtml.json)}
        <p>Published: {new Date(post.publishDate).toDateString()}</p>
      </div>
    </MainLayout>
  );
};
export default BlogPost;
export const pageQuery = graphql`
  query($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      slug
      publishDate
      bodyHtml {
        json
      }
      heroImage {
        fluid {
          ...GatsbyContentfulFluid
        }
      }
    }
  }
`;
