//ToDo List

let deleteButtons = document.getElementsByClassName("delete");
let draggedItem = null;

document.getElementById("add").onclick = function () {
  if (document.getElementById("listAddition").value != "") {
    addItem();
  }
};

//Add Item Function
function addItem() {
  let existingList = document.getElementById("list");

  let listItem = document.createElement("li");

  existingList.appendChild(listItem);

  let draggable = document.createElement("i");
  draggable.className = "fas fa-bars move";
  listItem.appendChild(draggable);

  listItem.setAttribute("draggable", true);
  listItem.ondragover = function () {
    return false;
  };

  listItem.addEventListener("dragstart", dragStart);
  listItem.addEventListener("dragend", dragEnd);
  listItem.addEventListener("dragenter", dragEnter);
  listItem.addEventListener("dragleave", dragLeave);
  listItem.addEventListener("drop", drop);

  let text = document.createTextNode(
    document.getElementById("listAddition").value
  );
  listItem.appendChild(text);

  let deleteButton = document.createElement("i");
  deleteButton.className = "fa fa-trash delete";
  listItem.appendChild(deleteButton);


  document.getElementById("listAddition").value = "";

  for (var i = 0; i < deleteButtons.length; i++) {
    deleteButtons.item(i).onclick = deleteItem;
  }
  function deleteItem() {
    this.parentElement.remove();
  }

}

function dragStart(listItem) {
  draggedItem = this;
  this.style.opacity = 0.5;
}

function dragEnd(listItem) {
  this.style.opacity = 1;
}

function dragEnter(listItem) {
  this.classList.add("over");
}

function dragLeave(listItem) {
  this.classList.remove("over");
}

function drop(listItem) {
  let placeholder = this.childNodes[1].textContent;
  if (draggedItem !== this) {
    this.childNodes[1].textContent = draggedItem.childNodes[1].textContent;
    draggedItem.childNodes[1].textContent = placeholder;
  }
  this.classList.remove("over");
}
