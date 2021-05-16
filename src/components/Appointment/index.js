import React from 'react';
import "components/Appointment/styles.scss";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Header from "components/Appointment/Header";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Form from './Form';

import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
    if(interviewer) {
      const interview = {
        student: name,
        interviewer
      };
      props.bookInterview(props.appointmentId, interview)
        .then(() => {
          transition(SHOW);
        })
        transition(SAVING);
    } else {
      console.log("you haven't selected an interviewer");
    }
  };
  function cancel() {
    transition(CONFIRM)
  };
  function confirm() {
    props.cancelInterview(props.appointmentId)
      .then(() => {
        transition(EMPTY);
      })
      transition(DELETING);
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer.name} onDelete={() => {cancel()}} />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === CONFIRM && <Confirm message={"Are you sure you want to cancel?"} onCancel={() => {back()}} onConfirm={() => {confirm()}} />}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => {back()}} onSave={save} />}
    </article>
  );
}