import React from 'react';
import spinnerIcon from '../images/spinner.gif';

const Spinner = () => {
  return (
    <div style={{width: '300px'}} align="center">
      <br />
      <h3>Hang tight</h3>
      <img src={spinnerIcon} width={40}/>
    </div>
  );
};

export default Spinner;
