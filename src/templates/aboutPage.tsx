import React from 'react';
import { graphql } from 'gatsby';
import MainLayout from '../layouts';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const AboutPage = ({ data }: any) => {
  const page = data.contentfulAboutPage;
  return (
    <MainLayout>
      <div className="aboutPage">
        <h1>About WRAMTAS</h1>
        {documentToReactComponents(page.description.json)}
        <p>Contact us at: {page.mainEmail}</p>
        <h3>Executive Board Members</h3>
        <img srcSet={page.boardImage.fixed.srcSet} />
        {page.boardMembers.map((member: any) => {
          return (
            <>
              <p>
                {member.name} - {member.title}
              </p>
              <p>Contact: {member.email}</p>
              <img srcSet={member.image.fixed.srcSet} />
            </>
          );
        })}
        <h3>University Representatives</h3>
        {page.universityReps.map((member: any) => {
          return (
            <>
              <p>
                {member.name} - {member.title}
              </p>
              <p>Contact: {member.email}</p>
              <img srcSet={member.image.fixed.srcSet} />
            </>
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
        fixed {
          srcSet
        }
      }
      boardMembers {
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
