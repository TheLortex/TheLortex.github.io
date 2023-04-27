/** @jsx jsx */
import { jsx } from "theme-ui";

import * as React from "react";
import { Link, type HeadFC, type PageProps } from "gatsby";
import { Avatar } from "../images/Avatar";

import "../styles/global.css";

const CustomLi = (props: {
  children: React.ReactNode;
  selected?: boolean;
  article?: string;
  last?: boolean;
}) => {
  return (
    <li sx={{ display: "flex", flexDirection: "column" }}>
      <div
        sx={{
          paddingTop: 5,
        }}
      >
        <div
          sx={{
            transform: "rotate(-30deg)",
            width: ["50px", "100px"],
            transformOrigin: "top left",
            padding: 1,
            fontSize: 4,
          }}
        >
          {props.children}
        </div>
      </div>
      <div
        sx={{
          alignSelf: "stretch",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          position: "relative",
        }}
      >
        {props.selected ? (
          <div
            sx={{
              backgroundColor: "white",
              border: "4px black solid",
              borderRadius: "100%",
              width: "24px",
              height: "24px",
              position: "absolute",
              zIndex: 1000,
              top: "-6px",
              left: "-6px",
            }}
          ></div>
        ) : (
          <div
            sx={{
              backgroundColor: "primary",
              borderRadius: "100%",
              width: "24px",
              height: "24px",
              position: "absolute",
              top: "-6px",
              left: "-6px",
            }}
          ></div>
        )}
        <div
          sx={{
            backgroundColor: props.last ? undefined : "primary",
            flex: 1,
            height: "12px",
          }}
        ></div>
      </div>
      {props.article && props.selected && (
        <div
          sx={{ display: "flex", flexDirection: "row", alignItems: "stretch" }}
        >
          <div
            sx={{
              backgroundColor: "#FC4F00",
              marginLeft: "4px",
              marginTop: "-4px",
              height: "40px",
              width: "40px",
              clipPath:
                "polygon(0% 0%, 8px 0%, 100% 32px, 100% 100%, 32px 100%, 0% 8px)",
            }}
          ></div>
          <div sx={{ position: "relative" }}>
            <div
              sx={{
                position: "absolute",
                width: "1000px",
                bottom: "6px",
                left: "-4px",
              }}
            >
              <div
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 3,
                  height: 0
                }}
              >
                <div
                  sx={{
                    width: "40px",
                    borderBottom: "solid 12px #FC4F00",
                    boxSizing: "border-box",
                    borderBottomRightRadius: "100px",
                    borderTopRightRadius: "100px",
                    position: "relative",
                  }}
                >
                  <div
                    sx={{
                      backgroundColor: "#FC4F00",
                      borderRadius: "100%",
                      width: "24px",
                      height: "24px",
                      position: "absolute",
                      top: "-6px",
                      right: "-6px",
                    }}
                  ></div>
                </div>
                <h2
                  sx={{
                    margin: 0,
                    textDecoration: "underline",
                    color: "secondary",
                  }}
                >
                  {props.article}
                </h2>
              </div>
            </div>
          </div>
        </div>
      )}
    </li>
  );
};

type page = "index" | "projects" | "articles" | "photography";

const pages = [
  { name: "home", page: "index", link: "/" },
  { name: "projects", page: "projects", link: "/projects" },
  { name: "articles", page: "articles", link: "/articles" },
  { name: "photography", page: "photography", link: "/photography" },
];

export const Layout = (props: {
  children?: React.ReactNode;
  page: page;
  article?: string;
  large?: boolean;
}) => {
  return (
    <main
      sx={{
        paddingX: [3, 4],
        paddingY: 2,
        paddingBottom: 4,
        a: {
          color: "secondary",
        },
      }}
    >
      <nav
        sx={{
          maxWidth: "80ch",
          margin: "auto",
        }}
      >
        <ul sx={{ display: "flex", flexDirection: "row", padding: 0 }}>
          {pages.map((page, i) => (
            <CustomLi
              selected={props.page == page.page}
              key={page.page}
              last={i == pages.length - 1}
              article={props.article}
            >
              <Link
                title={page.name}
                sx={
                  props.page == page.page && !props.article
                    ? {
                        color: "secondary",
                        fontWeight: "bold",
                      }
                    : {
                        textDecoration: "none",
                        ":hover": {
                          textDecoration: "underline",
                        },
                        color: "secondary",
                        "::after": {
                          display: "block",
                          content: "attr(title)",
                          fontWeight: "bold",
                          height: "0px",
                          overflow: "hidden",
                          visibility: "hidden",
                        },
                      }
                }
                to={page.link}
              >
                {page.name}
              </Link>
            </CustomLi>
          ))}
        </ul>
      </nav>
      <div
        sx={{
          maxWidth: props.large ? "120ch" : "100ch",
          margin: "auto",
          paddingTop: 3,
        }}
      >
        {props.children}
      </div>
    </main>
  );
};
