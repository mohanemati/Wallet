import {
  createTheme,
  PaletteOptions,
  SimplePaletteColorOptions,
} from "@mui/material";

declare module "@mui/material/styles" {
  interface TypeBackground {
    secondary?: string;
    golden?: string;
  }

  interface BreakpointOverrides {
    "2xl": true;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    golden: true;
  }
}

interface paletteOptionsModel extends PaletteOptions {
  primary: SimplePaletteColorOptions;
  golden: SimplePaletteColorOptions;
}

const palette: paletteOptionsModel = {
  primary: {
    main: "#123DA1",
  },
  secondary: {
    main: "#7e8299",
  },
  golden: {
    main: "#c49a26",
  },
  background: {
    default: "#fff",
    paper: "#fff",
    secondary: "#fbfbfd",
  },
};

export const theme = createTheme({
  palette,
  direction: "rtl",
  spacing: 4,
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1114,
      xl: 1280,
      "2xl": 1536,
    },
  },
  typography: {
    fontFamily: "iranyekan",
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#707070",
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: { borderColor: "rgb(196 196 196)" },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: { background: "white", marginBottom: "1rem", display: "none" },
      },
    },

    MuiTab: {
      styleOverrides: {},
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
        },
      },
    },

    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          color: palette.primary.main,
          padding: 0,
          marginBottom: "1rem",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { minWidth: "30%" },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "contained",
        color: "primary",
      },
      styleOverrides: {
        root: {
          borderRadius: "8px",
          boxShadow: "none",
          "&:focus": {
            outline: "none",
          },
          "&:disabled": {
            color: "rgba(0, 0, 0, 0.7)",
          },
        },
        containedPrimary: {
          color: "white",
          backgroundColor: "#123DA1 !important",
          "&:hover": {
            backgroundColor: "#2D67D2 !important",
            color: "#ffffff",
          },
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          "&:focus": {
            outline: "none",
          },
        },
      },
    },

    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          boxShadow:
            "0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)",
          borderRadius: "50px !important",
        },
        listbox: {
          maxHeight: "45vh",
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          backgroundColor: "black",
        },
        root: {
          backgroundColor: "black",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        elevation1: {
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 2px 4px;",
        },
        elevation8: {
          borderRadius: "20px",
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          "&:before": {
            display: "none",
          },
          "&:disabled": {
            backgroundColor: "rgb(100 100 100 / 12%)",
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          "&.MuiFilledInput-input.Mui-disabled": {
            WebkitTextFillColor: "#5e5e5e",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&:hover:not(.Mui-error) .MuiOutlinedInput-notchedOutline": {
            borderColor: "#D1D5DB",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#2D67D2",
          },
          "&.Mui-actived .MuiOutlinedInput-notchedOutline": {
            borderColor: "#2D67D2",
          },
          "&.Mui-disabled .MuiOutlinedInput-notchedOutline": {
            borderColor: "#D1D5DB",
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          "&.MuiInputLabel-root.Mui-disabled": {
            color: "#5e5e5e",
          },
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {},
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        root: { cursor: "pointer !important", userSelect: "none" },
        label: {},
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "transparent",
            },
          },
        },
      },
    },
  },
});
