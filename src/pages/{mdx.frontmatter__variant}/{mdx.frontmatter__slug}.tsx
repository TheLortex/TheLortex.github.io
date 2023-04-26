/** @jsx jsx */
import { jsx } from "theme-ui";

import type { HeadFC, PageProps } from "gatsby";
import { Link, graphql } from "gatsby";
import { Layout } from "../../components/Layout";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import ReactMarkdown from "react-markdown";
import { tagsColor } from "../projects";

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
      <div sx={{ backgroundColor, padding: [1, 3], paddingX: [2, 4], borderRadius: 40 }}>
        {props.children}
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

export const Head: HeadFC = () => <title>Projects</title>;
