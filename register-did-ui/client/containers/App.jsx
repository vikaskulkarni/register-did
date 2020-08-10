import React, { Fragment } from "react";
import "./styles.scss";
import Header from "../components/Header";
import { TopLevelCtr } from "./CombinedContainers";

const App = () => (
  <Fragment>
    <Header />
    <div className="d-flex justify-content-center">
      <div className="row">
        <div className="">
          <TopLevelCtr />
        </div>
      </div>
    </div>
  </Fragment>
);

export default App;
