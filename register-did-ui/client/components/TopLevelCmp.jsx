import React, { Fragment, Component } from "react";
import MultiStep from "react-stepzilla";
import "./TopLevelCmp.scss";

class TopLevelCmp extends Component {
  render() {
    return (
      <div className="">
        <div className="step-progress" style={{ minHeight: "200px" }}>
          <MultiStep
            steps={this.props.steps}
            stepsNavigation={false}
            nextButtonCls="btn btn-outline-info btn-arrow-right pull-right"
            backButtonCls="btn btn-outline-info btn-arrow-left pull-left"
            showNavigation={this.props.showNextButton}
            nextTextOnFinalActionStep="Done"
          />
        </div>
      </div>
    );
  }
}

export default TopLevelCmp;
