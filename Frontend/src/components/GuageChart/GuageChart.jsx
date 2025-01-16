import React from 'react';
import GaugeChart from 'react-gauge-chart';

const GaugeChartComponent = ({ value }) => {
  return (
    <div>
      <GaugeChart id="gauge-chart" nrOfLevels={20} percent={value / 100} textColor={'#3246a8'} formatTextValue={value => value} fontSize='32'/>

    </div>
  );
};

export default GaugeChartComponent;
