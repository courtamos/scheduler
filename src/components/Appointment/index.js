import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty"
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

export default function Appointment ({ id, time, interview, student, interviewer, interviewers, bookInterview,cancelInterview }) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  // Save Function - saves interview && transitions to correct view pending promise //
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    bookInterview(id, interview)
    .then(() => {
      transition(SHOW);
    })
    .catch((error) => {
      transition(ERROR_SAVE, true);
    })
  }

  // Delete Function - deletes interview && transitions to correct view pending promise //
  const cancel = () => {
    transition(DELETING, true);

    cancelInterview(id)
    .then(() => {
      transition(EMPTY);
    })
    .catch((error) => {
      transition(ERROR_DELETE, true);
    })
  }

  return (
    <article className="appointment" data-testid="appointment">
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
            onEdit={() => transition(EDIT)}
          />
        )}
        
        {mode === CREATE && (
          <Form 
            interviewers={interviewers} 
            onSave={save}
            onCancel={back}
          />
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

        {mode === EDIT && (
          <Form 
            name={interview.student}
            interviewer={interview.interviewer.id}
            interviewers={interviewers}
            onSave={save}
            onCancel={back}
          />
        )}

        {mode === ERROR_SAVE && (
          <Error 
            message="An error occurred while saving"
            onClose={back}
          />
        )}

        {mode === ERROR_DELETE && (
          <Error 
            message="An error occured while deleting"
            onClose={back}
          />
        )}
    </article>
  );
};