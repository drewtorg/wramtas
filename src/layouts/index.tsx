import * as React from "react";

import { rhythm } from "../utils/typography";
import "../scss/main.scss";

const MainLayout: React.SFC = ({ children }) => (
  // TODO: Insert Header
  <div
    style={{
      margin: `0 auto`,
      marginBottom: rhythm(1.5),
      marginTop: rhythm(1.5),
      maxWidth: 650,
      paddingLeft: rhythm(3 / 4),
      paddingRight: rhythm(3 / 4)
    }}
  >
    {children}
  </div>
  //   TODO: Insert Footer
);

export default MainLayout;
