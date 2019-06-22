import React from 'react';
import { graphql, Link } from 'gatsby';
import MainLayout from '../layouts';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const InternshipPage = ({ data }: any) => {
  const page = data.contentfulInternshipPage;
  console.log(page);
  return (
    <MainLayout>
      <div className="internshipPage">
        <h1>{page.title}</h1>
        {page.internshipSpotlights.map((spotlight: any) => {
          return (
            <div key={spotlight.id}>
              <h2>{spotlight.title}</h2>
              <Link to={spotlight.slug}>See More</Link>
              {documentToReactComponents(spotlight.body.json)}
            </div>
          );
        })}
      </div>
    </MainLayout>
  );
};

export default InternshipPage;

export const pageQuery = graphql`
  query($slug: String!) {
    contentfulInternshipPage(slug: { eq: $slug }) {
      title
      internshipSpotlights {
        id
        title
        slug
        body {
          json
        }
      }
    }
  }
`;
