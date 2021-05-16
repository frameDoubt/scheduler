import React from 'react';
import "components/Appointment/styles.scss";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Header from "components/Appointment/Header";
import Form from './Form';

import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.appointmentId, interview);
    transition(SHOW);
  };
  // console.log(prop.bookInterview);
  // const todaysInterviewers = getInterviewersForDay(props.state, props.state.day);
  // console.log("These are the prop from appointment component:", props);

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer.name} />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => {back()}} onSave={save} />}
    </article>
  );
}