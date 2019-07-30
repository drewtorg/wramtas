import { graphql } from 'gatsby';
import * as React from 'react';
import MainLayout from '../layouts';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Img from 'gatsby-image';

const IndexPage: React.SFC = ({ data }: any) => {
  console.log(data);
  const page = data.allContentfulHomePage.edges[0].node;
  return (
    <MainLayout>
      {documentToReactComponents(page.content.json)}
      <Img fluid={page.heroImage.fluid} />
    </MainLayout>
  );
};

export default IndexPage;

export const homeQuery = graphql`
  query {
    allContentfulHomePage {
      edges {
        node {
          heroImage {
            fluid(quality: 100) {
              ...GatsbyContentfulFluid
            }
          }
          content {
            json
          }
        }
      }
    }
  }
`;
