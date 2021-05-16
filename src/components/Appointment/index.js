import React from 'react';
import "components/Appointment/styles.scss";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Header from "components/Appointment/Header";
import Status from "components/Appointment/Status";
import Form from './Form';

import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.appointmentId, interview)
      .then((res) => {
        // console.log("hello from appointment component")
        transition(SHOW);
      })
      transition(SAVING);
      // .then(() => {
      //   transition(SHOW);
      // }
      // )
    // console.log("this is props.bookInterview:", props.bookInterview)
  };
  // console.log(prop.bookInterview);
  // const todaysInterviewers = getInterviewersForDay(props.state, props.state.day);
  // console.log("These are the prop from appointment component:", props);

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer.name} />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message={SAVING} />}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => {back()}} onSave={save} />}
    </article>
  );
}