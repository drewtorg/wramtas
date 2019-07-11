import React from 'react';
import { graphql, Link } from 'gatsby';
import MainLayout from '../layouts';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import truncate from '../utils/truncate';

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
              <Link to={spotlight.slug} className="spotlight-title">
                {spotlight.title}
              </Link>
              {truncate(spotlight.body.content[0].content[0].value, 50, true)}
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
          content {
            content {
              value
            }
          }
        }
      }
    }
  }
`;
