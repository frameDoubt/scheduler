import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from 'components/DayList';
import Appointment from 'components/Appointment/index.js';

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors"

export default function Application() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments:
    [
      {
        id: 1,
        time: "12pm"
      },
      {
        id: 2,
        time: "1pm",
        interview: {
          student: "Lydia Miller-Jones",
          interviewer: {
            id: 1,
            name: "Sylvia Palmer",
            avatar: "https://i.imgur.com/LpaY82x.png"
          }
        }
      },
      {
        id: 3,
        time: "2pm"
      },
      {
        id: 4,
        time: "3pm",
        interview: {
          student: "Jessica Jones",
          interviewer: {
            id: 5,
            name: "Sven Jones",
            avatar: "https://i.imgur.com/twYrpay.jpg"
          }
        }
      },
      {
        id: 5,
        time: "4pm"
      }
    ]
  });

  //hook used to get data from proxy server
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {
      const [days, appts, interviewers] = all;
      setState(prev => ({ ...prev, days: days.data, appointments: appts.data, interviewers: interviewers.data }));
    });
  }, []);

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  //function passed to DayList component to state.day with given day param
  const setDay = day => setState({ ...state, day });
  
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({
      ...state,
      appointments
    });
    return axios.put(`/api/appointments/${id}`, {interview})
      .catch(err => console.log(err))
  }

  function cancelInterview(id) {
    console.log("cancelInterview idParam:", id);
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    setState({
      ...state,
      appointment
    });
    return axios.delete(`/api/appointments/${id}`)
      .catch(err => console.log(err))
  }

  const mappedAppt = dailyAppointments.map((appt) => {
    // console.log(appt.interview)
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
