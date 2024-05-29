import { createTheme } from '@mui/material/styles';

export const inputTheme = createTheme({
    typography: {
      fontFamily: 'monospace',
    },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            color: 'inherit', // Inherit the text color
            fontFamily: 'inherit', // Inherit the font family
            '& .MuiOutlinedInput-input': {
              color: 'inherit', // Inherit the text color
              fontFamily: 'inherit', // Inherit the font family
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#FF7F50',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#FF7F50', // Keep the same color on hover
            },
          },
          notchedOutline: {
            borderColor: '#FF7F50',
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: '#FF7F50',
            fontFamily: 'inherit', // Inherit the font family
            '&.Mui-focused': {
              color: '#FF7F50',
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          input: {
            '::placeholder': {
              color: 'inherit', // Inherit text color
              opacity: 1,
              fontFamily: 'inherit', // Inherit the font family
            },
          },
        },
      },
    },
  });