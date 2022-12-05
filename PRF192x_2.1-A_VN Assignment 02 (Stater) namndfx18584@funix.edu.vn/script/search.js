"use strict";
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const findBtn = document.getElementById("find-btn");
const tableBodyEl = document.getElementById("tbody");
const formE1 = document.getElementById("container-form");
// bat dau vao : se hien thi toan bo du lieu cac thu cung
renderTableData(petArr);
// bat day su kien an nut find
findBtn.addEventListener("click", function () {
  let petArrFind = petArr;

  if (idInput.value) {
    petArrFind = petArrFind.filter((pet) => pet.id.includes(idInput.value));
  }
  // neu nhap vao name thi tim theo name
  if (nameInput.value) {
    petArrFind = petArrFind.filter((pet) => pet.name.includes(nameInput.value));
  }
  // neu chon type thi tim theo type
  if (typeInput.value !== "Select Type") {
    petArrFind = petArrFind.filter((pet) => pet.type === typeInput.value);
  }
  // neu chon theo breed thi tim theo breed
  if (breedInput.value !== "Select Breed") {
    petArrFind = petArrFind.filter((pet) => pet.breed === breedInput.value);
  }
  // neu tich chon vaccinatedinput
  if (vaccinatedInput.checked === true) {
    petArrFind = petArrFind.filter((pet) => pet.vaccinated === true);
  }
  // neu tich chon dewormedInput
  if (dewormedInput.checked === true) {
    petArrFind = petArrFind.filter((pet) => pet.dewormed === true);
  }
  // neu tich chon sterilizedinput
  if (sterilizedInput.checked === true) {
    petArrFind = petArrFind.filter((pet) => pet.sterilized === true);
  }
  // hien thi cac thu cung thoa dieu kien tim
  renderTableData(petArrFind);
});

// ham hien thi danh sach thu cung
function renderTableData(petArr) {
  tableBodyEl.innerHTML = "";
  // for (let i = 0; i < petArr.length; i++)
  petArr.forEach((pet) => {
    const row = document.createElement("tr");
    row.innerHTML = `
  <th scope="row">${pet.id}</th>
      <td>${pet.name}</td>
      <td>${pet.age}</td>
      <td>${pet.type}</td>
      <td>${pet.weight} kg </td>
      <td>${pet.length} cm </td>
      <td>${pet.breed}</td>
      <td><i class="bi bi-square-fill" style="color: ${pet.color}"></i></td>
      <td><i class="bi ${
        pet.vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill" // true gắn tíchbi-check-circle-fill , faste gắnbi-x-circle-fill
      } "></i></td>
      <td><i class="bi ${
        pet.dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"
      } "></i></td>     
      <td><i class="bi ${
        pet.sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"
      } "></i></td>     
        <td> 
        ${displayTime(pet.date).slice(8, 10)}
        /${displayTime(pet.date).slice(5, 7)}
        / ${displayTime(pet.date).slice(0, 4)}
        </td>
     `;
    tableBodyEl.appendChild(row);
  });
}
// ham hien thi thoi gian
function displayTime(date) {
  if (typeof date === "string") {
    return date;
  } else if (typeof date === "object") {
    return JSON.parse(JSON.stringify(date));
  }
}
// hien thi cac loai giong breed
renderBreed();
function renderBreed() {
  breedArr.forEach(function (breedItem) {
    const option = document.createElement("option");
    option.innerHTML = `${breedItem.breed}`;
    breedInput.appendChild(option);
  });
}
