"use strict";
// thêm được animation khi click vào sidebar
const navE1 = document.getElementById("sidebar");
navE1.addEventListener("click", function () {
  this.classList.toggle("active");
});
// dữ liệu data cho sẳn mặc đinh
const data1 = {
  id: "P001",
  name: "Tom",
  age: 3,
  type: "Cat",
  weight: 5,
  length: 50,
  color: "#000",
  breed: "Tabby",
  vaccinated: true,
  dewormed: true,
  sterilized: true,
  date: new Date(2022, 2, 1),
};
const data2 = {
  id: "P002",
  name: "Tyke",
  age: 5,
  type: "Dog",
  weight: 3,
  length: 40,
  color: "#000",
  breed: "Mixed Breed",
  vaccinated: false,
  dewormed: false,
  sterilized: false,
  date: new Date(2022, 2, 1),
};

// dữ liệu breed cho sản để test
const breed1 = {
  breed: "Mixed Breed",
  type: "Dog",
};
const breed2 = {
  breed: "Mixed Breed",
  type: "Cat",
};
const breed3 = {
  breed: "chó phú quốc ",
  type: "Dog",
};
const breed4 = {
  breed: "mèo mướp ",
  type: "Cat",
};
// lấy dữ liệu petArr
if (!getFromStorage("petArr")) {
  // gắn dữ liệu test
  saveToStorage("petArr", [data1, data2]);
}

const petArr = getFromStorage("petArr");

// // lấy dữ liệu breedArr
if (!getFromStorage("breedArr")) {
  //   // gắn dữ liệu test
  saveToStorage("breedArr", [breed1, breed2, breed3, breed4]);
}

const breedArr = getFromStorage("breedArr");

// hàm lấy dữ liệu
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// ham lưu dữ liệu
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
