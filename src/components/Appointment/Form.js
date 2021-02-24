import { React, useState } from "react";
import { InterviewerList } from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  const [value, setValue] = useState('');
  const handleChange = (event) => {
    setValue(event.target.value);
  }
  const handleSubmit = (event) => {
    event.preventDefault();

  }
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={value}
            onChange={handleChange}
          />
        </form>
        <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger>Cancel</Button>
          <Button confirm>Save</Button>
        </section>
      </section>
    </main>
  );
}