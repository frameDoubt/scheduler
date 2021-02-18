import React from 'react';
import DayListItem from 'components/DayListItem';

export default function DayList(props) {
  const mappedDays = props.days.map((day, index) => {
    return (
      <DayListItem
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.setDay}
        key={index}
      />
    );
  });
  return (
    <ul>
      {mappedDays}
    </ul>
  );
}