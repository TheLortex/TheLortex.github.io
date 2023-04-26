/** @jsx jsx */
import { jsx } from "theme-ui";

import type { HeadFC, PageProps } from "gatsby";
import { Link, graphql } from "gatsby";
import { Layout } from "../components/Layout";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import ReactMarkdown from "react-markdown";

export const tagsColor = {
  forevr: "#B5A8FF",
  systems: "#FFB4B4",
  ocaml: "#FFDEB4",
  "machine learning": "#B5A8FF",
  hardware: "#FDF7C3",
  default: "#ccf",
};

const Projects = (props: PageProps<Queries.ProjectsQuery>) => {
  const groups = [...props.data.allFile.group];

  groups.sort((a, b) => {
    const aDate = new Date(a.nodes[0].childMdx?.frontmatter?.date ?? "");
    const bDate = new Date(b.nodes[0].childMdx?.frontmatter?.date ?? "");
    return bDate.getTime() - aDate.getTime();
  });

  return (
    <Layout page="projects" large>
      <div sx={{ display: "flex", flexWrap: "wrap" }}>
        {groups.flatMap((group) => (
          <div
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "stretch",
            }}
          >
            <h3
              sx={{
                width: "100%",
              }}
            >
              <span
                sx={{
                  backgroundColor: "white",
                  border: "solid #eee 1px",
                  borderRadius: "20px",
                  paddingY: 1,
                  paddingX: 3,
                }}
              >
                {group.fieldValue}
              </span>
            </h3>
            {group.nodes
              .filter((node) => node.childMdx?.frontmatter?.title)
              .map((node) => {
                const fm = node.childMdx?.frontmatter!;
                return (
                  <div
                    key={fm.title}
                    sx={{
                      padding: "1rem",
                      flex: 1,
                      margin: 2,
                      maxWidth: fm.hero_image ? "450px" : "300px",
                      minWidth: "200px",
                      borderRadius: 10,
                      backgroundColor:
                        tagsColor[(fm.tags ?? ["default"])[0]] ??
                        tagsColor.default,
                    }}
                  >
                    <div
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "stretch",
                        width: "100%",
                        gap: 3,
                      }}
                    >
                      {fm.hero_image && (
                        <div
                          sx={{
                            alignSelf: "center",
                            borderRadius: 8,
                            overflow: "hidden",
                            maxWidth: "50%",
                          }}
                        >
                          <GatsbyImage
                            image={getImage(fm.hero_image)}
                            alt={fm.hero_image_alt}
                          />
                        </div>
                      )}
                      <div sx={{ flex: 1 }}>
                        {fm.inline || !fm.slug ? (
                          <h2 sx={{ textAlign: "center", width: "100%" }}>
                            {fm.title}
                          </h2>
                        ) : (
                          <Link to={fm.slug}>
                            <h2 sx={{ textAlign: "center", width: "100%" }}>
                              {fm.title}
                            </h2>
                          </Link>
                        )}
                        <p>{fm.description}</p>
                        {fm.inline && (
                          <ReactMarkdown>
                            {node.childMdx?.body ?? ""}
                          </ReactMarkdown>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        ))}
      </div>
    </Layout>
  );
};

export const query = graphql`
  query Projects {
    allFile(filter: { sourceInstanceName: { eq: "projects" } }) {
      group(field: { childMdx: { frontmatter: { date: SELECT } } }) {
        fieldValue
        nodes {
          childMdx {
            frontmatter {
              title
              description
              date(formatString: "YYYY")
              tags
              inline
              slug
              hero_image_alt
              hero_image {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
            body
          }
        }
      }
    }
  }
`;

export default Projects;

export const Head: HeadFC = () => <title>Projects</title>;
