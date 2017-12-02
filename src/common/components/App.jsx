import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    width: '100%',
  },
  button: {
    margin: theme.spacing.unit,
  },
});

function App(props) {
  const { classes } = props;
  console.log(AppBar);
  return (
    <div className={ classes.root }>
      <AppBar position='static' color='blue'>
        <Toolbar>
          <Typography type='title' color='inherit'>
                DERBY
          </Typography>
          <Button raised color='primary' className={classes.button}>
            Primary
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
