import React from "react";
import PropTypes from 'prop-types';
import "components/InterviewerList.scss"
import InterviewerListItem from "components/InterviewerListItem.js";

export default function InterviewerList ({ value, interviewers, onChange }) {
  InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired
  };

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers.map(interviewerItem => (
        <InterviewerListItem 
          key={interviewerItem.id}
          name={interviewerItem.name}
          avatar={interviewerItem.avatar}
          selected={interviewerItem.id === value}
          setInterviewer={event => onChange(interviewerItem.id)}
        />
      ))}</ul>
    </section>
  );
};