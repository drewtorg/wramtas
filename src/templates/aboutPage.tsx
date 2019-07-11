import React from 'react';
import { graphql } from 'gatsby';
import MainLayout from '../layouts';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Img from 'gatsby-image';

const renderPerson = (member: any) => {
  return (
    <div key={member.id} className="row">
      <div className="col">
        <div className="row">
          <div className="col">
            <h4>
              {member.name}: {member.title}
            </h4>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-xs-12 col-sm-6">
            <Img fluid={member.image.fluid} />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <p>{member.shortBio.shortBio}</p>
            {member.email && <p>Contact: {member.email}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

const AboutPage = ({ data }: any) => {
  const page = data.contentfulAboutPage;
  return (
    <MainLayout>
      <div className="aboutPage">
        <div className="row">
          <div className="col">
            <h1>About WRAMTAS</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            {documentToReactComponents(page.description.json)}
            <p>Contact us at: {page.mainEmail}</p>
            <Img fluid={page.boardImage.fluid} />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h3>Executive Board Members</h3>
          </div>
        </div>
        {page.boardMembers.map(renderPerson)}
        <div className="row">
          <div className="col">
            <h3>University Representatives</h3>
          </div>
        </div>
        {page.universityReps.map(renderPerson)}
      </div>
    </MainLayout>
  );
};

export default AboutPage;

export const pageQuery = graphql`
  query($slug: String!) {
    contentfulAboutPage(slug: { eq: $slug }) {
      mainEmail
      description {
        json
      }
      boardImage {
        fluid {
          ...GatsbyContentfulFluid
        }
      }
      boardMembers {
        id
        shortBio {
          shortBio
        }
        image {
          fluid {
            ...GatsbyContentfulFluid
          }
        }
        name
        email
        title
      }
      universityReps {
        id
        shortBio {
          shortBio
        }

        image {
          fluid {
            ...GatsbyContentfulFluid
          }
        }
        name
        email
        title
      }
    }
  }
`;
