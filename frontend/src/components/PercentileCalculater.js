// function returns object of candidate percentiles. Candidate percentiles 

export default function PercentileCalculator(candidateInfo, scoreRecords, companies) {
    
    // returns candidate company details from search, using candidate id
    const candidateCompany = companies.filter(company => company.company_id === candidateInfo.company_id)[0]

    // returns array of company ids where each company fractal index is < 0.15 difference
    // from the searched candidate's company's fractal index
    // this is a helper function for isAtSimilarCompany
    const similarCompaniesIds = () => {
        const candidateCompanyFractal = candidateCompany().fractal_index
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
        return candidateTitle === candidateInfo.title
    };

    //  dynamic function that returns one of the following: candidate's combined score (coding_score + communication_score), coding_score only, or communication_score only. The candidate input should be an object with key values of coding_score & communication_score. The type input should be a string of one of the following: combined, coding, communication depending on which type of score you want to return
    const candidateScore = (candidate, type) => {
        if (type === "combined") {
            return (candidate.communication_score + candidate.coding_score)
        } else if (type === "communication") {
            return candidate.communication_score
        } else if (type === "coding") {
            return candidate.coding_score
        }
    };

    // dynamic function that returns an array of scores based on type. The type input should be a string of one of the following: combined, coding, communication depending on which type of score you want to return.
    const candidatesScores = (type) => {
        return (
            scoreRecords.map(candidate => {
                const companyId = candidate.company_id
                const title = candidate.title
                if (isAtSimilarCompany(companyId) && hasSameTitle(title) && type === "combined") {
                    return candidateScore(candidate, type)
                } else if (isAtSimilarCompany(companyId) && hasSameTitle(title) && type === "communication") {
                    return candidateScore(candidate, type)
                } else if (isAtSimilarCompany(companyId) && hasSameTitle(title) && type === "coding") {
                    return candidateScore(candidate, type)
                }
            }).filter(score => score !== undefined).sort((a, b) => a - b)
        )
    };

    // Percentile = (number of values below score) ÷ (total number of scores) x 100
    // dynamic function that returns percentile. 
    // The type arrayOfScores input should be an array of numbers and the type input should be a string of one of the following: combined, coding, communication depending on which type of score you want to return
    const percentile = (arrayOfScores, type) => {
        const numOfValuesBelowScore = arrayOfScores.indexOf(candidateScore(candidateInfo, type)) - 1;
        const totalNumOfScores = arrayOfScores.length;
        return (numOfValuesBelowScore / totalNumOfScores) * 100;
    };

    // combined scores is an array of each matching candidates communication score + coding score
    const combinedScores = candidatesScores("combined");
    
    // coding scores is an array of each matching candidates coding score
    const codingScores = candidatesScores("coding");
    
    // communication scores is an array of each matching candidates communication score
    const communicationScores = candidatesScores("communication");

    const combinedPercentile = percentile(combinedScores, "combined")

    const codingPercentile = percentile(codingScores, "coding")

    const communicationPercentile = percentile(communicationScores, "communication")

    return (
        {
            "combinedPercentile": {combinedPercentile},
            "codingPercentile": {codingPercentile},
            "communicationPercentile": {communicationPercentile}

        }
    )
}
