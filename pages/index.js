import { makeStyles, Button, Container, Typography } from '@material-ui/core';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Navbar from '../components/navbar';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    minHeight: '100vh',
    minWidth: '100vw',
    margin: 0,
    padding: 0,
  },  
  title: {
    fontWeight: '500',
    color: '#ffffff',
    fontSize: '4.5rem',
    padding: '13% 0 0 0',
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: '600',
    maxWidth: '70%',
  },
  innerTitle: {
    color: theme.palette.secondary.contrastText,
    fontWeight: '600',
  },
  subTitle: {
    fontFamily: theme.typography.fontFamily.secondary,
    color: theme.palette.secondary.light,
    fontSize: '1.2rem',
    margin: '1rem 0 1rem 0',
    maxWidth: '70%',
  },
  getStartedButton: {
    backgroundColor: '#007FFF',
    color: '#ffffff',
    fontWeight: 'bold',
    '&:hover' : {
      backgroundColor: '#3038ff',
    }
  }

}));


export default function Home() {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Navbar />
      <Container maxWidth="md">
        <Typography variant="h2" component="h1" className={classes.title}>
          The <span className={classes.innerTitle}> NFT </span> Exchange for the best <span className={classes.innerTitle}> freekcord </span> moments
        </Typography>
        <Typography variant="h5" className={classes.subTitle}>
          A sample NFT exchange ran on the etherium blockchain that uses smart contracts to manage backend logic. The exchange is fully decentralized and is open to all users.
        </Typography>
        <Button variant="contained" className={classes.getStartedButton} endIcon={ <ArrowForwardIosIcon /> }>View Marketplace</Button>
      </Container>
    </div>
  )
}