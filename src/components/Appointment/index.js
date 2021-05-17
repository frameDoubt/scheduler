import React from 'react';
import "components/Appointment/styles.scss";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Header from "components/Appointment/Header";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import Form from './Form';

import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

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
        .catch(() => {
          transition(ERROR_SAVE, true);
        })
      transition(SAVING, true);
    } else {
      console.log("you haven't selected an interviewer");
    }
  };
  //this function is for cancelling a booked appointment
  function cancel() {
    transition(CONFIRM)
  };
  function confirm() {
    props.cancelInterview(props.appointmentId)
      .then(() => {
        transition(EMPTY);
      })
      .catch((error => transition(ERROR_DELETE, true)))
      transition(DELETING, true);
  };
  function close() {
    back();
  }
  // console.log(Object.keys(props));
  // console.log(props.interview ? props.interview : false);
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer.name} onDelete={() => {cancel()}} onEdit={() => {transition(EDIT)}} />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === CONFIRM && <Confirm message={"Are you sure you want to cancel?"} onCancel={() => {back()}} onConfirm={() => {confirm()}} />}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => {back()}} onSave={save} />}
      {mode === EDIT && <Form interviewers={props.interviewers} name={props.interview.student} interviewer={props.interview.interviewer.id} onCancel={() => {back()}} onSave={save} />}
      {mode === ERROR_DELETE && <Error message={"There was a problem cancelling your interview."} onClose={() => {close()}} />}
      {mode === ERROR_SAVE && <Error message={"There was a problem saving your interview."} onClose={() => {close()}} />}
    </article>
  );
}