import React from 'react';
import { graphql } from 'gatsby';
import MainLayout from '../layouts';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const BlogPost = ({ data }: any) => {
  const post = data.contentfulBlogPost;
  return (
    <MainLayout>
      <div className="blogpost">
        <h1>{post.title}</h1>
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
    }
  }
`;
