import { createTheme } from '@material-ui/core/styles';

const Theme = createTheme({
    typography: {
        fontFamily: ['"Readex Pro"', 'sans-serif'].join(',')
      },
      palette: {
        type: 'light',
        primary: {
          main: '#6C63FF'
        },
        secondary: {
          main: '#FF0000',
        },
      }
})

export default Theme;