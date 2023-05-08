/** @jsx jsx */
import { jsx } from "theme-ui";

import type { HeadFC, HeadProps, PageProps } from "gatsby";
import { Link, graphql } from "gatsby";
import { Layout } from "../../components/Layout";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import ReactMarkdown from "react-markdown";
import { tagsColor } from "../projects";
import { SiteHead } from "../../components/Head";

const Projects = (props: PageProps<Queries.ProjectQuery>) => {
  const tags = props.data.mdx?.frontmatter?.tags;
  const backgroundColor =
    tags?.length ?? 0 > 0
      ? tagsColor[tags[0]] ?? tagsColor.default
      : tagsColor.default;
  return (
    <Layout
      page={props.data.mdx?.frontmatter?.variant!}
      article={props.data.mdx?.frontmatter?.title}
    >
      <div sx={{ padding: [0, 1, 3] }}>
        <div
          sx={{
            fontStyle: "italic",
            fontSize: 1,
            padding: [1, 0, 0]
          }}
        >
          {props.data.mdx?.frontmatter?.date}
        </div>
        <div
          sx={{
            borderLeft: "solid " + backgroundColor + " 8px",
            paddingX: [2, 4],
          }}
        >
          {props.children}
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query Project($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        description
        date
        tags
        inline
        slug
        hero_image_alt
        variant
        hero_image {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      body
    }
  }
`;

export default Projects;

export const Head = (props: HeadProps<Queries.ProjectQuery>) => (
  <SiteHead title={props.data.mdx?.frontmatter?.title ?? undefined} />
);
