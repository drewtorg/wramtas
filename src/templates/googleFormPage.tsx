import React from 'react';
import { graphql } from 'gatsby';
import MainLayout from '../layouts';
import IFrame from '../components/IFrame/IFrame';


const GoogleFormPage = ({ data }: any) => {
  const page = data.contentfulGoogleFormPage;
  return (
    <MainLayout>
      <div className="google-form-page">
        <IFrame iframe={page.embedLink}/>
      </div>
    </MainLayout>
  );
};

export default GoogleFormPage;

export const pageQuery = graphql`
  query($slug: String!) {
    contentfulGoogleFormPage(slug: { eq: $slug }) {
      title
      embedLink
    }
  }
`;
