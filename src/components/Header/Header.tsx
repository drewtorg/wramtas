import * as React from 'react';
import logo from './WRAMTAS-color.png';
import { StaticQuery, graphql, Link } from 'gatsby';
import { Location } from '@reach/router';

const Header: React.SFC = (props: any) => (
  <StaticQuery
    query={graphql`
      query HeaderQuery {
        allContentfulHeader {
          edges {
            node {
              headerLinks {
                id
                name
                pages {
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
                  ... on ContentfulVideoPage {
                    id
                    title
                    slug
                  }
                  ... on ContentfulGoogleFormPage {
                    id
                    title
                    slug
                  }
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
              <Link to="/" className="navbar-brand">
                <img src={logo} width="250" alt="" />
              </Link>
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
                  {data.allContentfulHeader.edges[0].node.headerLinks.map((link: any, index: number) => {
                    if (link.pages.length === 1) {
                      const page = link.pages[0];
                      let classes = 'nav-item';
                      if (location.pathname.includes(page.slug)) {
                        classes += ' active';
                      }
                      return (
                        <li className={classes} key={page.id}>
                          <Link className="nav-link" to={'/' + page.slug + '/'}>
                            {page.title}
                          </Link>
                        </li>
                      );
                    } else {
                      const id = "navbarDropdown-" + index;
                      const isActive = link.pages.some((page: any) => location.pathname.includes(page.slug));
                      let dropdownClasses = "nav-item dropdown";
                      if (isActive) {
                        dropdownClasses += ' active';
                      }
                      const li = (
                        <li className={dropdownClasses} key={link.id}>
                          <a className="nav-link dropdown-toggle" href="#" id={id} role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {link.name}
                          </a>
                          <div className="dropdown-menu" aria-labelledby={id}>
                            {link.pages.map((page: any) => {
                              return <Link className="dropdown-item" to={'/' + page.slug + '/'} key={page.id}>
                                {page.title}
                              </Link>
                            })}
                          </div>
                        </li>
                      )
                      return li;
                    }
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
