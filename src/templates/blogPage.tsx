import React from 'react';
import { graphql } from 'gatsby';
import MainLayout from '../layouts';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const BlogPage = ({ data }: any) => {
  const posts = data.contentfulBlogPage.blogPosts;
  return (
    <MainLayout>
      <div className="blogpage">
        {posts !== null &&
          posts.map((post: any) => (
            <div key={post.id}>
              <h2>{post.title}</h2>
              {documentToReactComponents(post.bodyHtml.json)}
            </div>
          ))}
      </div>
    </MainLayout>
  );
};
export default BlogPage;
export const pageQuery = graphql`
  query($slug: String!) {
    contentfulBlogPage(slug: { eq: $slug }) {
      blogPosts {
        id
        title
        bodyHtml {
          json
        }
        publishDate
      }
    }
  }
`;
