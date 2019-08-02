import React from 'react';
import { graphql } from 'gatsby';
import MainLayout from '../layouts';
import { BLOCKS } from '@contentful/rich-text-types';
import { richTextToComponents } from '../utils/render';

const Text = ({ children }: any) => <p className="mb-0">{children}</p>;

const renderOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: any, children: any) => <Text>{children}</Text>
  }
};

const InternshipSpotlight = ({ data }: any) => {
  const page = data.contentfulInternshipSpotlight;
  return (
    <MainLayout>
      <div className="internshipSpotlight">
        <h1>{page.title}</h1>
        <div className="row">
          <div className="col-xs-12 col-md-9">{richTextToComponents(page.body.json)}</div>
          <div className="col-xs-12 col-md-3">
            <h3>Important information</h3>

            {page.directorContactInformation && (
              <>
                <h4>Internship Director</h4>
                <div className="mb-4">
                  {richTextToComponents(page.directorContactInformation.json, renderOptions)}
                </div>
              </>
            )}
            {page.location && (
              <>
                <h4>Location</h4>
                <div className="mb-4">{richTextToComponents(page.location.json, renderOptions)}</div>
              </>
            )}
            {page.populationServed && (
              <>
                <h4>Population Served</h4>
                <div className="mb-4">{richTextToComponents(page.populationServed.json, renderOptions)}</div>
              </>
            )}
            {page.applicationSchedule && (
              <>
                <h4>Expected Schedule and Application Due Dates</h4>
                <div className="mb-4">{richTextToComponents(page.applicationSchedule.json, renderOptions)}</div>
              </>
            )}
            {page.stipend && (
              <>
                <h4>Stipend</h4>
                <div className="mb-4">{richTextToComponents(page.stipend.json, renderOptions)}</div>
              </>
            )}
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
