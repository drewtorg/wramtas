import React from 'react';
import { graphql } from 'gatsby';
import MainLayout from '../layouts';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const BlogPost = ({ data }: any) => {
  const { title, bodyHtml } = data.contentfulBlogPost;
  return (
    <MainLayout>
      <div className="blogpost">
        <h1>{title}</h1>
        {documentToReactComponents(bodyHtml.json)}
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
      bodyHtml {
        json
      }
    }
  }
`;
