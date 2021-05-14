import React from "react";

import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty"
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";

export default function Appointment ({ id, time, interview, student, interviewer, dailyInerviewers }) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

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
          interviewers={dailyInerviewers} 
          onCancel={back} />
        )}
    </article>
  );
}
