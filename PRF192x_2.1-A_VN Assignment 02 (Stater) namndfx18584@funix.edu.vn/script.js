"use strict";
// Bắt sự kiện Click vào nút "Submit"
const submitBtn = document.getElementById("submit-btn");
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
let deleteElList = document.querySelectorAll(".btn.btn-danger");
const healthyBtn = document.getElementById("healthy-btn");

// 5. Hiển thị danh sách thú cưng
// let petArr = [];

// const data1 = {
//   id: "P001",
//   name: "Tom",
//   age: 3,
//   type: "Cat",
//   weight: 5,
//   length: 50,
//   color: "red",
//   breed: "Tabby",
//   vaccinated: true,
//   dewormed: true,
//   sterilized: true,
//   date: new Date(2022, 2, 1),
// };
// const data2 = {
//   id: "P002",
//   name: "Tyke",
//   age: 5,
//   type: "Dog",
//   weight: 3,
//   length: 40,
//   color: "green",
//   breed: "Mixed Breed",
//   vaccinated: false,
//   dewormed: false,
//   sterilized: false,
//   date: new Date(2022, 2, 1),
// };
// petArr.push(data1);
// petArr.push(data2);

renderTableData(petArr);
// bắt sự kiện khi ân chọn vào typeinput hien thi giong theo dung loai Dog - Cat
typeInput.addEventListener("click", renderBreed);
//ham hien thi cac loai giong
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
//1. Bắt sự kiện Click vào nút "Submit"
submitBtn.addEventListener("click", function (e) {
  // 2. Lấy được dữ liệu từ các Input Form
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
    date: new Date(),
  };
  // 3. Validate dữ liệu hợp lệ
  const isValidate = validate(data);

  if (isValidate) {
    petArr.push(data);

    saveToStorage("petArr", petArr);

    renderTableData(petArr);

    deleteForm();
  }
});

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
         <td> <button  onclick="deletePet('${
           pet.id
         }')" type="button" class="btn btn-danger">Delete</button> </td>
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
// 6. Xóa các dữ liệu vừa nhập trên Form
function deleteForm() {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}
function deletePet(petId) {
  const isDeleted = confirm("Are you sure?");
  if (isDeleted) {
    //thực hiện xóa
    for (let i = 0; i < petArr.length; i++) {
      if (petId === petArr[i].id) {
        // xóa khỏi mảng
        petArr.splice(i, 1);
        // cap  nhap lai du lieu duoi local storage
        saveToStorage("petArr", petArr);
        // gọi hàm hiển thị
        renderTableData(petArr);
        break;
      }
    }
  }
}

function validate(data) {
  let isValidate = true;

  //  data.id là 1 string " ABC " ===> "ABC"
  if (data.id.trim() === "") {
    alert("không được để trống trường ID !");
    isValidate = false;
  }

  if (data.name.trim() === "") {
    alert("không được để trông trường name !");
    isValidate = false;
  }

  if (isNaN(data.age)) {
    alert("không được để trông trường age !");
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
  // kiểm tra ID có phải duy nhất hay không ?
  /// duyệt qua cái mảng petarr của chúng ta sau ... kiểm tra

  for (let i = 0; i < petArr.length; i++) {
    if (data.id === petArr[i].id) {
      alert("ID must unique!");
      isValidate = false;
      break;
      //         return false;
    }
  }
  if (data.age < 1 || data.age > 15) {
    alert("Age must be between 1 and 15!");
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
  if (data.type === "Select Type") {
    alert("Please select Type!");
    isValidate = false;
  }
  if (data.breed === "Select Breed") {
    alert("Please select Breed!");
    isValidate = false;
  }

  return isValidate;
}

// Hiển thị các thú cưng khỏe mạnh

let healthycheck = true;

healthyBtn.addEventListener("click", function () {
  if (healthycheck === true) {
    const healthyPetArr = [];
    // loc mang pet

    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].vaccinated && petArr[i].dewormed && petArr[i].sterilized) {
        healthyPetArr.push(petArr[i]);
      }
    }
    renderTableData(healthyPetArr);
    healthyBtn.textContent = "Show all pet";
    healthycheck = false;
  } else {
    renderTableData(petArr);
    healthyBtn.textContent = "Show healthy pet";
    healthycheck = true;
  }
});
