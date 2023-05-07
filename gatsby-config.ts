import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Lucas Pluvinage`,
    description: "Lucas' personal website",
    siteUrl: `https://www.lortex.org`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    {
      resolve: "gatsby-plugin-theme-ui",
      options: {
        preset: "@theme-ui/preset-funk",
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/favicon-512x512.png",
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
            },
          },
          {
            resolve: `gatsby-remark-katex`,
            options: {
              // Add any KaTeX options from https://github.com/KaTeX/KaTeX/blob/master/docs/options.md here
              strict: `ignore`,
            },
          },
          {
            resolve: `remark-slug`,
          },
        ],
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "projects",
        path: "./src/data/projects/",
      },
      __key: "projects",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "articles",
        path: "./src/data/articles/",
      },
      __key: "articles",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pics",
        path: "./src/data/galleries/pics/",
      },
      __key: "pics",
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-plugin-feed",
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            title: "Lucas Pluvinage",
            output: "/rss.xml",
            query: `
              {
                allMdx(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      frontmatter {
                        slug
                        variant
                        description
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            serialize: ({ query: { site, allMdx } }) => {
              console.log(site);
              console.log(allMdx.toString());
              return allMdx.edges
                .filter(({ node }) => node.frontmatter.variant == "articles")
                .map(({ node }) => {
                  return {
                    title: node.frontmatter.title,
                    description: node.frontmatter.description,
                    date: node.frontmatter.date,
                    url: site.siteMetadata.siteUrl + "/articles/"  + node.frontmatter.slug,
                    guid: site.siteMetadata.siteUrl + "/articles/" + node.frontmatter.slug,
                  };
                });
            },
          },
        ],
      },
    },
  ],
};

export default config;
