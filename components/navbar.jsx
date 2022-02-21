import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { Avatar, Tooltip } from '@mui/material';
import Box from '@material-ui/core/Box';
import theme from '../helpers/theme';


const useStyles = makeStyles(() => ({
    logo: {
        fontFamily: theme.typography.fontFamily.primary,
        marginLeft: theme.spacing(3)
    }
})); 


const Navbar = () => {

    const classes = useStyles();

    return (
        <>
            <AppBar position="static">
                <Toolbar>

                    <IconButton edge="start"/>
                    <Button variant="contained">About</Button>
                    <Button variant="contained">Dashboard</Button>
                    <Box>
                        <Tooltip title="View Profile">
                            <Avatar src="/favicon.ico"/>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar;