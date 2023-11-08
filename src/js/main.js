var btnValue = "";
var btnEdit = "";

var selectElement = "";
const priority = ["To Do", "In Process", "Done"];
let listItem = JSON.parse(localStorage.getItem("item")) || [];
let item = {};

let inputValue = document.querySelector(".input-add");
let inputEdit = document.querySelector(".input-edit");

function openPopupAdd() {
  document.getElementById("popup-add").style.display = "block";
  document.getElementById("overlay").style.display = "block";
}
function openPopupEdit(event) {
  const listItemElement = event.target.closest(".list");
  document.getElementById("popup-edit").style.display = "block";
  document.getElementById("overlay").style.display = "block";
  selectElement = listItemElement.getAttribute("id");
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
  inputEdit.value = "";
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
      alert("Please select a priority");
  }
}
function getBtnValue(value) {
  let buttonValue = value.value;
  let btnHigh = document.querySelector(".btn-high");
  let btnMedium = document.querySelector(".btn-medium");
  let btnLow = document.querySelector(".btn-low");
  btnValue = buttonValue;
  addClass(buttonValue, btnHigh, btnMedium, btnLow);
  if (buttonValue) {
    document.querySelector(".btn-add-form").disabled = false;
  }
}
function getBtnValueEdit(value) {
  let buttonEdit = value.value;
  let btnHigh = document.querySelector(".btn-high-priority");
  let btnMedium = document.querySelector(".btn-medium-priority");
  let btnLow = document.querySelector(".btn-low-priority");
  btnEdit = buttonEdit;
  addClass(buttonEdit, btnHigh, btnMedium, btnLow);
  if (buttonEdit) {
    document.querySelector(".btn-edit-form").disabled = false;
  }
}
function inputChange(event) {
  if (event.target.value) {
    document.querySelector(".btn-add-form").disabled = false;
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
    console.log("icon" + icon);
  }
}
function newElement(event) {
  const uniqueId = Date.now();
  let li = document.createElement("li");
  li.id = "item_" + uniqueId;

  if (inputValue.value === "" || btnValue === "") {
    event.target.disabled = true;
    alert("You must write something!");
  } else {
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
window.onload = (event) => {
  listRender(listItem);
};
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
