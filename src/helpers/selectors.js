// getAppointmentsForDay Function - returns all apointments for a given day //
export function getAppointmentsForDay (state, day) {
  const daysArray = state.days;

  const dayFound = daysArray.find(dayItem => dayItem.name === day);
  
  if (!dayFound) {
    return [];
  };

  const appointmentsForDay = [];

  for (const appointment of dayFound.appointments) {
    const matchedAppointment = state.appointments[appointment];

    if (matchedAppointment) {
      appointmentsForDay.push(matchedAppointment);
    };
  };

  return appointmentsForDay;
};

// getInterviewersForDay Function - returns all interviewers for a given day //
export function getInterviewersForDay (state, day) {
  const daysArray = state.days;

  const dayFound = daysArray.find(dayItem => dayItem.name === day);
  
  if (!dayFound) {
    return [];
  };

  const interviewersForDay = [];

  for (const interviewer of dayFound.interviewers) {
    const matchedInterviewers = state.interviewers[interviewer];

    if (matchedInterviewers) {
      interviewersForDay.push(matchedInterviewers);
    };
  };

  return interviewersForDay;
};

// getInterview Function - returns a specific interview //
export function getInterview (state, interview) {
  if (interview === null) {
    return null;
  };

  for (const interviewer in state.interviewers) {
    if (parseInt(interviewer) === interview.interviewer) {
      return {...interview, interviewer: state.interviewers[interviewer]};
    };
  };

  return null;
};