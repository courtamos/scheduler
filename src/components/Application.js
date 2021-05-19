import React from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment/index"
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors.js";
import useApplicationData from "hooks/useApplicationData";

export default function Application() {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);

  return (
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler"/>
          <hr className="sidebar__separator sidebar--centered" />
          <nav className="sidebar__menu">
            <DayList
              days={state.days}
              day={state.day}
              setDay={setDay}
            />
          </nav>
        <img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="Lighthouse Labs"/>
      </section>
      <section className="schedule">
        {dailyAppointments.map((appointmentItem) => {
          const dailyInterview = getInterview(state, appointmentItem.interview);
          return (
            <Appointment
              key={appointmentItem.id}
              id={appointmentItem.id}
              time={appointmentItem.time}
              interview={dailyInterview}
              interviewers={dailyInterviewers}
              bookInterview={bookInterview}
              cancelInterview={cancelInterview}
            /> 
          )
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
};