const Promise = require('bluebird');
const path = require('path');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return graphql(
    `
      {
        allContentfulBlogPost {
          edges {
            node {
              slug
            }
          }
        }
      }
    `
  )
    .then(result => {
      if (result.errors) {
        console.log('Error retrieving Blog Posts: ', result.errors);
      }
      const blogPostPage = path.resolve('./src/pages/blogPost.tsx');
      result.data.allContentfulBlogPost.edges.forEach(edge => {
        createPage({
          path: `/blogPost/${edge.node.slug}/`,
          component: blogPostPage,
          context: {
            slug: edge.node.slug
          }
        });
      });
    })
    .catch(error => {
      console.log('Error retrieving Blog Posts: ', error);
    });
};
