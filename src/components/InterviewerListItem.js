import React from "react";
import "components/InterviewerListItem.scss";

const classNames = require('classnames');

export default function InterviewerListItem({ name, avatar, selected, setInterviewer }) {
  const interviewerClass = classNames("interviewers__item", {
    ' interviewers__item--selected': selected
  });

  const handleClick = () => setInterviewer(name);

  return (
    <li 
      className={interviewerClass}
      onClick={handleClick}
      selected={selected}
    >
        <img
          className="interviewers__item-image"
          src={avatar}
          alt={name}
        />
        {name}
    </li>
  );
}