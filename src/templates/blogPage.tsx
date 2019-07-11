import React from 'react';
import { graphql, Link } from 'gatsby';
import MainLayout from '../layouts';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const BlogPage = ({ data }: any) => {
  const posts = data.contentfulBlogPage.blogPosts;
  return (
    <MainLayout>
      <div className="blogpage">
        {posts !== null &&
          posts.map((post: any) => (
            <div key={post.id} className="row">
              <div className="col">
                <Link to={post.slug} className="blog-title">
                  {post.title}
                </Link>
                {documentToReactComponents(post.bodyHtml.json)}
                <p>Published: {new Date(post.publishDate).toDateString()}</p>
              </div>
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
        slug
        publishDate
      }
    }
  }
`;
