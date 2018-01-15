import React from 'react';
import { Menu } from 'semantic-ui-react';

const TimeIntervalToggle = (props) => {

  const onSetTimePeriod = (e, {value}) => {
    props.onSetTimePeriod(props.currentCoin, value);
  };

  return (
    <Menu pointing secondary>
      <Menu.Menu position='right'>
        <Menu.Item active={props.currentTimePeriod === props.label} name={props.label} onClick={onSetTimePeriod} value={props.label}/>
      </Menu.Menu>
    </Menu>
  );
}

export default TimeIntervalToggle;
