import React from "react";

import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty"
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";

export default function Appointment ({ id, time, interview, student, interviewer, interviewers, bookInterview }) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  const save = function(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING)
    bookInterview(id, interview)
    .then(() => {
      transition(SHOW)
    })
  }

  return (
    <article className="appointment">
      <Header time={time} />
        {mode === EMPTY && (
          <Empty 
            onAdd={() => transition(CREATE)} 
          />
        )}

        {mode === SHOW && (
          <Show 
            student={interview.student} 
            interviewer={interview.interviewer.name} 
          />
        )}
        
        {mode === CREATE && (
        <Form 
          interviewers={interviewers} 
          onCancel={back}
          onSave={save} />
        )}

        {mode === SAVING && (
          <Status message="Saving"/>
        )}
    </article>
  );
}