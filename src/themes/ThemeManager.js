import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";
import { themeOptions } from "./ThemeOptions";

export function getTheme() {
  let theme = createMuiTheme(themeOptions);
  theme = responsiveFontSizes(theme);
  return theme;
}
