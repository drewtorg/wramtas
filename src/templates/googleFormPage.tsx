import React from 'react';
import { graphql } from 'gatsby';
import MainLayout from '../layouts';

class IFrame extends React.Component<{iframe: string}> {
  iframe() {
    return {
      __html: this.props.iframe
    }
  }

  render() {
    return (
      <div className="row justify-content-center">
        <div dangerouslySetInnerHTML={ this.iframe() } />
      </div>
    );
  }
};

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
