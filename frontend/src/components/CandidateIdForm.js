// User enters id into this form and the candidate id is 
// updated in state on the PageContainer

export default function CandidateIdForm({ handleSubmit, onChange, formInput }) {

    return (
        <form onSubmit={handleSubmit}>
            <label>Enter Candidate Id</label>
            <input 
                type="text" 
                name="candidateIdInput" 
                onChange={onChange} 
                value={formInput}
            />
            <button type="submit">Submit</button>
        </form>
    )
}
