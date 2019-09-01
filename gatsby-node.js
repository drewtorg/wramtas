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
        allContentfulInternshipSpotlight {
          edges {
            node {
              slug
            }
          }
        }
        allContentfulGoogleFormPage {
          edges {
            node {
              slug
            }
          }
        }
        allContentfulVideoPage {
          edges {
            node {
              slug
            }
          }
        }
        allContentfulVideoPost {
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
        edge.node.slug = edge.node.slug.trim();
        createPage({
          path: `${edge.node.slug}`,
          component: blogPostPage,
          context: {
            $slug: edge.node.slug,
            slug: edge.node.slug
          }
        });
      });

      const aboutPage = path.resolve('./src/templates/aboutPage.tsx');
      result.data.allContentfulAboutPage.edges.forEach(edge => {
        edge.node.slug = edge.node.slug.trim();
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
        edge.node.slug = edge.node.slug.trim();
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
        edge.node.slug = edge.node.slug.trim();
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
        edge.node.slug = edge.node.slug.trim();
        createPage({
          path: `/${edge.node.slug}`,
          component: internshipPage,
          context: {
            $slug: edge.node.slug,
            slug: edge.node.slug
          }
        });
      });

      const internshipSpotlight = path.resolve('./src/templates/internshipSpotlight.tsx');
      result.data.allContentfulInternshipSpotlight.edges.forEach(edge => {
        edge.node.slug = edge.node.slug.trim();
        createPage({
          path: `${edge.node.slug}`,
          component: internshipSpotlight,
          context: {
            $slug: edge.node.slug,
            slug: edge.node.slug
          }
        });
      });

      const googleFormPage = path.resolve('./src/templates/googleFormPage.tsx');
      result.data.allContentfulGoogleFormPage.edges.forEach(edge => {
        edge.node.slug = edge.node.slug.trim();
        createPage({
          path: `${edge.node.slug}`,
          component: googleFormPage,
          context: {
            $slug: edge.node.slug,
            slug: edge.node.slug
          }
        });
      });

      const videoPage = path.resolve('./src/templates/videoPage.tsx');
      result.data.allContentfulVideoPage.edges.forEach(edge => {
        edge.node.slug = edge.node.slug.trim();
        createPage({
          path: `${edge.node.slug}`,
          component: videoPage,
          context: {
            $slug: edge.node.slug,
            slug: edge.node.slug
          }
        });
      });

      const videoPost = path.resolve('./src/templates/videoPost.tsx');
      result.data.allContentfulVideoPost.edges.forEach(edge => {
        edge.node.slug = edge.node.slug.trim();
        createPage({
          path: `${edge.node.slug}`,
          component: videoPost,
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
