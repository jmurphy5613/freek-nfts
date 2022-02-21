import { createTheme } from "@material-ui/core"; 

//helper theme object
const theme = createTheme({
    palette: {
        primary: {
          main: '#0a1929'
        },
        secondary: {
          main: '#081c3c',
          contrastText: '#3399ff',
          light: '#b2bAc2'
        },
      },
    typography: {
      fontFamily: {
        primary: '"Inter", sans-serif',
        secondary: 'IBM Plex Sans, sans-serif', 
      }
    }    
})

export default theme;