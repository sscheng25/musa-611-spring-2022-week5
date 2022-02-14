import csv
import json
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent.resolve()

rawpath = SCRIPT_DIR.parent / 'raw' / '2021-2022 Master School List (20211105).csv'
outpath = SCRIPT_DIR.parent / 'schools.js'

with open(rawpath, 'r', encoding='utf-8-sig') as infile:
    reader = csv.DictReader(infile)
    data = list(reader)

with open(outpath, 'w') as outfile:
    outfile.write(f'const schools = {json.dumps(data, indent=1)};')
