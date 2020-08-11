import React, { Fragment, Component } from "react";
import "./VerifyJWS.scss";

const copyToClipBoard = (jws) => {
  var tempInput = document.createElement("input");
  tempInput.value = jws.payload;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);

  console.log("copied");
};

class VerifyJWS extends Component {
  constructor(props) {
    super(props);
    !props.jwsValue && props.resetNextButton(false);
  }

  render() {
    return (
      <Fragment>
        <div>
          <div className="input-group">
            <input
              style={{ width: "55%" }}
              type="text"
              value={this.props.did}
              onChange={({ target: { value } }) =>
                this.props.verifyJWSTextChange(value)
              }
            />
            <button
              style={{ display: "inline", marginLeft: "15px" }}
              className="btn btn-info"
              type="button"
              onClick={() => this.props.verifyJWS(this.props.did)}
            >
              Verify JWT Web Signature
            </button>
            {this.props.jwsValue && <div className="green-check"></div>}
            {!this.props.jwsValue && <div className="red-cross">X</div>}
          </div>
        </div>
        <div className="py-2">
          <div
            className={this.props.jwsValue ? "copy-icon" : "copy-icon-disabled"}
            onClick={() => copyToClipBoard(this.props.jwsValue)}
          >
            <i className="fa fa-copy">Copy Verified Signature</i>
          </div>
          {this.props.jwsValue && (
            <textarea
              style={{ resize: "none" }}
              value={JSON.stringify(this.props.jwsValue, 0, 4)}
              rows={10}
              cols={94}
              readOnly
              wrap="hard"
            />
          )}
          {!this.props.jwsValue && (
            <textarea
              style={{ resize: "none" }}
              value="Not Verified OR Invalid"
              rows={10}
              cols={94}
              readOnly
              wrap="hard"
            />
          )}
        </div>
      </Fragment>
    );
  }
}

export default VerifyJWS;
