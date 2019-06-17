import { graphql } from 'gatsby';
import * as React from 'react';
import Layout from '../layouts';

// Please note that you can use https://github.com/dotansimha/graphql-code-generator
// to generate all types from graphQL schema
interface IndexPageProps {
  data: {
    site: {
      siteMetadata: {
        siteName: string;
      };
    };
  };
}

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        siteName
      }
    }
  }
`;

export default class IndexPage extends React.Component<IndexPageProps, {}> {
  readonly hello = `Hello`;
  public render() {
    const { siteName } = this.props.data.site.siteMetadata;
    return (
      <Layout>
        <h1>Welcome to WRAMTAS</h1>
        <h3>The Western Region chapter of the American Music Therapy Association for Students</h3>
        <p>
          We promote the advancement of the purpose and objectives of AMTA within the framework of the students and
          interns of the western region.
        </p>
        <p>
          AMTA strives toward the progressive development of the therapeutic use of music in rehabilitation, special
          education, and community settings. WRAMTAS includes the states of Alaska, Arizona, California, Hawaii, Idaho,
          Nevada, Oregon, Utah, and Washington.
        </p>
      </Layout>
    );
  }
}
