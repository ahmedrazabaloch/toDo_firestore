let input = document.getElementById("input");
let count = 1;
let list_item = document.getElementById("list_item");

const addItem = (e) => {
  e.preventDefault();
  if (input.value.trim() !== "") {
    if (count < 6 && input.value.length < 22) {
      list_item.innerHTML += `
        <div class="list_item">
          <div>
            <p>${count} - </p>
            <p>${input.value}</p>
          </div>
          <div>
            <button id="edit_btn">Edit</button>
            <button id="del_btn">Delete</button>
          </div>
        </div>
      `;
      count++;
      input.value = "";
      addEventListeners(); // Attach event listeners to new buttons
    } else {
      alert("Reached the count");
    }
  } else {
    alert("Can't add an empty value");
  }
};

const addEventListeners = () => {
  let editButtons = document.getElementById("#edit_btn");
  let deleteButtons = document.getElementById("#del_btn");

  editButtons.forEach((button, i) => {
    button.addEventListener("click", () => {
      editItem(i);
    });
  });

  deleteButtons.forEach((button, i) => {
    button.addEventListener("click", () => {
      deleteItem(i);
    });
  });
};

const editItem = (index) => {
  let newValue = prompt("Enter new value:");
  if (newValue !== null) {
    let paragraphs = document.querySelectorAll(".list_item p:nth-child(2)");
    paragraphs[index].textContent = newValue;
  }
};

const deleteItem = (index) => {
  let items = document.querySelectorAll(".list_item");
  items[index].remove();
  index--;
  count--;
};

const addItem_btn = document.getElementById("addItem_btn");
addItem_btn.addEventListener("click", addItem);

addEventListeners();
