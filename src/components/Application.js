import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from 'components/DayList';
import Appointment from 'components/Appointment/index.js';

const appointments = [
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
];


export default function Application() {
  // const [days, setDays] = useState([]);
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  
  useEffect(() => {
    axios.get('/api/days')
    .then((res) => {
      // console.log(res.data);
      setDays(res.data);
    })
  },[]);
  
  const setDays = days => setState({...state, days})
  const setDay = day => setState({ ...state, day });

  const mappedAppt = appointments.map((appt) => {
    return (
      <Appointment
      {... appt}
      // interview={appt.interview}
      // time={appt.time}
      student={appt || null}
      interviewer={appt || null}
      key={appt.id}
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
