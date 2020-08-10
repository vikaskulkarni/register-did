import React, { Fragment, Component } from "react";
import "./IssueVerifiedCredential.scss";

const pasteFromClipBoard = () => {};

class IssueVerifiedCredential extends Component {
  constructor(props) {
    super(props);
    this.state = { textValue: "" };
    props.did === "NOT_REGISTERED" && props.resetNextButton(false);
  }

  async componentDidMount() {
    //this.pastePayload(this.props.jwsValue);
    const textValue = this.props.jwsValue
      ? this.props.jwsValue.payload
      : await navigator.clipboard.readText();

    console.log();
    this.setState({ textValue });
  }

  async pastePayload(jwsValue) {
    const textValue = jwsValue
      ? jwsValue.payload
      : await navigator.clipboard.readText();

    console.log();
    this.setState({ textValue });
  }

  render() {
    return (
      <Fragment>
        <div>
          <button
            className="btn btn-info"
            type="button"
            onClick={() => this.props.regJWS(this.state.textValue)}
          >
            Register JWT Web Signature
          </button>
          <div className="did">Registered DID: {this.props.did}</div>
        </div>
        <div className="py-2">
          <textarea
            style={{ resize: "none" }}
            value={this.state.textValue}
            rows={10}
            cols={94}
            wrap="hard"
            placeholder="JWS Payload"
            onChange={() => console.log()}
          />
        </div>
      </Fragment>
    );
  }
}

export default IssueVerifiedCredential;
