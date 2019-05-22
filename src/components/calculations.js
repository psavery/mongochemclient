import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { has } from 'lodash-es';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import PageHead from './page-head';
import PageBody from './page-body';
import CardComponent from './item-card';
import { formatFormula } from '../utils/formulas';
import { getCalculationProperties } from '../utils/calculations';

class Calculations extends Component {

  getName(calculation) {
    const { molecules } = this.props;
    if (molecules && calculation.moleculeId in molecules) {
      if (molecules[calculation.moleculeId].name)
        return molecules[calculation.moleculeId].name;
      else if (molecules[calculation.moleculeId].properties.formula)
        return formatFormula(molecules[calculation.moleculeId].properties.formula);
    }
    return 'Calculation';
  }

  render = () => {
    const {calculations, onOpen, children} = this.props;

    return (
      <div>
        <PageHead>
          <Typography  color="inherit" gutterBottom variant="display1">
            Calculations
          </Typography>
          <Typography variant="subheading" paragraph color="inherit">
          </Typography>
        </PageHead>
        <PageBody>
          <Grid container spacing={24}>
            {
              calculations.map(calculation => {
                const title = this.getName(calculation);
                const image = `${window.location.origin}/api/v1/molecules/${calculation.moleculeId}/svg`;
                const pending = has(calculation, 'properties.pending');
                const properties = getCalculationProperties(calculation);

                return (
                  <Grid key={calculation._id} item xs={12} sm={6} md={4} lg={3}>
                    <CardComponent
                      title={title}
                      properties={properties}
                      image={image}
                      disabled={pending}
                      onOpen={() => {onOpen(calculation._id)}}/>
                  </Grid>
                )
              })
            }
          </Grid>
          {children}
        </PageBody>
      </div>
    );
  }
}

Calculations.propTypes = {
  calculations: PropTypes.array,
  onOpen: PropTypes.func
}

Calculations.defaultProps = {
  calculations: [],
  onOpen: () => null
}

export default Calculations;
