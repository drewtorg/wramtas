import React from 'react';
import { graphql, Link } from 'gatsby';
import MainLayout from '../layouts';
import truncate from '../utils/truncate';
import Img from 'gatsby-image';

const InternshipPage = ({ data }: any) => {
  const page = data.contentfulInternshipPage;
  console.log(page);
  return (
    <MainLayout>
      <div className="internshipPage">
        <h1>{page.title}</h1>
        {page.internshipSpotlights.map((spotlight: any) => {
          return (
            <div key={spotlight.id} className="row">
              <div className="col-xs-12 col-sm-8">
                <div className="row">
                  <div className="col">
                    <Link to={spotlight.slug} className="spotlight-title">
                      {spotlight.title}
                    </Link>
                  </div>
                </div>
                <div className="row">
                  <div className="col">{truncate(spotlight.body.content[0].content[0].value, 500, true)}</div>
                </div>
                <div className="row">
                  <div className="col">
                    <Link to={spotlight.slug}>Continue Reading</Link>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-4 col-md-3">
                <Img fixed={spotlight.heroImage.fixed} />
              </div>
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
        heroImage {
          fixed(width: 200) {
            ...GatsbyContentfulFixed
          }
        }
      }
    }
  }
`;
