import React, { useEffect, useState } from 'react'
import CandidateIdForm from './CandidateIdForm'
import CandidateNotFound from './CandidateNotFound';
import ResultsContainer from './ResultsContainer';

const scoreRecordsUrl = 'http://localhost:8000/data'
export default function Welcome() {
    const [scoreRecords, setScoreRecords] = useState([])
    const [companies, setCompanies] = useState([])
    const [formInput, setFormInput] = useState('')
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [candidateId, setCandidateId] = useState(null)
    const [candidateInfo, setCandidateInfo] = useState({})

    // Retrieves scoreRecords and companies from data in db.json
    useEffect(() => {
        fetch(`${scoreRecordsUrl}`)
            .then(response => response.json())
            .then(data => {
                setScoreRecords(data["score-records"])
                setCompanies(data.companies)
            })
    },[])

    // onChange will update input value and will update formInput in state
    const onChange = (event) => {
        setFormInput(event.target.value)
    };

    // handleSubmit will update state. formInput must be parsed into integer in order to compare it to candidate_id
    const handleSubmit = (event) => {
        event.preventDefault()
        setCandidateId(parseInt(formInput))
        setFormSubmitted(true)
        setFormInput('')
    };

    // If candidate_id is valid and can be found in score-records, the results will be displayed
    // This function also passes the all candidate information to results container
    // If the candidate cannot be found and if the form is submitted the CandidateNotFound
    // component will be displayed
    const displayResults = () => {
        if (candidateId) {
            return scoreRecords.map(candidateInfo => {
                if (candidateInfo.candidate_id === candidateId) {
                    return (
                        <ResultsContainer 
                            key={candidateId} 
                            candidateInfo={candidateInfo}
                            scoreRecords={scoreRecords}
                            companies={companies}
                        />
                    )
                }
            })
        } else if (formSubmitted) {
            return <CandidateNotFound candidateId={candidateId}/>
        }
    }

    return (
        <div>
            <CandidateIdForm 
                handleSubmit={handleSubmit} 
                onChange={onChange} 
                formInput={formInput}
            />
            {displayResults()}
        </div>
    )
}


