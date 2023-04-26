/** @jsx jsx */
import { jsx } from "theme-ui";

import * as React from "react";
import { Link, type HeadFC, type PageProps } from "gatsby";
import { Avatar } from "../images/Avatar";
import { Layout } from "../components/Layout";

import Piticha from "../images/piticha.jpg";
import Furets from "../images/furets.jpg";

const IndexPage: React.FC<PageProps> = (props: PageProps) => {
  return (
    <Layout page="index">
      <div
        sx={{
          maxWidth: "80ch",
          margin: "auto",
        }}
      >
        <h1>
          hello there, I'm{" "}
          <span sx={{ color: "primary", textDecoration: "underline" }}>
            Lucas Pluvinage
          </span>
          , a full-stack developer from planet earth.
        </h1>
      </div>
      <div
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 4,
          paddingTop: [0, 3],
        }}
      >
        <div
          sx={{
            width: "20ch",
            height: "20ch",
            borderRadius: 25,
            overflow: "hidden",
            display: ["none", "block"],
          }}
        >
          <Avatar />
        </div>
        <div sx={{ flex: 1 }}>
          <p>
            Freshly out of the{" "}
            <a id="link-ens" href="https://diplome.di.ens.fr">
              École Normale Supérieure of Paris
            </a>
            . Graduating from PSL's{" "}
            <a
              id="link-iasd"
              href="https://www.lamsade.dauphine.fr/wp/iasd/en/"
              title="AI Systems and Data Science"
            >
              IASD
            </a>{" "}
            Master programme, I'm now working with the{" "}
            <a id="link-tarides" href="https://tarides.com">
              Tarides
            </a>{" "}
            software company on open-source projects using the{" "}
            <a href="https://ocaml.org">OCaml</a> programming language.
          </p>
          <p>
            My interests range from artificial intelligence to low-level
            compiler hacking. Coming from a research education environment along
            with a long history of self-learning, I like to tackle real-world
            challenge with a practical mindset.
          </p>
          <p>
            Other interests include{" "}
            <a id="link-cat" href={Piticha}>
              cats
            </a>
            ,{" "}
            <a id="link-furets" href={Furets}>
              ferrets
            </a>
            , and <Link to="/photography">photography</Link>.
          </p>
        </div>
      </div>
      <div
        sx={{
          maxWidth: "80ch",
          margin: "auto",
          paddingTop: [0, 3],
        }}
      >
        <h1>here are some projects I'm working on</h1>
      </div>
      <div
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 3,
          paddingTop: 1,
        }}
      >
        <div
          sx={{
            flex: 1,
            minWidth: "20ch",
            backgroundColor: "#B5A8FF",
            padding: 3,
            paddingY: 3,
            borderRadius: 8,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <h2 sx={{ margin: 0, textAlign: "center" }}> Forevr </h2>
          <p sx={{ marginY: "auto" }}>
            A collaborative social journal, providing a safe space to keep track
            of your memories.
          </p>
        </div>
        <div
          sx={{
            flex: 1,
            minWidth: "15ch",
            backgroundColor: "#FFB4B4",
            padding: 3,
            paddingY: 3,
            borderRadius: 8,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <h2 sx={{ margin: 0, textAlign: "center" }}> Meio </h2>
          <p sx={{ marginY: "auto" }}>
            <em>Monitor Eio programs</em>: a tool to help developers understand
            what the hell is going on in their async programs.
          </p>
        </div>
        <div
          sx={{
            flex: 1,
            minWidth: "15ch",
            backgroundColor: "#FFDEB4",
            padding: 3,
            paddingY: 3,
            borderRadius: 8,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <h2 sx={{ margin: 0, textAlign: "center" }}>MirageOS</h2>
          <p sx={{ marginY: "auto" }}>
            A library operating system written in OCaml, allowing to build
            unikernels, tiny and efficient virtual machines.
          </p>
        </div>
        <div
          sx={{
            flex: 1,
            minWidth: "15ch",
            backgroundColor: "#FDF7C3",
            padding: 3,
            paddingY: 3,
            borderRadius: 8,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <h2 sx={{ margin: 0, textAlign: "center" }}>Pixel stick</h2>
          <p sx={{ marginY: "auto" }}>
            Basically an LED strip on a stick, allowing to draw images in the
            air with a long exposure camera.
          </p>
        </div>
      </div>
      <div
        sx={{
          maxWidth: "80ch",
          margin: "auto",
          paddingTop: 3,
        }}
      >
        <h1>you can follow or contact me on various platforms</h1>
      </div>
      <div
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Pill href="https://github.com/TheLortex" id="Github">
          TheLortex
        </Pill>
        <Pill href="https://linkedin.com/in/✨✨✨" id="LinkedIn">
          ✨✨✨
        </Pill>
        <Pill href="https://twitter.com/TheLortex" id="Twitter">
          TheLortex
        </Pill>
        <Pill href="https://instagram.com/elpluvina" id="Instagram">
          elpluvina
        </Pill>
        <Pill href="mailto:lucas@pluvina.ge" id="Email">
          <span>lucas</span>
          <span>@</span>
          <span>pluvina.ge</span>
        </Pill>
      </div>
    </Layout>
  );
};

const Pill = (props: {
  id: string;
  href: string;
  children: React.ReactNode;
}) => (
  <a
    sx={{
      display: "flex",
      flexDirection: "row",
      backgroundColor: "primary",
      a: {
        color: "#000",
      },
      padding: 1,
      paddingX: 3,
      borderRadius: 16,
      margin: 1,
      fontSize: 1,
      gap: 1,
      fontWeight: "bold",
      textDecoration: "none",
      "&:hover": {
        backgroundColor: "secondary",
        color: "primary",
        cursor: "pointer",
      },
    }}
    href={props.href}
  >
    <div
      sx={{
        textTransform: "uppercase",
        letterSpacing: "0.1em",
      }}
    >
      {props.id}
    </div>
    <div sx={{ borderLeft: "solid #fff8 1px" }}></div>
    {props.children}
  </a>
);

export default IndexPage;

export const Head: HeadFC = () => <title>Lucas Pluvinage</title>;
