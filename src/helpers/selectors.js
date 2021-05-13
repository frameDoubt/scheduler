

export function getAppointmentsForDay(state, day) {
  // console.log(state.days);
  const filteredDays = state.days.filter((days) => {
    return days.name === day;
  });

  // console.log(filteredDays);
  const returnedApptArray = [];
  if(filteredDays.length > 0) {
    filteredDays[0].appointments.forEach((item) => {
    // console.log(item);
    for(let value in state.appointments) {
      // console.log(`Value = ${value} and Item = ${item}`);
      if(value === item.toString()) {
        returnedApptArray.push(state.appointments[value]);
      }
    }
    });
  }
  // console.log(returnedApptArray);

  return returnedApptArray;
}