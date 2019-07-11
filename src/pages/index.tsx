import { graphql, StaticQuery } from 'gatsby';
import * as React from 'react';
import MainLayout from '../layouts';

const IndexPage: React.SFC = (props: any) => {
  console.log(props);
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
        education, and community settings. WRAMTAS includes the states of Alaska, Arizona, California, Hawaii, Idaho,
        Nevada, Oregon, Utah, and Washington.
      </p>
      {/* TODO: Insert Hero Image here */}
    </MainLayout>
  );
};

export default IndexPage;
