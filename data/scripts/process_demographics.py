import csv
import itertools
import json
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent.resolve()

rawpath = SCRIPT_DIR.parent / 'raw' / '2021-2022 Enrollment & Demographics.csv'
outpath = SCRIPT_DIR.parent / 'demographics'

with open(rawpath, 'r', encoding='utf-8-sig') as infile:
    reader = csv.DictReader(infile)
    data = list(reader)

get_ulcs = lambda record: record['ULCSCode']
data.sort(key=get_ulcs)
for ulcs, records in itertools.groupby(data, key=get_ulcs):
    with open(outpath / f'{ulcs}.json', 'w') as outfile:
        outfile.write(json.dumps(list(records), indent=1))
