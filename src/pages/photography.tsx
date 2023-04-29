/** @jsx jsx */
import { jsx } from "theme-ui";

import * as React from "react";
import { graphql, type HeadFC, type PageProps } from "gatsby";
import { Layout } from "../components/Layout";
import PhotoAlbum from "react-photo-album";
import { GatsbyImage } from "gatsby-plugin-image";
import { SiteHead } from "../components/Head";

const IndexPage = (props: PageProps<Queries.PhotosQuery>) => {
  return (
    <Layout page="photography" large>
      <h1>i like taking pictures</h1>
      <PhotoAlbum
        layout="rows"
        photos={props.data.allFile.nodes.map((p) => ({
          width: p.childImageSharp?.gatsbyImageData?.width ?? 0,
          height: p.childImageSharp?.gatsbyImageData?.height ?? 0,
          src: p.childImageSharp?.gatsbyImageData?.images?.fallback?.src ?? "",
          gatsby: p.childImageSharp?.gatsbyImageData,
        }))}
        renderImage={(photo) => (
          <GatsbyImage
            image={photo.gatsby}
            alt="photo"
            sx={{ width: "100%", height: "100%" }}
          />
        )}
      />
    </Layout>
  );
};

export const query = graphql`
  query Photos {
    allFile(filter: { sourceInstanceName: { eq: "pics" } }) {
      nodes {
        childImageSharp {
          gatsbyImageData(width: 1000)
        }
      }
    }
  }
`;

export default IndexPage;

export const Head: HeadFC = () => <SiteHead title="Photography" />;
