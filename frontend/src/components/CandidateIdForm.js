// User enters id into this form and the candidate id is 
// updated in state on the Welcome page

export default function CandidateIdForm({ handleSubmit, handleChange, formInput }) {

    return (
        <form onSubmit={handleSubmit}>
            <label>Enter Candidate Id</label>
            <input 
                type="text" 
                name="candidateIdInput" 
                onChange={handleChange} 
                value={formInput}
            />
            <button type="submit">Submit</button>
        </form>
    )
}
