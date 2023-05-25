"use strict";
const parkTableBody = document.querySelector("#parks-tbl-body");
const locationDDL = document.querySelector("#locationDropDownList");
const parkTypesDDL = document.querySelector("#parkTypesDropDownList");
const tableCaption = document.querySelector("#table-caption");

function buildTableRow(tbody, park) {
  let row = tbody.insertRow(-1);

  let cell1 = row.insertCell(0);
  cell1.innerText = park.LocationName;

  let cell2 = row.insertCell(1);
  cell2.innerText = park.Address;

  let cell3 = row.insertCell(2);
  cell3.innerText = park.City;

  let cell4 = row.insertCell(3);
  cell4.innerText = park.State;

  let cell5 = row.insertCell(4);
  cell5.innerText = park.ZipCode;

  let cell6 = row.insertCell(5);
  cell6.innerText = park.Phone;

  let cell7 = row.insertCell(6);
  cell7.innerHTML = `<a href="${park.Visit}" target="_blank">Visit Page</a>`;
}

function loadParksInTableByState() {
  clearTheTable();
  let myChoiceByStateDDL = locationDDL.value;
  let filteredParks = filterParksByState(myChoiceByStateDDL);

  for (const park of filteredParks) {
    buildTableRow(parkTableBody, park);
  }
  tableCaption.innerText = `Displaying ${filteredParks.length}`;
}

function loadParksInTableByTypes() {
  clearTheTable();
  let myChoiceByTypeDDL = parkTypesDDL.value;
  let filteredList = filterParksByTypes(myChoiceByTypeDDL);

  for (const park of filteredList) {
    buildTableRow(parkTableBody, park);
  }
  tableCaption.innerText = `Displaying ${filteredList.length}`;
}

function checkBtn() {
  let selectPark = document.querySelector("input[name='buttonChoice']:checked").value;
  if (selectPark == 1) {
    loadStateDDL();
    locationDDL.style.display = "block";
    parkTypesDDL.style.display = "none";
  }
  if (selectPark == 2) {
    loadParkTypesDDL();
    parkTypesDDL.style.display = "block";
    locationDDL.style.display = "none";
  }
}

function loadStateDDL() {
  for (const state of locationsArray) {
    let option = new Option(state, state);

    locationDDL.appendChild(option);
  }
}

function loadParkTypesDDL() {
  for (const park of parkTypesArray) {
    let option = new Option(park, park);

    parkTypesDDL.appendChild(option);
  }
}

loadParkTypesDDL();
loadStateDDL();

function filterParksByState(state) {
  return nationalParksArray.filter(function (park) {
    return park.State == state;
  });
}

function filterParksByTypes(parkTypes) {
  return nationalParksArray.filter(function (park) {
    return park.LocationName.includes(parkTypes);
  });
}

function clearTheTable() {
  parkTableBody.innerHTML = "";
}
