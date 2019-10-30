import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Element } from 'react-scroll';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import Particles from 'react-particles-js';
import { isMobile } from 'react-device-detect';
import { useSpring, animated } from 'react-spring';

interface Props {
  active: string;
}

const getLogos = graphql`
  query {
    logos: allFile(filter: { relativeDirectory: { eq: "logos" } }) {
      edges {
        node {
          name
          childImageSharp {
            fluid(maxWidth: 128) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;

export const Skills: React.FC<Props> = ({ active }) => {
  const {
    logos: { edges },
  } = useStaticQuery(getLogos);

  const logos = edges.map((edge: any) => {
    const { node } = edge;

    return {
      name: node.name,
      fluid: node.childImageSharp.fluid,
    };
  });

  const getImage = (name: string) => {
    return logos.find((logo: any) => logo.name === name).fluid;
  };

  const frontendSkills: Object[] = [
    {
      name: 'HTML5',
      logo: getImage('html5'),
    },
    {
      name: 'CSS3',
      logo: getImage('css3'),
    },
    {
      name: 'ES6+',
      logo: getImage('javascript'),
    },
    {
      name: 'TS',
      logo: getImage('typescript'),
    },
    {
      name: 'React',
      logo: getImage('reactjs'),
    },
    {
      name: 'Redux',
      logo: getImage('redux'),
    },
    {
      name: 'Gatsby',
      logo: getImage('gatsbyjs'),
    },
    {
      name: 'Apollo',
      logo: getImage('apollo'),
    },
    {
      name: 'D3',
      logo: getImage('d3'),
    },
  ];

  const backendSkills: Object[] = [
    {
      name: 'NodeJS',
      logo: getImage('nodejs'),
    },
    {
      name: 'RESTful',
      logo: getImage('rest'),
    },
    {
      name: 'GraphQL',
      logo: getImage('graphql'),
    },
    {
      name: 'MongoDB',
      logo: getImage('mongodb'),
    },
    {
      name: 'PostgreSQL',
      logo: getImage('postgreSQL'),
    },
    {
      name: 'Express',
      logo: getImage('express'),
    },
  ];

  const environment: Object[] = [
    {
      name: 'VSCode',
      logo: getImage('vscode'),
    },
    {
      name: 'Git',
      logo: getImage('git'),
    },
    {
      name: 'GitHub',
      logo: getImage('github'),
    },
    {
      name: 'NPM',
      logo: getImage('npm'),
    },
    {
      name: 'Postman',
      logo: getImage('postman'),
    },
    {
      name: 'Jest',
      logo: getImage('jest'),
    },
    {
      name: 'ChaiJS',
      logo: getImage('chai'),
    },
    {
      name: 'MochaJS',
      logo: getImage('mocha'),
    },
  ];

  const skillsArr: any[] = [
    ['Front-End', frontendSkills],
    ['Back-End', backendSkills],
    ['Environment', environment],
  ];

  const [toggle, setToggle] = useState<boolean>(false);

  const props = useSpring({
    opacity: toggle ? 1 : 0,
    paddingTop: toggle ? 0 : 250,
    delay: toggle ? 200 : 0,
  });

  active === 'skills' ? !toggle && setToggle(true) : toggle && setToggle(false);

  return (
    <Element name="skills">
      <Container id="skills" isMobile={isMobile}>
        <Particles
          className="particles"
          params={{
            particles: {
              number: {
                value: isMobile ? 15 : 45,
                density: {
                  enable: true,
                  value_area: isMobile ? 400 : 800,
                },
              },
              color: {
                value: '#fff',
              },
              size: {
                value: 2,
              },
            },
          }}
        />

        {/* <animated.div className="anim-container" style={props}> */}
        <h1 className="skills-title">TECHNOLOGY STACK</h1>
        <div className="main" id="anim-id">
          {skillsArr.map((skills, index) => (
            <Card
              key={`${skills[0]}`}
              className="actual-anim"
              delay={index * 40}
            >
              <div className="title-area">
                <h1>{skills[0]}</h1>
                <hr />
              </div>

              <div className="skills-area">
                {skills[1].map((skill: any) => (
                  <div key={skill.name}>
                    <div className="logo-container">
                      <Img fluid={skill.logo} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
        {/* </animated.div> */}
      </Container>
    </Element>
  );
};

const Container = styled.section<{ isMobile: boolean }>`
  position: relative;
  background: rgb(35, 35, 50);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;

  .particles {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }

  .skills-title {
    color: white;
    font-size: 8vw;
    text-shadow: 0 3px silver;
  }

  .main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: auto;

    .title-area {
      width: 100%;
      background: rgba(45, 45, 70, 1);
    }
  }

  @media only screen and (min-width: 768px) {
    .skills-title {
      text-shadow: 0 6.5px silver;
    }

    .main {
      flex-direction: row;
    }
  }
`;

const Card = styled.div<{ delay: number }>`
  max-width: 90%;
  height: 100%;

  background: rgba(255, 255, 255, 0.1);
  margin: 1vh 0;
  padding: 0.4rem;
  border: 2px pink dotted;
  border-radius: 4px;
  box-shadow: 0 7px 30px -10px inset rgba(150, 170, 180, 0.5);
  flex: 1;

  .title-area {
    margin-bottom: 6px;
    padding-bottom: 2px;

    h1 {
      color: silver;
      font-weight: 100;
      font-size: 2rem;
      text-align: center;
      text-shadow: 0 2px gainsboro;
    }
  }

  .skills-area {
    display: flex;
    flex-wrap: wrap;

    .logo-container {
      width: 14vw;
      height: 14vw;
      margin: 0.2rem;
      padding: 6px;
      background: white;
      border-radius: 6px;
      /* box-shadow: 0 7px 30px -10px rgba(150, 170, 180, 0.5); */
      /* box-shadow: 0 0 2px 2px rgba(150, 170, 180, 0.5); */
      border-bottom: 2px silver solid;
    }
  }

  @media only screen and (min-width: 768px) {
    width: 25vw;
    margin: 2vh 2vw;
    padding: 1rem;
    border-radius: 16px;
    align-items: center;

    .skills-area {
      .logo-container {
        width: 70px;
        height: 70px;
        margin: 0.5rem;
        padding: 12px;
        border-radius: 16px;
      }
    }
  }
`;
