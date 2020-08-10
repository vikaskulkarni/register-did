import React, { Fragment, Component } from "react";
import { getContextualURL } from "../utils/request";

class GenKeys extends Component {
  constructor(props) {
    super(props);
    !props.uri && this.props.resetNextButton(false);
  }

  render() {
    return (
      <Fragment>
        <button
          className="btn btn-info"
          type="button"
          onClick={this.props.genKey}
        >
          Generate Public and Private Keys
        </button>
        <div className="p-3">
          {this.props.uri && (
            <a href={getContextualURL("did-issuer/downloadPub")}>
              Download Public Key
            </a>
          )}
        </div>
      </Fragment>
    );
  }
}

export default GenKeys;
