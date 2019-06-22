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
        allContentfulAboutPage {
          edges {
            node {
              slug
            }
          }
        }
        allContentfulBlogPage {
          edges {
            node {
              slug
            }
          }
        }
        allContentfulInformationPage {
          edges {
            node {
              slug
            }
          }
        }
        allContentfulInternshipPage {
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
        console.log('Error retrieving Contentful data: ', result.errors);
      }
      const blogPostPage = path.resolve('./src/templates/blogPost.tsx');
      result.data.allContentfulBlogPost.edges.forEach(edge => {
        createPage({
          path: `/blogPost/${edge.node.slug}`,
          component: blogPostPage,
          context: {
            $slug: edge.node.slug,
            slug: edge.node.slug
          }
        });
      });

      const aboutPage = path.resolve('./src/templates/aboutPage.tsx');
      result.data.allContentfulAboutPage.edges.forEach(edge => {
        createPage({
          path: `/${edge.node.slug}`,
          component: aboutPage,
          context: {
            $slug: edge.node.slug,
            slug: edge.node.slug
          }
        });
      });

      const blogPage = path.resolve('./src/templates/blogPage.tsx');
      result.data.allContentfulBlogPage.edges.forEach(edge => {
        createPage({
          path: `/${edge.node.slug}`,
          component: blogPage,
          context: {
            $slug: edge.node.slug,
            slug: edge.node.slug
          }
        });
      });

      const informationPage = path.resolve('./src/templates/informationPage.tsx');
      result.data.allContentfulInformationPage.edges.forEach(edge => {
        createPage({
          path: `/${edge.node.slug}`,
          component: informationPage,
          context: {
            $slug: edge.node.slug,
            slug: edge.node.slug
          }
        });
      });

      const internshipPage = path.resolve('./src/templates/internshipPage.tsx');
      result.data.allContentfulInternshipPage.edges.forEach(edge => {
        createPage({
          path: `/${edge.node.slug}`,
          component: internshipPage,
          context: {
            $slug: edge.node.slug,
            slug: edge.node.slug
          }
        });
      });
    })
    .catch(error => {
      console.log('Error retrieving Contentful data: ', error);
    });
};
