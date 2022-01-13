// User enters id into this form and the candidate id is 
// updated in state on the Welcome page
// Need to create error message when id is not a number and is not 3 digits
// Also need to create error message when id is not found
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
