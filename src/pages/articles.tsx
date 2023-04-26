/** @jsx jsx */
import { jsx } from "theme-ui";

import * as React from "react";
import { graphql, Link, type HeadFC, type PageProps } from "gatsby";
import { Layout } from "../components/Layout";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import ReactMarkdown from "react-markdown";
import { tagsColor } from "./projects";

const IndexPage = (props: PageProps<Queries.ArticlesQuery>) => {
  return (
    <Layout page="articles">
      {" "}
      <div sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {props.data.allFile.group.flatMap((group) => (
          <div sx={{ display: "flex", flexDirection: "column" }}>
            <h1>{group.fieldValue}</h1>
            {group.nodes
              .filter((node) => node.childMdx?.frontmatter?.title)
              .map((node, i) => {
                const fm = node.childMdx?.frontmatter!;
                return (
                  <div
                    key={fm.title}
                    sx={{
                      margin: 2,
                      maxWidth: 450 + (i % 3) * 20 - (i % 2) * 10,
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
                      <div>
                        <div
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 3,
                          }}
                        >
                          <p
                            sx={{
                              backgroundColor: "white",
                              borderTopRightRadius: "16px",
                              borderBottomRightRadius: "16px",
                              padding: 1,
                              paddingX: 2,
                            }}
                          >
                            {fm.date}
                          </p>
                          {fm.inline || !fm.slug ? (
                            <h2 sx={{ textAlign: "left" }}>{fm.title}</h2>
                          ) : (
                            <Link to={fm.slug}>
                              <h2 sx={{ textAlign: "left" }}>{fm.title}</h2>
                            </Link>
                          )}
                        </div>
                        <div sx={{ padding: 3, paddingTop: 0 }}>
                          <p>{fm.description}</p>
                          {fm.inline && (
                            <ReactMarkdown>
                              {node.childMdx?.body ?? ""}
                            </ReactMarkdown>
                          )}
                        </div>
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
  query Articles {
    allFile(
      filter: { sourceInstanceName: { eq: "articles" } }
      sort: { childMdx: { frontmatter: { date: DESC } } }
    ) {
      group(field: { childMdx: { frontmatter: { category: SELECT } } }) {
        fieldValue

        nodes {
          childMdx {
            frontmatter {
              title
              description
              date(formatString: "DD/MM/YYYY")
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

export default IndexPage;

export const Head: HeadFC = () => <title>Articles</title>;
