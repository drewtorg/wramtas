import { graphql, StaticQuery } from 'gatsby';
import * as React from 'react';
import MainLayout from '../layouts';

const IndexPage: React.SFC = () => {
  return (
    <StaticQuery
      query={graphql`
        query IndexQuery {
          site {
            siteMetadata {
              siteName
            }
          }
        }
      `}
      render={data => {
        const { siteName } = data.site.siteMetadata;
        return (
          <MainLayout>
            <h1>Welcome to WRAMTAS</h1>
            <h3>The Western Region chapter of the American Music Therapy Association for Students</h3>
            <p>
              We promote the advancement of the purpose and objectives of AMTA within the framework of the students and
              interns of the western region.
            </p>
            <p>
              AMTA strives toward the progressive development of the therapeutic use of music in rehabilitation, special
              education, and community settings. WRAMTAS includes the states of Alaska, Arizona, California, Hawaii,
              Idaho, Nevada, Oregon, Utah, and Washington.
            </p>
          </MainLayout>
        );
      }}
    />
  );
};

export default IndexPage;
