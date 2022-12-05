"use strict";

const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const tableBodyEl = document.getElementById("tbody");
const formEl = document.getElementById("container-form");
const submitBtn = document.getElementById("submit-btn");

// hien thi du cac thu cung vao bang
renderTableData(petArr);

//ham hien thi du lieu thu cung vao bang

function renderTableData(petArr) {
  // xoa noi dung hien co cua bang
  tableBodyEl.innerHTML = "";

  // voi moi thu cung co trong day petArr tao 1 hang chua du lieu

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
      } "></i></td>     <td><i class="bi ${
      pet.sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"
    } "></i></td>     
        <td> 
        ${displayTime(pet.date).slice(8, 10)}
        /${displayTime(pet.date).slice(5, 7)}
        / ${displayTime(pet.date).slice(0, 4)}
        </td>
      <td><button onclick = "editPet('${
        pet.id
      }')" type="button" style="background-color: #ffc107; color:#000;" class="btn btn-default">Edit</button></td>`;

    tableBodyEl.appendChild(row);
  });

  // // bat su kien edit
  // editEvent();
}

// ham hien thi thoi gian
function displayTime(date) {
  if (typeof date === "string") {
    return date;
  } else if (typeof date === "object") {
    return JSON.parse(JSON.stringify(date));
  }
}
// ham su ly nguoi dung nhan vao nut edit
// function editEvent() {
//   const editElList = document.querySelectorAll(".btn.btn-danger");
//   editElList.forEach((editEl) => {
//     // su kien click vao nut edit
//     editEl.addEventListener("click", function () {
//       // lay id cua thu cung duoc edit
//       const id = editEl.parentElement.parentElement.children[0].innerHTML;
//       editPet(id);
//     });
//   });
// }

// ham chinh sua du lieu thong tin thu cung
function editPet(id) {
  // hien lai from nhap du lieu
  formEl.classList.remove("hide");

  // timf den du lieu cua thu cung can edit
  const pet = petArr.find((petItem) => petItem.id === id);

  // hien thi nhung thong tin cua thu cung len from nhap
  idInput.value = id;
  nameInput.value = pet.name;
  ageInput.value = pet.age;
  typeInput.value = pet.type;
  weightInput.value = pet.weight;
  lengthInput.value = pet.length;
  colorInput.value = pet.color;
  vaccinatedInput.checked = pet.vaccinated;
  dewormedInput.checked = pet.dewormed;
  sterilizedInput.checked = pet.sterilized;

  // de hien thi dung cac loai giopng cho tung loai dog cat
  renderBreed();
  // hien thi du lieu loai giong thu cung
  breedInput.value = `${pet.breed}`;
}
// su kien nhan chuot vao typeinput > sau do hien thi cac loai giong dung voi tung loai dog cat
typeInput.addEventListener("click", renderBreed);

// ham hien thi giong thu cung theo tung liau (dog cat )
function renderBreed() {
  breedInput.innerHTML = "<option>Select Breed</option>";

  const breedDogs = breedArr.filter((breedItem) => breedItem.type == "Dog");
  const breedCats = breedArr.filter((breedItem) => breedItem.type == "Cat");
  // nếu type là Dog
  if (typeInput.value === "Dog") {
    breedDogs.forEach(function (breedItem) {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.breed}`;
      breedInput.appendChild(option);
    });
  }
  // nếu type là cat
  else if (typeInput.value === "Cat") {
    breedCats.forEach(function (breedItem) {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.breed}`;
      breedInput.appendChild(option);
    });
  }
}

// su kien an vao nut sumit
submitBtn.addEventListener("click", function () {
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value), //dạng số
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    //date: new Date(),
  };
  // validat du lieu hop le
  const isValidate = validate(data);

  if (isValidate) {
    const index = petArr.findIndex((pet) => pet.id === data.id);
    // van giu ngay therm thu cung
    data.date = petArr[index].date;
    // cap nhap lai du lieu thu cung do
    petArr[index] = data;
    saveToStorage("petArr", petArr);
    // an form di
    formEl.classList.add("hide");
    renderTableData(petArr);
  }
});
// valuedata du lieu hop le

function validate(data) {
  let isValidate = true;
  // neu nhap vao 1 chuoi trong hoac 1 chuoi khoang trang thi bao loi
  if (nameInput.value.trim().length === 0) {
    alert("Please enter a name");
    isValidate = false;
  }
  // neu ko phai so hop le
  if (isNaN(data.age)) {
    alert("Please enter a age");
    isValidate = false;
  }
  if (isNaN(data.weight)) {
    alert("không được để trông trường weight !");
    isValidate = false;
  }
  if (isNaN(data.length)) {
    alert("không được để trông trường length !");
    isValidate = false;
  }
  // truong age chi duoc
  if (data.age < 1 || data.age > 15) {
    alert("Age must be between 1 and 15!");
    isValidate = false;
  }
  if (data.type === "Select Type") {
    alert("Please select Type!");
    isValidate = false;
  }
  if (data.weight < 1 || data.weight > 15) {
    alert("Weight must be between 1 and 15!");
    isValidate = false;
  }
  if (data.length < 1 || data.length > 100) {
    alert("Length must be between 1 and 100!");
    isValidate = false;
  }
  if (data.breed === "Select Breed") {
    alert("Please select Breed!");
    isValidate = false;
  }

  return isValidate;
}
