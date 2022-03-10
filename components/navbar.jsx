import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { Avatar, Tooltip } from '@mui/material';
import Box from '@material-ui/core/Box';
import theme from '../helpers/theme';
import { borders } from '@mui/system';


const useStyles = makeStyles(() => ({
    logo: {
        fontFamily: theme.typography.fontFamily.primary,
        marginLeft: theme.spacing(3)
    },
    narbarButtons : {
        backgroundColor: theme.palette.primary.main,
        color: '#ffffff',
        '&:hover': {
            backgroundColor: '#2a6cad',
        },
        border: 'none',
        textTransform: 'none',
    }

})); 


const Navbar = () => {

    const classes = useStyles();

    return (
        <div>
            <AppBar position="static">
                <Toolbar>

                    <IconButton edge="start"/>
                    <Button variant="outlined" className={classes.narbarButtons}>About</Button>
                    <Button variant="outlined" className={classes.narbarButtons}>Dashboard</Button>
                    <a href="/create-item">
                        <Button variant="outlined" className={classes.narbarButtons}>Create Item</Button>
                    </a>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar;