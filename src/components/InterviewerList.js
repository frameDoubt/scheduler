import React from 'react';
import classnames from "classnames"
import InterviewerListItem from 'components/InterviewerListItem';
import "components/InterviewerList.scss";
import { action } from '@storybook/addon-actions/dist/preview';

export default function InterviewerList(props) {
  const listClass = classnames("interviewers", {
    "interviewers--selected": props.interviewer
  })
  
  const mappedInterviewers = props.interviewers.map((interviewer, index) => {
    
    const selected = props.interviewer === interviewer.id;

    return (
      <InterviewerListItem 
        name={interviewer.name}
        avatar={interviewer.avatar}
        alt={interviewer.name}
        key={interviewer.id}
        setInterviewer={event => props.setInterviewer(interviewer.id)}
        selected={selected}
      />
    );
  });

  return (
    <section className={listClass}>
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {mappedInterviewers}
      </ul>
    </section>
  );
}