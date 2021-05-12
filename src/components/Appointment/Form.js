import React, { useState } from "react";
import Button from "components/Button.js";
import InterviewerList from "components/InterviewerList";

export default function Form ({ name, interviewers, interviewer, onSave, onCancel }) {
  const [nameInputValue, setNameInputValue] = useState(name || "");
  const [selectedInterviewer, setSelectedInterviewer] = useState(interviewer || null);

  const handleInputChange = (event) => {
    setNameInputValue(event.target.value)
  };

  const reset = () => {
    setNameInputValue("");
    setSelectedInterviewer(null);
  }

  const cancel = () => {
    reset();
    onCancel();
  }

  const save = () => {
    onSave(nameInputValue, selectedInterviewer);
  }
 
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={nameInputValue}
            onChange={handleInputChange}
          />
        </form>
        <InterviewerList 
          interviewers={interviewers} 
          interviewer={selectedInterviewer} 
          setInterviewer={setSelectedInterviewer} 
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button 
            danger
            onClick={cancel}
          >
            Cancel
          </Button>
          <Button 
            confirm
            onClick={save}
          >
            Save
          </Button>
        </section>
      </section>
    </main>

  );
}