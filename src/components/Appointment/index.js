import React from "react";

import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty"
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";

export default function Appointment ({ id, time, interview, student, interviewer, interviewers, bookInterview,cancelInterview }) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  // save an appointment
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

  // delete an appointment
  const cancel = function() {
    transition(DELETING)
    cancelInterview(id)
    .then(() => {
      transition(EMPTY)
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
            onDelete={() => transition(CONFIRM)}
          />
        )}
        
        {mode === CREATE && (
        <Form 
          interviewers={interviewers} 
          onCancel={back}
          onSave={save} />
        )}

        {mode === SAVING && (
          <Status message="Saving" />
        )}

        {mode === DELETING && (
          <Status message="Deleting" />
        )}

        {mode === CONFIRM && (
          <Confirm 
            message="Are you sure you would like to delete the appointment?" 
            onCancel={back} 
            onConfirm={cancel}
          />
        )}
    </article>
  );
}