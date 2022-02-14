import pandas
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent.resolve()

rawpath = SCRIPT_DIR.parent / 'raw' / 'SPR_SY1819_School_Metric_Scores_20200127.xlsx'
outpath = SCRIPT_DIR.parent / 'scores.js'

df = pandas.read_excel(rawpath, sheet_name='SPR SY2018-2019', usecols=[
    'School', 'ULCS Code', 'Report', 'Rpt Type Long', 'Overall Score',
    'Overall Pts Earn', 'Overall Pts Poss', 'Overall Tier', 'Overall Peer Rank',
    'Overall City Rank'
])

with open(outpath, 'w') as outfile:
    outfile.write(f'const scores = {df.to_json(indent=1, orient="records")};')
