import React, {useState, useEffect} from 'react'

export default function Percentile(candidateId) {
    const [scoreRecords, setScoreRecords] = useState([])
    const [companies, setCompanies] = useState([])
    const [candidate, setCandidate] = useState({})
    const [candidateCompany, setCandidateCompany] = useState({})
    const [data, setData] = useState({})    // const scoreRecords = data["score-records"]
    // Retrieves scoreRecords and companies from data in db.json
    
    useEffect(() => {
        fetch('http://localhost:8000/data')
            .then(response => response.json())
            .then(data => {
                const candidate = data['score-records'].filter(candidateInfo => candidateInfo.candidate_id === candidateId)[0]
                const candidateCompany = data.companies.filter(company => company.company_id === candidate.company_id)[0]
                setScoreRecords(data['score-records'])
                setCompanies(data.companies)
                setCandidate(candidate)
                setCandidateCompany(candidateCompany)
                setData(data)
            })
    },[])

    // returns array of company ids where each company fractal index is < 0.15 difference
    // from the searched candidate's company's fractal index
    // this is a helper function for isAtSimilarCompany
    const similarCompaniesIds = () => {
        const candidateCompanyFractal = candidateCompany.fractal_index
        return (
            companies.map(company => {
                const difference = Math.abs(candidateCompanyFractal - company.fractal_index)
                if (difference < .15) {
                    return company.company_id
                }
            }).filter(id => id !== undefined)
        )
    };

    // checks if the company id is in the similarCompaniesIds array, 
    // if the company id is found in array, candidate works at similar company, and true value is returned
    // this is a helper function for candidateScores
    const isAtSimilarCompany = (companyId) => {
        return (similarCompaniesIds().indexOf(companyId) > -1) 
    };

    // checks if title matches candidate title, if so candidate has same title as searched candidate and true value is returned
    // this is a helper function for candidateScores
    const hasSameTitle = (candidateTitle) => {
        return candidateTitle === candidate.title
    };

    //  dynamic function that returns one of the following: candidate's combined score (coding_score + communication_score), coding_score only, or communication_score only. The candidate input should be an object with key values of coding_score & communication_score. The type input should be a string of one of the following: combined, coding, communication depending on which type of score you want to return
    const candidateScore = (candidateInfo, type) => {
        if (type === "combined") {
            return (candidateInfo.communication_score + candidate.coding_score)
        } else if (type === "communication") {
            return candidateInfo.communication_score
        } else if (type === "coding") {
            return candidateInfo.coding_score
        }
    };

    // dynamic function that returns an array of scores based on type. The type input should be a string of one of the following: combined, coding, communication depending on which type of score you want to return.
    const candidatesScores = (type) => {
        return (
            scoreRecords.map(candidateInfo => {
                const companyId = candidateInfo.company_id
                const title = candidateInfo.title
                if (isAtSimilarCompany(companyId) && hasSameTitle(title) && type === "combined") {
                    return candidateScore(candidateInfo, type)
                } else if (isAtSimilarCompany(companyId) && hasSameTitle(title) && type === "communication") {
                    return candidateScore(candidateInfo, type)
                } else if (isAtSimilarCompany(companyId) && hasSameTitle(title) && type === "coding") {
                    return candidateScore(candidateInfo, type)
                }
            }).filter(score => score !== undefined).sort((a, b) => a - b)
        )
            
    };

    // Percentile = (number of values below score) ÷ (total number of scores) x 100
    // dynamic function that returns percentile. 
    // The type arrayOfScores input should be an array of numbers and the type input should be a string of one of the following: combined, coding, communication depending on which type of score you want to return
    const percentile = (arrayOfScores, type) => {
        const numOfValuesBelowScore = arrayOfScores.indexOf(candidateScore(candidate, type)) - 1;
        const totalNumOfScores = arrayOfScores.length;
        return (numOfValuesBelowScore / totalNumOfScores) * 100;
    };

    // // combined scores is an array of each matching candidates communication score + coding score
    const combinedScores = candidatesScores("combined");
    
    // // coding scores is an array of each matching candidates coding score
    const codingScores = candidatesScores("coding");
    
    // // communication scores is an array of each matching candidates communication score
    const communicationScores = candidatesScores("communication");

    const combinedPercentile = percentile(combinedScores, "combined")

    const codingPercentile = percentile(codingScores, "coding")

    const communicationPercentile = percentile(communicationScores, "communication")
    
    return (
        { 
            codingPercentile: {codingPercentile},
            communicationPercentile: {communicationPercentile}
        }
    )
}
