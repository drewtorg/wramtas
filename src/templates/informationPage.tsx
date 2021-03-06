import React from 'react';
import { graphql } from 'gatsby';
import MainLayout from '../layouts';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { richTextToComponents } from '../utils/render';

const InformationPage = ({ data }: any) => {
  const page = data.contentfulInformationPage;
  return (
    <MainLayout>
      <div className="informationPage">{richTextToComponents(page.content.json)}</div>
    </MainLayout>
  );
};

export default InformationPage;

export const pageQuery = graphql`
  query($slug: String!) {
    contentfulInformationPage(slug: { eq: $slug }) {
      content {
        json
      }
    }
  }
`;
