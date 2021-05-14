

export function getAppointmentsForDay(state, day) {
  // console.log(state.days);
  const filteredDays = state.days.filter((days) => {
    return days.name === day;
  });

  // console.log(filteredDays);
  const returnedApptArray = [];
  if(filteredDays.length > 0) {
    filteredDays[0].appointments.forEach((item) => {
    for(let value in state.appointments) {
      if(value === item.toString()) {
        returnedApptArray.push(state.appointments[value]);
      }
    }
    });
    //returnedApptArray = filteredDays[0].values()
  }
  return returnedApptArray;
}

export function getInterview(state, interview) {
  /*
  The function should return a new object containing the interview data when we pass it an object that contains the interviewer. Otherwise, the function should return null.
  {  
  "student": "Lydia Miller-Jones",
  "interviewer": {  
    "id": 1,
    "name": "Sylvia Palmer",
    "avatar": "https://i.imgur.com/LpaY82x.png"
  }
}
*/
  const returnObj = {};
  if(interview) {
    returnObj.student = interview.student;
    returnObj.interviewer = {
      ...state.interviewers[interview.interviewer]
    };
    // console.log(returnObj);
    return returnObj;
  } else {
    return null;
  }

};

export default { getAppointmentsForDay, getInterview };