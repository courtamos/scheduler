export function getAppointmentsForDay (state, day) {
  const daysArray = state.days;

  const dayFound = daysArray.find(dayItem => dayItem.name === day);
  
  if (!dayFound) {
    return [];
  }

  const appointmentsForDay = [];

  for (const appointment of dayFound.appointments) {
    const matchedAppointment = state.appointments[appointment];

    if (matchedAppointment) {
      appointmentsForDay.push(matchedAppointment);
    }
  }

  return appointmentsForDay;
}