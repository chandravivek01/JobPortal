// Fetching the JSON data into Javascript Object
import dataset from './Data.json' assert {type: 'json'};
let { resume: originalData  } = dataset;
let data = originalData;

// DOM (Menu Bar)
const previous = document.getElementById('previous');
const search = document.getElementById('search');
const next = document.getElementById('next');

const noSearchResult = document.getElementById('no-search-result');
const resultSearched = document.getElementById('resultList');
const intro = document.getElementById('id');

// DOM (Aside Section)
const infoList = document.getElementById('info-list');
const skillList = document.getElementById('skill-list');
const hobbyList = document.getElementById('hobby-list');

// DOM (Work)
const workList = document.getElementById('work');

// DOM (Projects)
const projectList = document.getElementById('project-bold');
const projectList2 = document.getElementById('project-description');

// DOM (Education)
const educationList = document.getElementById('education');

// DOM (Internship)
const internshipList = document.getElementById('internship');

// DOM (Achievements)
const achieve = document.getElementById('achievements');

// DOM (Resume Header)
const employeeName = document.getElementById('employee-name');
const appliedFor = document.getElementById('applied-for');

// Index of the Employee-Array-Record
let employeeIndex = 0;
let searched = false;

window.onbeforeunload = function (event) {

    // Display the confirmation dialog
    const confirmationMessage = 'Are you sure you want to leave?';
    return confirmationMessage; 
};

function searchItems() {

    searched = true;
    const searchTerm = document.getElementById('search').value.toLowerCase();

    console.log('searchTermLength: ', searchTerm.length);

    let filteredData = data.filter(itemObject => itemObject.basics.AppliedFor.toLowerCase().includes(searchTerm));

    if (searchTerm.length===0) {

        data = originalData;
        filteredData = data;
        employeeIndex = 0;
    }   

    console.log('filtered ',filteredData);
    loadResumeWithSearch(filteredData);
}

function loadResumeWithSearch(filteredData) {

    if (filteredData.length == 0){

        resultSearched.style.display = 'none';
        noSearchResult.style.display = 'block';
        previous.style.display = 'none';
        next.style.display = 'none';
    }

    else if (filteredData.length == 1) {
        
        resultSearched.style.display = 'block';
        noSearchResult.style.display = 'none';
        previous.style.display = 'none';
        next.style.display = 'none';
        loadResume(filteredData);
    }
    else {

        resultSearched.style.display = 'block';
        noSearchResult.style.display = 'none';
        toggleButtons();
        loadResume(filteredData);
    }
        
}

function toggleButtons() {
    if (employeeIndex === 0) {
      previous.style.display = 'none'; // Hide previous button if at the beginning
    } 
    else {
      previous.style.display = 'block'; // Show previous button otherwise
    }
  
    if (employeeIndex === data.length - 1) {
      next.style.display = 'none'; // Hide next button if at the end
    } 
    else {
      next.style.display = 'block'; // Show next button otherwise
    }
}

function nextResume() {

    console.log('employeeIndex: ', employeeIndex)
    if (employeeIndex < data.length-1) {

        employeeIndex++;
        toggleButtons();
        loadResume(data);
    }    
}

function previousResume() {

    if (employeeIndex >0) {

        employeeIndex--;
        toggleButtons();
        loadResume(data);
    }
}

function createList(entry) {

    let li = document.createElement('li');
    li.textContent = entry;
    return li;
}

function createListHTML(entry) {

    let li = document.createElement('li');
    li.innerHTML = entry;
    return li;
}

function loadResume(searchedData) {

    if (searchedData===undefined)
        noSearchResult.style.display = 'none';
    
    if (searched)
        data = searchedData;

    console.log('data : ', data);
    // Employee Introduction Header
    employeeName.innerText = data[employeeIndex].basics.name;
    appliedFor.innerText = data[employeeIndex].basics.AppliedFor;

    // Personal information
    loadPersonalInfo();

    // Technical Skills
    loadTechnicalSkills();

    // Hobbies
    loadHobbies();

    // Work in a previous company
    loadWork();
    
    // Projects
    loadProject();
    
    // Education
    loadEducation();

    // Internship
    loadInternship();

    // Achievements
    let {Summary: achievementSummary} = data[employeeIndex].achievements;
    achieve.innerHTML = '';
    achievementSummary.forEach(element => achieve.appendChild(createList(element)));
}

function loadPersonalInfo() {

    // Destructuring the relevant Object
    let { phone, email } = data[employeeIndex].basics;
    let network = data[employeeIndex].basics.profiles.network;

    let infoLiteral = `${phone}
                        ${email}
                        ${network}`;
    infoList.innerText = infoLiteral;
}

function loadTechnicalSkills() {

    let skillArray = data[employeeIndex].skills.keywords;
    skillList.innerHTML = '';
    skillArray.forEach(element => skillList.appendChild(createList(element)));
    skillList.style.listStyleType = 'none';
}

function loadHobbies() {

    let hobbyArray = data[employeeIndex].interests.hobbies;
    hobbyList.innerHTML = '';
    hobbyArray.forEach(element => hobbyList.appendChild(createList(element)));
    hobbyList.style.listStyleType = 'none';
}

function loadWork() {

    // Destructuring the relevant Object
    // let { "Company Name": companyName, Position: position, "Start Date": startDate, "End Date": endDate, Summary: summary } = data[employeeIndex].work;

    // let workLiteral = `${'<b>Company Name:</b>'} ${companyName} ${'<br>'}${'<br>'} 
    //                     ${'<b>Positon:</b>'} ${position} ${'<br>'}${'<br>'} 
    //                     ${'<b>Start Date:</b>'} ${startDate} ${'<br>'}${'<br>'}  
    //                     ${'<b>End Date:</b>'} ${endDate} ${'<br>'}${'<br>'}  
    //                     ${'<b>Summary:</b>'} ${summary}`;
    // workList.innerHTML = workLiteral;
    // workList.style.padding = '20px';

    let workArray = Object.keys(data[employeeIndex].work);
    let list = [];
    workList.innerHTML = '';
    workArray.forEach(item => {
        let value = data[employeeIndex].work[item];
        let lineLiteral = `${'<b>' + item + ': ' + '</b>'} ${value}`;
        list.push(lineLiteral);
    });
    list.forEach(element => workList.appendChild(createListHTML(element)));
    workList.style.listStyleType = 'none';
    workList.style.padding = '20px';
}

function loadProject() {

    // Destructuring the relevant Object
    let { name: projectName, description } = data[employeeIndex].projects;

    let projectLiteral = `${projectName}: `;
    projectList.innerHTML = projectLiteral;
    projectList2.innerHTML = description;
}

function loadEducation() {

    let educationArray = Object.keys(data[employeeIndex].education);
    let list = [];
    educationList.innerHTML = '';
    educationArray.forEach(item => {
        
        let lineCSV='';
        let property = Object.keys(data[employeeIndex].education[item]);
        property.forEach(element => lineCSV += data[employeeIndex].education[item][element] + ', ');
        let line = lineCSV.substring(0, lineCSV.length-2);
        let lineLiteral = `${'<b>' + item + ': ' + '</b>'} ${line}`;
        list.push(lineLiteral);
    });
    list.forEach(element => educationList.appendChild(createListHTML(element)));
    educationList.style.padding = '20px';
}

function loadInternship() {

    // Destructuring the relevant Object
    // let { "Company Name": companyNameIntern, Position: positionIntern, "Start Date": startIntern, "End Date": endIntern, Summary: summaryIntern } = data[employeeIndex].Internship;

    // let internLiteral = `\u2022 ${'<b>Company Name:</b>'} ${companyNameIntern} ${'<br>'}
    //                     \u2022 ${'<b>Positon:</b>'} ${positionIntern} ${'<br>'} 
    //                     \u2022 ${'<b>Start Date:</b>'} ${startIntern} ${'<br>'} 
    //                     \u2022 ${'<b>End Date:</b>'} ${endIntern} ${'<br>'}
    //                     \u2022 ${'<b>Summary:</b>'} ${summaryIntern}`;
    // internshipList.innerHTML = internLiteral;
    // internshipList.style.padding = '20px';

    let internshipArray = Object.keys(data[employeeIndex].Internship);
    let list = [];
    internshipList.innerHTML = '';
    internshipArray.forEach(item => {
        
        let value = data[employeeIndex].Internship[item];
        let lineLiteral = `${'<b>' + item + ': ' + '</b>'} ${value}`;
        list.push(lineLiteral);
    });
    list.forEach(element => internshipList.appendChild(createListHTML(element)));
    internshipList.style.padding = '20px';
}

toggleButtons();

loadResume();

previous.addEventListener('click', previousResume);
search.addEventListener('keyup', searchItems);
next.addEventListener('click', nextResume);

