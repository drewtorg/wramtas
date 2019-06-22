import React from 'react';
import { graphql } from 'gatsby';
import MainLayout from '../layouts';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';

const Text = ({ children }: any) => <p className="mb-0">{children}</p>;

const renderOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: any, children: any) => <Text>{children}</Text>
  }
};

const InternshipSpotlight = ({ data }: any) => {
  const page = data.contentfulInternshipSpotlight;
  console.log(page);
  return (
    <MainLayout>
      <div className="internshipSpotlight">
        <h1>{page.title}</h1>
        <div className="row">
          <div className="col-xs-12 col-md-9">{documentToReactComponents(page.body.json)}</div>
          <div className="col-xs-12 col-md-3">
            <h3>Important information</h3>

            <h4>Internship Director</h4>
            <div className="mb-4">{documentToReactComponents(page.directorContactInformation.json, renderOptions)}</div>

            <h4>Location</h4>
            <div className="mb-4">{documentToReactComponents(page.location.json, renderOptions)}</div>

            <h4>Population Served</h4>
            <div className="mb-4">{documentToReactComponents(page.populationServed.json, renderOptions)}</div>

            <h4>Expected Schedule and Application Due Dates</h4>
            <div className="mb-4">{documentToReactComponents(page.applicationSchedule.json, renderOptions)}</div>

            <h4>Stipend</h4>
            <div className="mb-4">{documentToReactComponents(page.stipend.json, renderOptions)}</div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default InternshipSpotlight;

export const pageQuery = graphql`
  query($slug: String!) {
    contentfulInternshipSpotlight(slug: { eq: $slug }) {
      title
      body {
        json
      }
      location {
        json
      }
      populationServed {
        json
      }
      directorContactInformation {
        json
      }
      applicationSchedule {
        json
      }
      stipend {
        json
      }
    }
  }
`;
