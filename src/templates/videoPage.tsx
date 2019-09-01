import React from 'react';
import { graphql, Link } from 'gatsby';
import MainLayout from '../layouts';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Img from 'gatsby-image';
import { richTextToComponents } from '../utils/render';
import IFrame from '../components/IFrame/IFrame';

const renderVideos = (videos: any): any => {
    return []
        .concat(videos)
        .sort((a: any, b: any) => (new Date(a.publishDate) < new Date(b.publishDate) ? 1 : -1))
        .map((video: any) => (
            <div key={video.id} className="row">
                <div className="col">
                    <Link to={'/' + video.slug + '/'} className="video-title">
                        {video.title}
                    </Link>
                    <div className="row justify-content-center">
                        <div className="col-xs-12 col-sm-8 col-md-6">
                            {/* Single, past video */}
                        </div>
                    </div>
                    <p>Published: {new Date(video.publishDate).toDateString()}</p>
                </div>
            </div>
        ));
};

const VideoPage = ({ data }: any) => {
    console.log(data.contentfulVideoPage);
    const page = data.contentfulVideoPage;
    const posts = page.videoPosts;
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
                                <IFrame iframe={posts[0].youtubeEmbedLink} />
                                {richTextToComponents(posts[0].body.json)}
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
        youtubeEmbedLink
      }
    }
  }
`;
