import React from "react";
import "./404.scss";

import ContentWrapper from "../../components/contentWrapper/ContentWrapper";

const NoPages = () => {
  return (
    <div className="pageNotFound">
      <ContentWrapper>
        <span className="bigText">404</span>
        <span className="smallText">Page not found!</span>
      </ContentWrapper>
    </div>
  );
};

export default NoPages;
