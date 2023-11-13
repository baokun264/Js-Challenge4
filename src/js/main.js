var btnValue = "";
var btnEdit = "";

var selectElement = "";
const priority = ["To Do", "In Process", "Done"];
const btnAdd = document.querySelector(".btn-add-form");
const btnEditForm = document.querySelector(".btn-edit-form");

let btnHigh = document.querySelector(".btn-high");
let btnMedium = document.querySelector(".btn-medium");
let btnLow = document.querySelector(".btn-low");
let btnHighPriority = document.querySelector(".btn-high-priority");
let btnMediumPriority = document.querySelector(".btn-medium-priority");
let btnLowPriority = document.querySelector(".btn-low-priority");
let listItem = JSON.parse(localStorage.getItem("item")) || [];

let item = {};

let inputValue = document.querySelector(".input-add");
let inputEdit = document.querySelector("#input-edit");
window.onload = (event) => {
  let listItem = JSON.parse(localStorage.getItem("item")) || [];
  listRender(listItem);
};
function btnDisable() {
  if (!btnValue || !inputValue.value) {
    document.querySelector(".btn-add-form").disabled = true;
    btnHigh.classList.remove("high-active");
    btnHighPriority.classList.remove("high-active");
    btnMedium.classList.remove("medium-active");
    btnMediumPriority.classList.remove("medium-active");
    btnLow.classList.remove("low-active");
    btnLowPriority.classList.remove("low-active");
  }
}
function openPopupAdd() {
  document.getElementById("popup-add").style.display = "block";
  document.getElementById("overlay").style.display = "block";
  inputValue.addEventListener("input", inputChange);
  btnDisable();
}
function inputFill(indexToDelete, priority) {
  inputEdit.value = listItem[indexToDelete].value;
  btnEdit = listItem[indexToDelete].value;
  addClass(priority, btnHighPriority, btnMediumPriority, btnLowPriority);
}
function openPopupEdit(event) {
  const listItemElement = event.target.closest(".list");
  selectElement = listItemElement.getAttribute("id");
  const indexToDelete = listItem.findIndex((obj) => obj.id === selectElement);
  inputFill(indexToDelete, listItem[indexToDelete].priority);
  document.getElementById("popup-edit").style.display = "block";
  document.getElementById("overlay").style.display = "block";
  btnEditForm.disabled = false;
  inputEdit.addEventListener("input", inputChange);
}

function openPopupDelete(event) {
  const listItemElement = event.target.closest(".list");
  document.getElementById("popup-delete").style.display = "block";
  document.getElementById("overlay").style.display = "block";
  selectElement = listItemElement.getAttribute("id");
}
function closePopup() {
  document.getElementById("popup-add").style.display = "none";
  document.getElementById("popup-edit").style.display = "none";
  document.getElementById("popup-delete").style.display = "none";
  document.getElementById("overlay").style.display = "none";
  inputValue.value = "";
  btnValue = "";
}
function addClass(value, btnHigh, btnMedium, btnLow) {
  switch (value) {
    case "High":
      btnHigh.classList.add("high-active");
      btnMedium.classList.remove("medium-active");
      btnLow.classList.remove("low-active");
      break;
    case "Medium":
      btnMedium.classList.add("medium-active");
      btnHigh.classList.remove("high-active");
      btnLow.classList.remove("low-active");
      break;
    case "Low":
      btnLow.classList.add("low-active");
      btnHigh.classList.remove("high-active");
      btnMedium.classList.remove("medium-active");
      break;
    default:
  }
}
function getBtnValue(value) {
  let buttonValue = value.value;
  btnValue = buttonValue;
  addClass(buttonValue, btnHigh, btnMedium, btnLow);
  if (
    buttonValue &&
    inputValue.value.trim().length > 0 &&
    inputValue.value.trim().length <= 200
  ) {
    document.querySelector(".btn-add-form").disabled = false;
  }
}
function getBtnValueEdit(value) {
  let buttonEdit = value.value;
  btnEdit = buttonEdit;
  addClass(buttonEdit, btnHighPriority, btnMediumPriority, btnLowPriority);
}
function inputChange(event) {
  const limit = event.target.value.trim().length;
  if (event.target.value.trim() && (btnValue || btnEdit) && limit <= 200) {
    btnAdd.disabled = false;
    btnEditForm.disabled = false;
  } else {
    btnAdd.disabled = true;
    btnEditForm.disabled = true;
  }
}
function listRender(data) {
  let ul = document.querySelector(".list-item");
  ul.innerHTML = "";
  for (let i = 0; i < data?.length; i++) {
    const icon = data[i].status.toLowerCase().replace(/ /g, "-");
    let li = document.createElement("li");
    li.innerHTML = `
      <div class="list" id=${data[i].id} value=${data[i].id}>
        <ul class="list-item ">
          <li class="content">
            <div class="task">
              <p class="title title-task">
                Task
              </p>
              <p class="task-description">
                ${data[i].value}
              </p>
            </div>
            <div class="priority">
              <p class="title title-priority">
                Priority
              </p>
              <p class="important ${data[i].priority}" value="">
                ${data[i].priority}
              </p>
            </div>
            <div class="process">
              <button class="btn-prc" onclick="status(event)"><span class="glyphicon">${data[i].status}</span></button>
            </div>
            <button class="status todo-status">
              <img src="./public/images/icon-${icon}.svg" alt="${icon}" />
            </button>
            <div class="btn-icon">
              <button class="edit" onclick="openPopupEdit(event)">
                <img src="./public/images/edit.svg" alt=" Edit icon " />
              </button>
              <button class="delete" onclick="openPopupDelete(event)">
                <img src="./public/images/delete.svg" alt=" Delete icon" />
              </button>
            </div>
          </li>
        </ul>
      </div>
    `;
    ul.appendChild(li);
  }
}
function newElement(event) {
  const uniqueId = Date.now();
  let li = document.createElement("li");
  li.id = "item_" + uniqueId;

  if (inputValue.value && btnValue && inputValue.value.length <= 200) {
    document.querySelector(".btn-add-form").disabled = false;
    item = {
      id: li.id,
      value: inputValue.value,
      priority: btnValue,
      status: priority[0],
    };
    listItem.push(item);
    localStorage.setItem("item", JSON.stringify(listItem));
    listRender(listItem);
    closePopup();
  } else {
    event.target.disabled = true;
  }
}
function status(event) {
  const listItemElement = event.target.closest(".list");
  selectElement = listItemElement.getAttribute("id");
  const indexToDelete = listItem.findIndex((obj) => obj.id === selectElement);
  switch (listItem[indexToDelete].status) {
    case "To Do":
      listItem[indexToDelete].status = "In Progress";
      localStorage.setItem("item", JSON.stringify(listItem));
      listRender(listItem);
      break;
    case "In Progress":
      listItem[indexToDelete].status = "Done";
      localStorage.setItem("item", JSON.stringify(listItem));
      listRender(listItem);
      break;
    case "Done":
      listItem[indexToDelete].status = "To Do";
      localStorage.setItem("item", JSON.stringify(listItem));
      listRender(listItem);
      break;
  }
}

function deleteItem(event) {
  const element = document.getElementById(`${selectElement}`);
  element.remove();
  closePopup();
  const indexToDelete = listItem.findIndex((obj) => obj.id === selectElement);

  if (indexToDelete !== -1) {
    listItem.splice(indexToDelete, 1);
    localStorage.setItem("item", JSON.stringify(listItem));
  }
  return;
}
function editItem(event) {
  const indexToDelete = listItem.findIndex((obj) => obj.id === selectElement);
  if (inputEdit.value.trim()) {
    if (indexToDelete !== -1) {
      listItem[indexToDelete].value = inputEdit.value;
      if (btnEdit) {
        listItem[indexToDelete].priority = btnEdit;
      } else {
        listItem[indexToDelete].priority = listItem[indexToDelete].priority;
      }
      localStorage.setItem("item", JSON.stringify(listItem));
      listRender(listItem);
      closePopup();
    }
  } else {
    listItem[indexToDelete].value = listItem[indexToDelete].value;
    if (btnEdit) {
      listItem[indexToDelete].priority = btnEdit;
    } else {
      listItem[indexToDelete].priority = listItem[indexToDelete].priority;
    }
    localStorage.setItem("item", JSON.stringify(listItem));
    listRender(listItem);
    closePopup();
  }
  return;
}
