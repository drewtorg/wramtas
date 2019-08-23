import React from 'react';
import { graphql, Link } from 'gatsby';
import MainLayout from '../layouts';
import truncate from '../utils/truncate';
import Img from 'gatsby-image';

const getSnippet = (content: any): string => {
  let str = '';
  content.forEach((subContent: any) => {
    if (subContent.content) {
      subContent.content.forEach(({ value }: any) => {
        if (value) {
          str += value;
        }
      });
    }
  });

  return truncate(str, 500, true);
};

const InternshipPage = ({ data }: any) => {
  const page = data.contentfulInternshipPage;
  return (
    <MainLayout>
      <div className="internshipPage">
        <h1>{page.title}</h1>
        {[]
          .concat(page.internshipSpotlights)
          .sort((a: any, b: any) => (new Date(a.publishDate) < new Date(b.publishDate) ? 1 : -1))
          .map((spotlight: any) => {
            return (
              <div key={spotlight.id} className="row">
                <div className="col">
                  <div className="row  align-items-center">
                    <div className="col-xs-12 col-sm-8">
                      <Link to={'/' + spotlight.slug} className="spotlight-title">
                        {spotlight.title}
                      </Link>
                    </div>
                    <div className="col-xs-12 col-sm-4">
                      <p className="mb-0">{new Date(spotlight.publishDate).toDateString()}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-12 col-sm-8">
                      <p>{getSnippet(spotlight.body.content)}</p>
                      <p>
                        <Link to={'/' + spotlight.slug}>Continue Reading</Link>
                      </p>
                    </div>
                    <div className="col-xs-12">
                      <div className="d-none d-sm-block col-sm-4 col-md-3">
                        {spotlight.heroImage && <Img fixed={spotlight.heroImage.fixed} />}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col" />
                  </div>
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
        publishDate
      }
    }
  }
`;
