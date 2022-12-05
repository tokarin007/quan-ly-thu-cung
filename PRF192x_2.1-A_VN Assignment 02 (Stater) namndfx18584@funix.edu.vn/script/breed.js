"use strict";

const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const btnSubmit = document.getElementById("submit-btn");
const tableBodyEl = document.getElementById("tbody");

// hien thi danh sach
renderTableBreed(breedArr);

// bat dau su kien an nut submit
btnSubmit.addEventListener("click", function () {
  const data = {
    breed: breedInput.value,
    type: typeInput.value,
  };
  // validate lay du lieu
  const isValidate = validate(data);

  if (isValidate) {
    // them vao du lieu mang cac breed
    breedArr.push(data);
    // luu du lieu lai
    saveToStorage("breedArr", breedArr);

    // hien thi lai bang thong tin cac breed
    renderTableBreed(breedArr);
    // xoa thong tin tu form nhap
    deleteForm();
  }
});

function validate(data) {
  let isValidate = true;
  // neu nhap cao 1 chuoi trong hoac 1 chuoi toan khoang tang thi bao loi
  if (breedInput.value.trim().length === 0) {
    alert("please input for breed !");
    isValidate = false;
  }

  // bat loi phai chon type
  if (data.type === "Select Type") {
    alert("please select type!");
    isValidate = false;
  }

  return isValidate;
}

// ham xoa thong tin form
function deleteForm() {
  breedInput.value = "";
  typeInput.value = "Select Type";
}
// ham hien thi thong tin cac breed len bang
function renderTableBreed() {
  tableBodyEl.innerHTML = "";
  // cu moi lai breed ta se them 1 dong row suw lieu vao bang
  breedArr.forEach(function (breedItem, index) {
    const row = document.createElement("tr");
    row.innerHTML = `
  <td scope="col">${index + 1}</td>
  <td scope="col">${breedItem.breed}</td>
  <td scope="col">${breedItem.type}</td>
  <td>
  <button type="button" onclick = "deleteBreed('${
    breedItem.breed
  }')" class="btn btn-danger">delete</button> </td>`;

    tableBodyEl.appendChild(row);
  });
}

// ham xoa cac breed
function deleteBreed(breed) {
  // xac nhan xoa
  const isDeleted = confirm("Are you sure ");

  if (isDeleted) {
    // thuc hien buoc xoa o trong nay
    for (let i = 0; i < breedArr.length; i++) {
      if (breed === breedArr[i].breed) {
        // xoa khoi mang
        breedArr.splice(i, 1);
        // cap nhap lai du lieu duoi local storage
        saveToStorage("breedArr", breedArr);
        // goi lai ham hien thi
        renderTableBreed(breedArr);
        break;
      }
    }
  }
}
