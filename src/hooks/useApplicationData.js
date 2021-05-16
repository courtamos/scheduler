import { useReducer, useEffect } from "react";

const axios = require('axios');

export default function useApplicationData() {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  const reducer = function(state, action) {
    switch (action.type) {
      case SET_DAY:
        return {
          ...state, 
          day: action.payload.day
        }
      case SET_APPLICATION_DATA:
        return { 
          ...state,
          ...action.payload
         }
      case SET_INTERVIEW: {
        return {
          ...state,
          appointments: {
            ...state.appointments,
            [action.payload.id]: {
              ...state.appointments[action.payload.id],
              interview: action.payload.interview
            }
          }
        }
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const setDay = day => dispatch({
    type: SET_DAY,
    payload: {
      day
    } 
  });
  // const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('api/interviewers')
    ])
    .then(all => {
      dispatch({
        type: SET_APPLICATION_DATA,
        payload: {
          days: all[0].data, 
          appointments: all[1].data,
          interviewers: all[2].data
        }
      })
      // setState(prev => ({ 
      //   ...prev, 
      //   days: all[0].data, 
      //   appointments: all[1].data ,
      //   interviewers: all[2].data
      // }))
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
    console.log('CREATE updatedDays: ', updatedDays);
  
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        dispatch({
          type: SET_INTERVIEW,
          payload: {
            id,
            interview
          }
        })
        // setState({...state, appointments, days: updatedDays})
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

    
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      const updatedDays = updateSpots(state.day, state.days, appointments);
      console.log('CANCEL updatedDays: ', updatedDays);

      dispatch({
        type: SET_INTERVIEW,
        payload: {
          id,
          interview: null
        }
      })
      // setState({...state, appointments, days: updatedDays}) 
      })
  }

  // calulate spots available for each day
  const updateSpots = function(dayName, days, appointments) {
    const selectedDay = days.find(dayItem => dayItem.name === dayName);
    const selectedDayAppointments = selectedDay.appointments;
  
    let spots = 0;
    for (const appointmentId of selectedDayAppointments) {
      const appointment = appointments[appointmentId];
  
      console.log('app in update spots: ', appointment);
      if (!appointment.interview) {
        spots++;
      }
    }
  
    let updatedDay = {...selectedDay, spots};
    
    const updatedDays = days.map(day => {
      if (day.name === dayName) {
        return updatedDay;
      }

      return day
    })
    
    return updatedDays;
  };

  return (
    { state, setDay, bookInterview, cancelInterview, dispatch }
  )

}





