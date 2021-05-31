import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { connect } from "react-redux";
import NavigationPanel from "../../components/navigation/navigation-panel";
import AppRoutes from "../../routes/app-routes";
import { ThemeProvider } from "@material-ui/core";
import PropTypes from "prop-types";
import { updateRulesetIndex } from "../../actions/ruleset";
import { updateState } from "../../actions/app";
import { createHashHistory } from "history";
import { getTheme } from "../../themes/ThemeManager";
import backGroundSvg from "../../../assets/background.svg";
import MyToolbar from "../../components/core/MyToolbar";

class ApplicationContainer extends Component {
  constructor(props) {
    super(props);
    const history = createHashHistory();
    if (!this.props.loggedIn) {
      history.push("./home");
    }
  }

  componentWillUnmount() {
    if (this.unlisten) {
      this.unlisten();
    }
  }

  render() {
    const theme = getTheme();
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <div
            style={{
              backgroundImage: `url(${backGroundSvg})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <React.Fragment>
              <MyToolbar />
              <NavigationPanel
                updateState={this.props.updateState}
                activeIndex={this.props.activeIndex}
                rulenames={this.props.rulenames}
                setActiveRulesetIndex={this.props.setActiveRulesetIndex}
                loggedIn={this.props.loggedIn}
              />
              <AppRoutes />
            </React.Fragment>
          </div>
        </CssBaseline>
      </ThemeProvider>
    );
  }
}

ApplicationContainer.defaultProps = {
  rulenames: [],
  setActiveRulesetIndex: () => false,
  navState: undefined,
  activeIndex: 0,
  loggedIn: false,
  updateState: () => false,
};

ApplicationContainer.propTypes = {
  rulenames: PropTypes.array,
  setActiveRulesetIndex: PropTypes.func,
  navState: PropTypes.string,
  loggedIn: PropTypes.bool,
  updateState: PropTypes.func,
  activeIndex: PropTypes.number,
};

const mapStateToProps = (state, ownProps) => ({
  navState: state.app.navState,
  rulenames: state.ruleset.rulesets.map((r) => r.name),
  loggedIn: state.app.loggedIn,
  activeIndex: state.ruleset.activeRuleset,
  ownProps,
});

const mapDispatchToProps = (dispatch) => ({
  handleClick: () => {
    return false;
  },
  setActiveRulesetIndex: (name) => dispatch(updateRulesetIndex(name)),
  updateState: (val) => dispatch(updateState(val)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicationContainer);
