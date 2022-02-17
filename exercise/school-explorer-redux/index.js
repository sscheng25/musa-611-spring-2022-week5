/* global schools */

const schoolMap = L.map('school-map').setView([39.95303901388685, -75.16341794003617], 13);
const schoolLayer = L.layerGroup().addTo(schoolMap);

L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 18,
  ext: 'png',
}).addTo(schoolMap);

const schoolList = document.querySelector('#school-list');
const gradeLevelSelect = document.querySelector('#grade-level-select');
const zipCodeSelect = document.querySelector('#zip-code-select');

/* ====================

# Exercise: School Explorer (redux)

==================== */

let showSchoolInfo = (school, marker) => {
  const dataFilename = `http://localhost:8000/data/demographics/${school['ULCS Code']}.json`
  fetch(dataFilename)
    .then(response => response.json())
    .then(data => {
      const first = data[0];
      const grade = first['GradeLevel'];
      const pctm = first['MalePCT'];
      const pctf = first['FemalePCT'];

      marker.bindPopup(`
        <h3>${school['Publication Name']}</h3>
        <ul>
          <li>Grade: ${grade}</li>
          <li>Percent Male: ${pctm}%</li>
          <li>Percent Female: ${pctf}%</li>
        </ul>`).openPopup();
      
        console.log(`${pctf}%`);
    });

  // marker.bindPopup(`<h3>${school['Publication Name']}</h3>`).openPopup();
};


/* PASTE YOUR WEEK4 EXERCISE CODE HERE */
let updateSchoolMarkers = (schoolsToShow) => {
  schoolLayer.clearLayers();

  schoolsToShow.forEach((school) => {
    const [lat, lng] = school['GPS Location'].split(',').map(l => l.trim());
    const marker = L.marker([lat, lng]).bindTooltip(school['Publication Name']);
    schoolLayer.addLayer(marker);

    marker.addEventListener('click', () => {
      // show a pop-up
      showSchoolInfo(school, marker);
      // console.log('clicked');

    })
  })
  
  
};

let updateSchoolList = (schoolsToShow) => {
  schoolList.innerHTML = '';
  let theSchoolList = [];
  schoolsToShow.forEach((school) => {
    const schoolName = school['Publication Name'];
    theSchoolList = theSchoolList.concat(schoolName);
  });
  theSchoolList.forEach((school) => {
    schoolList.appendChild(htmlToElement(`<li>${school}</li>`));
  });
};

let initializeZipCodeChoices = () => {
  let zipList = [];
  schools.forEach((school) => {
    const schoolZip = school['Zip Code'].substring(0, 5);
    zipList = zipList.concat(schoolZip);
  });
  zipUnique = [...new Set(zipList)].sort();
  zipUnique.forEach((zip) => {
    zipCodeSelect.appendChild(htmlToElement(`<option>${zip}</option>`));
  });
};

let filteredSchools = () => {
  let gradeValue = gradeLevelSelect.value;
  let zipValue = zipCodeSelect.value;
  console.log(zipValue, gradeValue);
  let schoolsToShow = schools.filter((school) =>
    school[`${gradeValue}`] === '1'
  ).filter((school) => 
    school['Zip Code'].substring(0, 5) === zipValue
  );
  schoolsToShow.forEach((school) => {
    console.log(school['School Name (ULCS)']);
  });
  updateSchoolList(schoolsToShow);
  updateSchoolMarkers(schoolsToShow);
};


/*

No need to edit anything below this line ... though feel free.

*/

// The handleSelectChange function is an event listener that will be used to
// update the displayed schools when one of the select filters is changed.
let handleSelectChange = () => {
  const schoolsToShow = filteredSchools() || [];
  //updateSchoolMarkers(schoolsToShow);
  //updateSchoolList(schoolsToShow);
};

gradeLevelSelect.addEventListener('change', handleSelectChange);
zipCodeSelect.addEventListener('change', handleSelectChange);

// The code below will be run when this script first loads. Think of it as the
// initialization step for the web page.
initializeZipCodeChoices();
//updateSchoolMarkers(schools);
//updateSchoolList(schools);
