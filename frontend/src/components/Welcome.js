import React, { useEffect, useState } from 'react'
import CandidateIdForm from './CandidateIdForm'
import CandidateNotFound from './CandidateNotFound';
// import Form from './Form'
// import { reduxForm } from 'redux-form'

export default function Welcome() {
    const [candidateId, setCandidateId] = useState(0)
    const [formInput, setFormInput] = useState('')
    
    const handleChange = (event) => {
        setFormInput(event.target.value)
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        setCandidateId(formInput)
        setFormInput('')
    };

    return (
        <div>
            <CandidateIdForm 
                handleSubmit={handleSubmit} 
                handleChange={handleChange} 
                formInput={formInput}
            />
            <CandidateNotFound candidateId={candidateId}/>
        </div>
    )
}


