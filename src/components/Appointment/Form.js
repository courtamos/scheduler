import React, { useState } from "react";
import Button from "components/Button.js";
import InterviewerList from "components/InterviewerList";

export default function Form ({ name, interviewers, interviewer, onSave, onCancel }) {
  const [nameInputValue, setNameInputValue] = useState(name || "");
  const [selectedInterviewer, setSelectedInterviewer] = useState(interviewer || null);
  const [error, setError] = useState("");

  // Input Change Handler Function - updates state of nameInputValue //
  const handleInputChange = (event) => {
    setNameInputValue(event.target.value)
  };

  // Reset Function - updates state of nameInputValue && selectedInterviewer to default //
  const reset = () => {
    setNameInputValue("");
    setSelectedInterviewer(null);
  }

  // Cancel Function - calls reset function && handles the onCancel //
  const cancel = () => {
    reset();
    onCancel();
  }

  // Save Function - updates state of nameInputValue && selectedInterviewer //
  const save = () => {
    onSave(nameInputValue, selectedInterviewer);
  }

  // Validate Function - validates form input && sets error || calls save function //
  const validate = () => {
    if (!nameInputValue) {
      setError("Student name cannot be blank")
      return;
    }

    setError("");
    save(nameInputValue, selectedInterviewer)
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