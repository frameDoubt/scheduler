import { useState, useEffect } from 'react';
import axios from 'axios';

export default function UseApplicationData (props) {
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
    ],
    
  });

  const setDay = day => setState((prev) => {return {...prev, day}});

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // console.log(state.days[id].spots);
    const newDaysArr = updateSpots(state.day, state.days, appointments);

    setState((prev) => {
      return {...prev, appointments, days: newDaysArr}
    });
    return axios.put(`/api/appointments/${id}`, {interview})
  }

  function cancelInterview(id) {
    
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // console.log("Appointments:", appointments);
    const newDaysArr = updateSpots(state.day, state.days, appointments);
    // console.log("newDaysArr:", newDaysArr);
    setState((prev) => {
     return { ...prev, appointments, days: newDaysArr}
    })
    
    return axios.delete(`/api/appointments/${id}`)
  }

  function getSpotsForDay(dayObj, appointments) {
    let spots = 0;
    for(const id of dayObj.appointments) {
      const appointment = appointments[id];
      if(!appointment.interview) {
        spots++;
      }
    }
    return spots;
  }

  function updateSpots(dayName, days, appointments) {
    // returns array with object with matching name obj.property
    const dayObj = days.find(day => day.name === dayName);
    // store returned value, contains number of appointments, 
    // that have null value for appointment obj.property
    const spots = getSpotsForDay(dayObj, appointments);
    // new object for mapping to state obj
    const newDay = { ...dayObj, spots }
    const newDays = days.map(day => day.name === dayName ? newDay : day);
    return newDays;
  }

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
  // console.log(`These are sync state keys: ${Object.keys(state)}`);
  // console.log(`Is state.days an array: ${ Array.isArray(state.days) }`);
  // console.log(`This is state.days keys: ${Object.keys(state.days)}`);
  // console.log(`This is state:`, state);
  return { state, setState, setDay, bookInterview, cancelInterview };
}