//  This component displays when candidate id is not found after
// candidateIdForm is submitted

export default function CandidateNotFound({ candidateId }) {
    return (
        <div>
            <h2>Candidate id {candidateId} not found, please try again</h2>
            <p>*Candidate id should be 3 digit number</p>
        </div>
    )
}
