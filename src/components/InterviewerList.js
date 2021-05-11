import React from "react";
import "components/InterviewerList.scss"
import InterviewerListItem from "components/InterviewerListItem.js";

export default function InterviewerList ({ interviewer, interviewers, setInterviewer }) {

  return (
  <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">{interviewers.map(interviewerItem => (
      <InterviewerListItem 
        key={interviewerItem.id}
        name={interviewerItem.name}
        avatar={interviewerItem.avatar}
        selected={interviewerItem.id === interviewer}
        setInterviewer={event => setInterviewer(interviewerItem.id)}
      />
    ))}</ul>
  </section>
  );
}