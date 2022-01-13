import { useEffect, useState } from 'react'
import CombinedPercentile from '../functions/CombinedPercentile';
import PercentileCalculator from '../functions/PercentileCalculater'

export default function ResultsContainer({ candidateInfo, scoreRecords, companies }) {

    const [percentileResults, setPercentileResults] = useState({})
   
    useEffect(() => {
        setPercentileResults(PercentileCalculator(candidateInfo, scoreRecords, companies));
    }, [])

    const displayPercentiles = () => {

        // const percentiles = Object.keys(percentileResults)
        console.log(CombinedPercentile(candidateInfo, scoreRecords, companies))
        // return percentiles.map(key => {
        //     return <h2 key={key}>{percentiles[key]}</h2>
        // } 
        // )
        // if (percentileResults) {
        //     return (
        //         <section>
        //             <h4>Combined Percentile: {percentileResults.combinedPercentile.combinedPercentile}</h4>
        //             {/* <h4>Coding Percentile: {percentileResults.codingPercentile.codingPercentile}</h4> */}
        //         </section>
        //     )
        // }
    // }
    }

    return (
        <div>
            <h2>Results Container</h2>
            {displayPercentiles()}
            {/* <h4>Communication Percentile: {percentileResults.comunicationPercentile.communicationPercentile}</h4> */}
        </div>
    )
}
