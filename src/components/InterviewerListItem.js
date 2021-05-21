import React from 'react';
import classnames from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const interviewerClass = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected
  })
  const interviewerImgClass = classnames("interviewers__item-image", {
    "interviewers__item-img--selected": props.selected
  })

  return (
    <li className={interviewerClass} onClick={props.setInterviewer} data-testid={"interviewer"}>
      <img
        className={interviewerImgClass}
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}