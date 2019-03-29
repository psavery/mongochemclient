import React, { Component } from 'react';
import {
  Card, CardHeader, CardContent,
  IconButton,
  Collapse,
  Typography,
  withStyles
} from '@material-ui/core';

import KeyBoardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';

const style = (theme) => (
  {
    card: {
      marginBottom: 2 * theme.spacing.unit
    },
    row: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: theme.spacing.unit
    },
    cardActionArea: {
      width: '100%'
    }
  }
);

class CardComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    }
  }

  render() {
    const {title, properties, classes} = this.props;
    const {collapsed} = this.state;

    return (
      <Card className={classes.card}>
        <CardHeader
          title={title}
          titleTypographyProps={{variant: 'h6'}}
          action={
            <IconButton
              onClick={() => {this.setState({collapsed: !collapsed})}}
            >
              {collapsed ? <KeyBoardArrowDown/> : <KeyboardArrowUp/>}
            </IconButton>
          }
        />
        <Collapse in={!collapsed}>
          <CardContent>
            {properties.map(({label, value}, j) => (
              <div className={classes.row} key={j}>
                <Typography component='div' color='textSecondary'>{label}</Typography>
                <Typography component='div'>{value}</Typography>
              </div>
            ))}
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

export default withStyles(style)(CardComponent);