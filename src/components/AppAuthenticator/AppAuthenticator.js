import { Authenticator, ThemeProvider } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { AppFooter } from "../AppLayout/AppFooter";
import "./authenticator.styles.css";

const theme = {
  name: "my-theme",
  tokens: {
    colors: {
      border: {
        pressed: { value: "{colors.blue.80}" },
        primary: { value: "{colors.blue.60}" },
        focus: { value: "{colors.blue.60}" },
      },
      font: {
        primary: { value: "{colors.blue.60}" },
      },
    },
    components: {
      button: {
        // style the primary variation
        primary: {
          backgroundColor: { value: "{colors.blue.60}" },
          _hover: {
            backgroundColor: { value: "{colors.blue.80}" },
          },
          _focus: {
            backgroundColor: { value: "{colors.blue.80}" },
          },
          _active: {
            backgroundColor: { value: "{colors.blue.90}" },
          },
        },
        link: {
          color: { value: "{colors.blue.60}" },
          _hover: {
            color: { value: "{colors.blue.60}" },
            backgroundColor: { value: "{colors.blue.10}" },
          },
          _focus: {
            border: { value: "{colors.blue.60}" },
            color: { value: "{colors.blue.60}" },
            backgroundColor: { value: "{colors.blue.10}" },
          },
          _active: {
            border: { value: "{colors.blue.60}" },
            color: { value: "{colors.blue.60}" },
            backgroundColor: { value: "{colors.blue.10}" },
          },
        },
      },
      link: {
        focus: {
          color: { value: "{colors.blue.40}" },
        },
        hover: {
          color: { value: "{colors.blue.60}" },
        },
        visited: {
          color: { value: "{colors.blue.80}" },
        },
      },
      tabs: {
        borderColor: { value: "{colors.neutral.20}" },
        item: {
          color: { value: "{colors.blue.80}" },
          fontWeight: { value: "{fontWeights.normal}" },
          _hover: {
            color: { value: "{colors.blue.60}" },
          },
          _focus: {
            color: { value: "{colors.blue.60}" },
          },
          _active: {
            color: { value: "{colors.blue.80}" },
            borderColor: { value: "{colors.blue.80}" },
            backgroundColor: { value: "{colors.blue.10}" },
          },
          _disabled: {
            color: { value: "gray" },
            backgroundColor: { value: "transparent" },
          },
        },
      },
      passwordfield: {
        button: {
          color: { value: "{colors.blue.60}" },
          _hover: {
            backgroundColor: { value: "{colors.blue.10}" },
            color: { value: "{colors.blue.60}" },
            borderColor: { value: "{colors.blue.60}" },
          },
          _active: {
            backgroundColor: { value: "{colors.blue.10}" },
            color: { value: "{colors.blue.80}" },
            borderColor: { value: "{colors.blue.60}" },
          },
          _focus: {
            backgroundColor: { value: "{colors.blue.10}" },
            color: { value: "{colors.blue.90}" },
            borderColor: { value: "{colors.blue.60}" },
          },
        },
      },
      fieldcontrol: {
        borderColor: {
          value: "{colors.blue.60}",
        },
        color: {
          value: "{colors.blue.80}",
        },
      },
    },
  },
};

export const AppAuthenticator = () => {
  return (
    <div className="authenticator-root">
      <div className="authenticator-section">
        <h1 className="logo-text">
          <img src="/logo-glow.png" alt="logo" height="110" width="110" />
        </h1>
        <div className="authenticator-card">
          <ThemeProvider theme={theme}>
            <Authenticator />
          </ThemeProvider>
        </div>
        <br />
        <br />
        <AppFooter />
      </div>
    </div>
  );
};
