import React from "react";

import useApplicationData from 'hooks/useApplicationData';

import "components/Application.scss";
import DayList from 'components/DayList';
import Appointment from 'components/Appointment/index.js';

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors"

export default function Application() {
  
  const { state, setDay, bookInterview, cancelInterview } = useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const mappedAppt = dailyAppointments.map((appt) => {

    const interview = getInterview(state, appt.interview);

    const todaysInterviewers = getInterviewersForDay(state, state.day);
    
    return (
      <Appointment
        interviewers={todaysInterviewers}
        student={appt || null}
        interview={interview || null}
        time={appt.time}
        key={appt.id}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
        appointmentId={appt.id}
        day={state.day}
      />
      );
    });
    
  return (
    <main className="layout">
      <section className="sidebar">
        <img 
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__seperator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days = {state.days}
            day = {state.day}
            setDay = {setDay}
           />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {mappedAppt}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
