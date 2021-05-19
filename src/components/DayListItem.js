import React from "react";
import "components/DayListItem.scss";

const classNames = require('classnames');

export default function DayListItem({ name, spots, selected, setDay }) {
  const dayClass = classNames("day-list__item", {
    ' day-list__item--selected': selected,
    ' day-list__item--full': !spots,
  });

  // handleClick Function - onClick sets the day //
  const handleClick = () => setDay(name);

  // formatSpots Function - formats spots remaining for day //
  const formatSpots = () => {
    if (spots === 0) {
      return 'no spots remaining';
    };

    if (spots === 1) {
      return '1 spot remaining';
    };
    
    return `${spots} spots remaining`;
  };

  return (
    <li 
      className={dayClass}
      data-testid="day" 
      onClick={handleClick}
    >
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
};