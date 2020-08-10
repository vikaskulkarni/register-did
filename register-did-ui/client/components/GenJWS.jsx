import React, { Fragment, Component } from "react";
import "./GenJWS.scss";

const copyToClipBoard = (jws) => {
  var tempInput = document.createElement("input");
  tempInput.value = jws.payload;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);

  console.log("copied");
};

class GenJWS extends Component {
  constructor(props) {
    super(props);
    !props.jwsValue && this.props.resetNextButton(false);
  }

  render() {
    return (
      <Fragment>
        <button
          className="btn btn-info"
          type="button"
          onClick={this.props.genJWS}
        >
          Generate JWT Web Signature
        </button>
        <div className="py-2">
          <div
            data-testid="copy-icon"
            className={this.props.jwsValue ? "copy-icon" : "copy-icon-disabled"}
            onClick={() => {
              copyToClipBoard(this.props.jwsValue);
              this.props.resetNextButton(true);
            }}
          >
            <i className="fa fa-copy">Copy Payload</i>
          </div>
          <textarea
            style={{ resize: "none" }}
            value={JSON.stringify(this.props.jwsValue, 0, 4)}
            rows={10}
            cols={94}
            readOnly
            wrap="hard"
          />
        </div>
      </Fragment>
    );
  }
}

export default GenJWS;
