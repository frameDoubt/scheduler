

export function getAppointmentsForDay(state, day) {
  // console.log(state.days);
  const filteredDays = state.days.filter((days) => {
    return days.name === day;
  });
  const returnedApptArray = [];
  if(filteredDays.length > 0) {
    filteredDays[0].appointments.forEach((item) => {
    for(let value in state.appointments) {
      if(value === item.toString()) {
        returnedApptArray.push(state.appointments[value]);
      }
    }
    });
  }
  return returnedApptArray;
}

export function getInterview(state, interview) {
  const returnObj = {};
  if(interview) {
    returnObj.student = interview.student;
    returnObj.interviewer = {
      ...state.interviewers[interview.interviewer]
    };
    return returnObj;
  } else {
    return null;
  }

};

export function getInterviewersForDay(state, day) {
  const filteredDays = state.days.filter((days) => {
    return days.name === day;
  });
  console.log(filteredDays);
  const returnedApptArray = [];
  if(filteredDays.length > 0) {
    filteredDays[0].appointments.forEach((item) => {
    for(let value in state.appointments) {
      if(value === item.toString()) {
        returnedApptArray.push(state.appointments[value]);
      }
    }
    });
  }
  return returnedApptArray;
};

export default { getAppointmentsForDay, getInterview, getInterviewersForDay };