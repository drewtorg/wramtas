import React from 'react';
import { graphql, Link } from 'gatsby';
import MainLayout from '../layouts';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Img from 'gatsby-image';
import { richTextToComponents } from '../utils/render';
import IFrame from '../components/IFrame/IFrame';

const renderVideoTile = (post: any): any => {
    return (
        <div className="col-xs-12 col-sm-4 col-md-3" key={post.id}>
            <Link to={'/' + post.slug + '/'} className="tile-title">
                {post.title}
                <Img fluid={post.thumbnail.fluid} />
            </Link>
        </div>
    );
};

const VideoPage = ({ data }: any) => {
    const page = data.contentfulVideoPage;
    const posts: any = []
        .concat(page.videoPosts)
        .sort((a: any, b: any) => (new Date(a.publishDate) < new Date(b.publishDate) ? 1 : -1));
    return (
        <MainLayout>
            <div className="videopage">
                <h1>{page.title}</h1>
                {richTextToComponents(page.body.json)}

                {posts !== null &&
                    <>
                        {posts.length >= 1 &&
                            <>
                                <Link to={'/' + posts[0].slug + '/'} className="video-title">
                                    {posts[0].title}
                                </Link>
                                <IFrame iframe={posts[0].embedLink} />
                                {richTextToComponents(posts[0].body.json)}
                                <p>Published: {new Date(posts[0].publishDate).toDateString()}</p>

                                {posts.length > 1 &&
                                    <><h2>Past Masterclasses</h2>
                                        <div className="row">
                                            {posts.filter((_: any, index: number) => index !== 0).map((post: any) => {
                                                return renderVideoTile(post);
                                            })}
                                        </div>
                                    </>
                                }
                            </>}
                    </>}
            </div>
        </MainLayout>
    );
};
export default VideoPage;
export const pageQuery = graphql`
  query($slug: String!) {
    contentfulVideoPage(slug: { eq: $slug }) {
      title
      body {
        json
      }
      videoPosts {
        id
        title
        body {
          json
        }
        slug
        publishDate
        embedLink
        thumbnail {
            fluid {
                ...GatsbyContentfulFluid
            }
        }
      }
    }
  }
`;
