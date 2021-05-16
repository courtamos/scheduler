import React, { useState, useEffect } from "react";

const axios = require('axios');

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('api/interviewers')
    ])
    .then(all => {
      setState(prev => ({ 
        ...prev, 
        days: all[0].data, 
        appointments: all[1].data ,
        interviewers: all[2].data
      }))
    })
  }, [])

  // create an interview
  const bookInterview = function(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
  
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const updatedDays = updateSpots(state.day, state.days, appointments);
  
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState({...state, appointments, days: updatedDays})
      })
  }

  // delete an interview
  const cancelInterview = function(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
  
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const updatedDays = updateSpots(state.day, state.days, appointments);
  
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState({...state, appointments, days: updatedDays}) 
      })
  }

  // calulate spots available for each day
  const updateSpots = function(dayName, days, appointments) {
    const selectedDay = days.find(dayItem => dayItem.name === dayName);
    const selectedDayAppointments = selectedDay.appointments;
  
    let spots = 0;
  
    for (const appointmentId of selectedDayAppointments) {
      const appointment = appointments[appointmentId];
  
      if (!appointment.interview) {
        spots++;
      }
    }
  
    let updatedDay = {...selectedDay, spots};
    
    let updatedDays = [...days];
    updatedDays[selectedDay] = updatedDay;
    
    return updatedDays;
  };

  return (
    { state, setDay, bookInterview, cancelInterview }
  )

}





