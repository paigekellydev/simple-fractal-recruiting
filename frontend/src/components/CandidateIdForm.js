import React, { useState, useEffect } from 'react'
// import { submit } from 'redux-form'

export default function CandidateIdForm({ handleSubmit, handleChange, formInput }) {

    // const [candidateIdInput, setcandidateIdInput] = useState('')
    // const handleChange = (event) => {
    //     setcandidateIdInput(event.target.value)
    // }
    return (
        <form onSubmit={handleSubmit}>
            <label>Enter Candidate Id</label>
            <input type="text" name="candidateIdInput" onChange={handleChange} value={formInput}></input>
            <button type="submit">Submit</button>
        </form>
    )
}
