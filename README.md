# simple-fractal-recruiting

# install npx if you dont already have it
- start json server using npx json-server --watch db.json --port 8000
- run npm start in your server to see app
- have fun!

# Enter 
# Objective
We want to create an app for benchmarking an engineer's coding and communication skills against other engineers that work at similar companies and with the same title (e.g. Junior Engineer)

# Instructions
1. Write a function that takes a candidate_id and returns their percentile for their coding and communication score compared to other candidates at the same title and at similar companies.
2. Write a React app that allows a user to enter their candidate id and see their percentiles.
3. Please add automated tests as you see fit.
4. You must include a README with instructions to run your app.

# Data
- `score-records.csv` contains the coding and communication scores for all of the users in our sample dataset (https://s3.amazonaws.com/simple-fractal-recruiting/score-records.csv)
- `companies.csv` contains the list of firms along with their `fractal_index` (https://s3.amazonaws.com/simple-fractal-recruiting/companies.csv)

# Definitions
- communication_score: a measurement of the candidate's ability to communicate
- coding_score: a measurement of the candidate's technical ability
- title: the role that the candidate performs at their company, e.g. Senior Engineer
- similar companies: A similar company is any company who's absolute difference of fractal_index is less than .15. A company is similar to itself.

# Formulas
```python
import math
def are_similar(company_1, company_2):
    return math.fabs(company_1["fractal_index"] - company_2["fractal_index"]) < 0.15
```

# How Long Should This Take?
Based on our experience, this should take less than 4 hours.