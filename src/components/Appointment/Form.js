import React, { useState } from "react";
import Button from "components/Button.js";
import InterviewerList from "components/InterviewerList";
import { cleanup } from "@testing-library/react/dist";

export default function Form ({ name, interviewers, interviewer, onSave, onCancel }) {
  const [nameInputValue, setNameInputValue] = useState(name || "");
  const [selectedInterviewer, setSelectedInterviewer] = useState(interviewer || null);
  const [error, setError] = useState("");

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

  const validate = () => {
    console.log("name: ", name);  
    if (!name) {
      setError("Student name cannot be blank")
      return;
    }

    save(name, interviewer);
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
            data-testid="student-name-input"
          />
        <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList 
          interviewers={interviewers} 
          value={selectedInterviewer} 
          onChange={setSelectedInterviewer} 
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
            onClick={validate}
          >
            Save
          </Button>
        </section>
      </section>
    </main>

  );
}