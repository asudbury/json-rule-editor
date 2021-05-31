import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../../actions/app";
import { uploadRuleset } from "../../actions/ruleset";
import { TitlePanel } from "../../components/panel/panel";
import Button from "../../components/button/button";
import { createHashHistory } from "history";
import { includes } from "lodash/collection";
import Notification from "../../components/notification/notification";
import {
  RULE_AVAILABLE_UPLOAD,
  RULE_UPLOAD_ERROR,
} from "../../constants/messages";

import { chooseDirectory, uploadDirectory } from "../../utils/FileUtils";

class HomeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedFilesCount: 0,
      files: [],
      ruleset: [],
      uploadError: false,
      fileExist: false,
      message: {},
    };
    this.drop = this.drop.bind(this);
    this.allowDrop = this.allowDrop.bind(this);
    this.printFile = this.printFile.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.chooseDirectory = chooseDirectory.bind(this);
  }

  allowDrop(e) {
    e.preventDefault();
  }

  printFile(file, name, error) {
    if (error) {
      this.setState({
        uploadError: true,
        fileExist: false,
        message: RULE_UPLOAD_ERROR,
      });
    } else {
      const isFileAdded =
        this.state.files.some((fname) => fname === name) ||
        includes(this.props.rulenames, file.name);
      if (!isFileAdded) {
        const files = this.state.files.concat([name]);
        const ruleset = this.state.ruleset.concat(file);
        this.setState({ files, ruleset, fileExist: false });
      } else {
        const message = {
          ...RULE_AVAILABLE_UPLOAD,
          heading: RULE_AVAILABLE_UPLOAD.heading.replace("<name>", file.name),
        };
        this.setState({ fileExist: true, message });
      }
    }
  }

  drop(e) {
    e.preventDefault();
    const items = e.dataTransfer.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        let item = items[i].webkitGetAsEntry();
        if (item.isFile) {
          this.uploadFile(items, i);
        } else if (item.isDirectory) {
          uploadDirectory(item);
        }
      }
    }
  }

  handleUpload() {
    if (this.state.ruleset.length > 0) {
      this.props.uploadRuleset(this.state.ruleset);
      this.navigate("./ruleset");
    }
  }

  navigate(location) {
    const history = createHashHistory();
    this.props.login();
    history.push(location);
  }

  render() {
    const { fileExist, uploadError, message } = this.state;
    const title = this.props.loggedIn
      ? "Upload Rules"
      : "Create / Upload Rules";
    return (
      <div className="home-container">
        <div className="single-panel-container">
          {(fileExist || uploadError) && (
            <Notification
              body={message.body}
              heading={message.heading}
              type={message.type}
            />
          )}
          <TitlePanel title={title} titleClass="fa fa-cloud-upload">
            <div className="upload-panel">
              <div
                className="drop-section"
                onDrop={this.drop}
                onDragOver={this.allowDrop}
              >
                <div>
                  <label htmlFor="uploadFile">
                    Choose Ruleset directory
                    <input
                      id="uploadFile"
                      type="file"
                      onChange={this.chooseDirectory}
                      webkitdirectory="true"
                      multiple
                    />
                  </label>
                  <br />
                  or Drop Files here
                </div>
                {this.state.files.length > 0 && (
                  <div className="file-drop-msg">{`${this.state.files.length} json files are dropped!`}</div>
                )}
              </div>
            </div>
            <div className="btn-group">
              <Button
                label={"Upload"}
                onConfirm={this.handleUpload}
                classname="primary-btn"
                type="button"
              />
              {!this.props.loggedIn && (
                <Button
                  label={"Create"}
                  onConfirm={() => this.navigate("./create-ruleset")}
                  classname="primary-btn"
                  type="button"
                  disabled={this.state.files.length > 0}
                />
              )}
            </div>
          </TitlePanel>
        </div>
      </div>
    );
  }
}

HomeContainer.propTypes = {
  ruleset: PropTypes.array,
  uploadRuleset: PropTypes.func,
  login: PropTypes.func,
  loggedIn: PropTypes.bool,
  rulenames: PropTypes.array,
};

HomeContainer.defaultProps = {
  rulenames: [],
  ruleset: [],
  uploadRuleset: () => false,
  login: () => false,
  loggedIn: false,
};

const mapStateToProps = (state) => ({
  rulenames: state.ruleset.rulesets.map((r) => r.name),
  loggedIn: state.app.loggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  login: () => dispatch(login()),
  uploadRuleset: (ruleset) => dispatch(uploadRuleset(ruleset)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
