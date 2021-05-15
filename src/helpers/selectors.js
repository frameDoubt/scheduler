
//selector function gets appointments for given day(string) and given state(object)
export function getAppointmentsForDay(state, day) {
  //create new array with state.days array, returns values equal to this.selectors given day param
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

//selector function returns reformatted object with given state and interview object
export function getInterview(state, interview) {
  const returnObj = {};
  //if interview object has value, reformats given object
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

//selector function returns array with given state and day
export function getInterviewersForDay(state, day) {
  //create new array with day object equal to this.selectors given day param
  const filteredDays = state.days.filter((days) => {
    return days.name === day;
  });
  //empty array to return with interviewers objects for day
  const returnedInterviewersArray = [];
  //if filteredDays array has any value
  if(filteredDays.length > 0) {
    //for every item in state.interviewers object
    //day.interviewers array values are matched to interviewers object keys 
    for(let value in state.interviewers) {
      filteredDays[0].interviewers.forEach((item) => {
        if(value === item.toString()) {
          //returned array is in numerical order due to state.interviewers object... maybe
          returnedInterviewersArray.push(state.interviewers[value]);
        }
      });
    }
  }
  return returnedInterviewersArray;
};

export default { getAppointmentsForDay, getInterview, getInterviewersForDay };