export const themeOptions = {
  palette: {
    type: "light",
    secondary: {
      main: "#ffffff",
      dark: "#003332",
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: "#161617",
        color: "#ffff",
      },
    },
    MuiButton: {
      root: {
        borderRadius: "0.8em",
      },
    },
    MuiTabs: {
      indicator: {
        height: "0.3em",
      },
    },
    MuiTab: {
      wrapper: {
        flexDirection: "row",
      },
    },
    MuiSvgIcon: {
      root: {
        width: "1.3em",
      },
    },
    MuiCard: {
      root: {
        borderRadius: "0.8em",
        backgroundColor: "#fafafa",
      },
    },
  },
};
