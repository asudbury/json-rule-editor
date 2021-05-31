import React, { Component } from "react";
import NavLinks from "./navigation-link";
import PropTypes from "prop-types";
import { createHashHistory } from "history";
import NavigationDrawer from "./NavigationDrawer";
import backGroundSvg from "../../../assets/background.svg";

class NavigationPanel extends Component {
  constructor(props) {
    super(props);
    this.state = { links: [] };
    this.handleNavLink = this.handleNavLink.bind(this);
    this.handleNavBtn = this.handleNavBtn.bind(this);
    this.handleHome = this.handleHome.bind(this);
    this.handleDocumentation = this.handleDocumentation.bind(this);
  }

  handleNavBtn() {
    const history = createHashHistory();
    history.push("./create-ruleset");
  }

  handleHome() {
    const history = createHashHistory();
    history.push("./home");
  }

  handleNavLink(name) {
    const history = createHashHistory();
    this.props.setActiveRulesetIndex(name);
    history.push("./ruleset");
  }

  handleDocumentation() {
    window.open("https://asudbury.github.io/json-rule-editor-docs/", "_blank");
  }

  render() {
    let rulesetLink =
      this.props.rulenames.length > 0
        ? [
            {
              name: "Rulesets",
              sublinks: this.props.rulenames,
              iconClass: "rules-icon",
              linkClass: "link-heading",
            },
          ]
        : [];

    return (
      <div
        className="nav-container open"
        style={{
          backgroundImage: `url(${backGroundSvg})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <NavigationDrawer
          onCreateRuleSet={this.handleNavBtn}
          onUploadRuleSet={this.handleHome}
          onShowDocumentation={this.handleDocumentation}
          currentRuleSets={rulesetLink}
          style={{
            backgroundImage: `url(${backGroundSvg})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        />
        <div className="links-section">
          <div>
            <NavLinks
              links={rulesetLink}
              onConfirm={this.handleNavLink}
              activeIndex={this.props.activeIndex}
            />
          </div>
        </div>
      </div>
    );
  }
}

NavigationPanel.defaultProps = {
  closedState: false,
  rulenames: [],
  setActiveRulesetIndex: () => false,
  loggedIn: false,
  updateState: () => false,
  activeIndex: 0,
};

NavigationPanel.propTypes = {
  closedState: PropTypes.bool,
  rulenames: PropTypes.array,
  setActiveRulesetIndex: PropTypes.func,
  loggedIn: PropTypes.bool,
  updateState: PropTypes.func,
  activeIndex: PropTypes.number,
};

export default NavigationPanel;
