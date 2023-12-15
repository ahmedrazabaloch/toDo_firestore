import { collection, addDoc, db } from "./firebase.js";

let input = document.getElementById("input");
let count = 1;
let list_item = document.getElementById("list_item");

const addItem = async (e) => {
  e.preventDefault();
  if (input.value.trim() !== "") {
    if (count < 6 && input.value.length < 20) {
      list_item.innerHTML += `
        <div class="list_item">
          <div>
            <p class="para">${input.value}</p>
          </div>
          <div>
            <button class="edit_btn">Edit</button>
            <button class="del_btn">Delete</button>
          </div>
        </div>
      `;
      count++;
      addEventListeners();
      //Firestore
      const docRef = await addDoc(collection(db, "todos"), {
        value: input.value,
      });
      console.log("Document written with ID: ", docRef.id);
    } else {
      alert("Reached the count");
    }
  } else {
    alert("Can't add an empty value");
  }
  input.value = "";
};

const addEventListeners = () => {
  let editButtons = document.querySelectorAll(".edit_btn");
  let deleteButtons = document.querySelectorAll(".del_btn");

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
    if (newValue.length < 20) {
      let paragraphs = document.querySelectorAll(".para");
      paragraphs[index].textContent = newValue;
    } else {
      alert("value should be lower 22 leter");
    }
  } else {
    alert("Can't add an empty value");
  }
};
try {
  var deleteItem = (index) => {
    let items = document.querySelectorAll(".list_item");
    console.log("items[index]", items[index]);
    items[index].remove();
    index--;
    count--;
  };
} catch (err) {
  console.log("catch error-->", err);
}

const addItem_btn = document.getElementById("addItem_btn");
addItem_btn.addEventListener("click", addItem);

addEventListeners();
