import React from 'react';
import { Menu } from 'semantic-ui-react';

const SmallCurrentToggle = (props) => {

  const onClickHandle = (e, { value }) => {
    props.onSetCoin(value, props.currentTimePeriod);
  };

  return (
    <Menu pointing secondary>
      <Menu.Menu position='left'>
        <Menu.Item active={props.currentCoin === props.coin.coin_id} content={`${props.name} $${(+props.coin.price).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`} onClick={onClickHandle} value={props.coin.coin_id}/>
      </Menu.Menu>
    </Menu>
  );
}

export default SmallCurrentToggle;
