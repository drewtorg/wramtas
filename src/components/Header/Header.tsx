import * as React from 'react';
import logo from './WRAMTAS-color.png';
import { StaticQuery, graphql } from 'gatsby';
import { Location } from '@reach/router';

const Header: React.SFC = (props: any) => (
  <StaticQuery
    query={graphql`
      query HeaderQuery {
        allContentfulHeader {
          edges {
            node {
              links {
                ... on ContentfulAboutPage {
                  id
                  title
                  slug
                }
                ... on ContentfulBlogPage {
                  id
                  title
                  slug
                }
                ... on ContentfulInformationPage {
                  id
                  title
                  slug
                }
                ... on ContentfulInternshipPage {
                  id
                  title
                  slug
                }
              }
            }
          }
        }
      }
    `}
    render={data => (
      <Location>
        {({ location }) => {
          return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <a className="navbar-brand" href="/">
                <img src={logo} width="250" alt="" />
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <ul className="navbar-nav ml-auto">
                  {data.allContentfulHeader.edges[0].node.links.map((link: any) => {
                    let classes = 'nav-item';
                    if (location.pathname.includes(link.slug)) {
                      classes += ' active';
                    }
                    return (
                      <li className={classes} key={link.id}>
                        <a className="nav-link" href={'/' + link.slug}>
                          {link.title}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </nav>
          );
        }}
      </Location>
    )}
  />
);

export default Header;
