import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { includes } from "lodash/collection";
import { createHashHistory } from "history";
import { addRuleset } from "../../actions/ruleset";
import { RULE_AVAILABLE_CREATE } from "../../constants/messages";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import MyButton from "../../components/core/MyButton";
import MyAlert from "../../components/core/MyAlert";

class CreateRulesetContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", error: {}, fileExist: false, message: {} };
    this.onChangeName = this.onChangeName.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  onChangeName(e) {
    this.setState({ name: e.target.value });
  }

  handleAdd(e) {
    e.preventDefault();
    const history = createHashHistory();
    if (!this.state.name || !this.state.name.trim()) {
      this.setState({ error: { name: "Please specify value" } });
    } else if (includes(this.props.rulesetnames, this.state.name)) {
      this.setState({ fileExist: true, message: RULE_AVAILABLE_CREATE });
    } else {
      this.props.addRuleset(this.state.name);
      history.push("./ruleset");
    }
  }

  render() {
    const { fileExist, message } = this.state;
    return (
      <div className="home-container">
        <div className="single-panel-container">
          <div className="title-panel">
            <Card style={{ border: "none", boxShadow: "none" }}>
              <CardContent>
                <Typography gutterBottom>Create Ruleset</Typography>
                <TextField
                  label="Ruleset Name"
                  value={this.state.name}
                  error={this.state.error.name}
                  onChange={this.onChangeName}
                />
                {fileExist && (
                  <MyAlert type={message.type} message={message.heading} />
                )}
              </CardContent>
              <CardActions>
                <MyButton content="Create" onClick={this.handleAdd} />
              </CardActions>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  rulesetnames: state.ruleset.rulesets.map((r) => r.name),
});

const mapDispatchToProps = (dispatch) => ({
  addRuleset: (name) => dispatch(addRuleset(name)),
});

CreateRulesetContainer.defaultProps = {
  addRuleset: () => false,
  rulesetnames: [],
};

CreateRulesetContainer.propTypes = {
  rulesetnames: PropTypes.array,
  addRuleset: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateRulesetContainer);
