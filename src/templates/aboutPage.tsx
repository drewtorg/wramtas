import React from 'react';
import { graphql } from 'gatsby';
import MainLayout from '../layouts';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Img from 'gatsby-image';

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
        {page.boardMembers.map((member: any) => {
          return (
            <div key={member.id} className="row">
              <div className="col">
                <p>
                  {member.name} - {member.title}
                </p>
                {member.email && <p>Contact: {member.email}</p>}
                <img srcSet={member.image.fixed.srcSet} />
              </div>
            </div>
          );
        })}
        <div className="row">
          <div className="col">
            <h3>University Representatives</h3>
          </div>
        </div>
        {page.universityReps.map((member: any) => {
          return (
            <div key={member.id} className="row">
              <div className="col">
                <p>
                  {member.name} - {member.title}
                </p>
                {member.email && <p>Contact: {member.email}</p>}
                <img srcSet={member.image.fixed.srcSet} />
              </div>
            </div>
          );
        })}
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
          fixed {
            srcSet
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
          fixed {
            srcSet
          }
        }
        name
        email
        title
      }
    }
  }
`;
