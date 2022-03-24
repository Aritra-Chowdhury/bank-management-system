import React from 'react';

import Navigation from './Navigation';
import classes from './MainHeader.module.css';

const MainHeader = (props) => {
  return (
    <header className={classes['main-header']}>
      <h4 onClick={props.onLoanList}>BANK MANAGEMENT SYSTEM</h4>
      <Navigation/>
    </header>
  );
};

export default MainHeader;
