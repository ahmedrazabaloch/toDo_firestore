import {
  collection,
  addDoc,
  db,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "./firebase.js";

let input = document.getElementById("input");
let list_item = document.getElementById("list_item");
//getting data from FireStore
const getData = async () => {
  const ref = collection(db, "todos");
  const unsubscribe = onSnapshot(ref, (querySnapshot) => {
    list_item.innerHTML = "";
    querySnapshot.forEach((doc) => {
      list_item.innerHTML += `
        <div class="list_item">
          <div>
            <p class="para">${doc.data().value}</p>
          </div>
          <div>
            <button class="edit_btn">Edit</button>
            <button class="del_btn">Delete</button>
          </div>
        </div>
      `;
    });
  });
};
getData();
// Show data in UI
const addItem = async (e) => {
  e.preventDefault();
  if (input.value.trim() !== "") {
    if (input.value.length < 20) {
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
      addEventListeners();
      addData();
    } else {
      alert("value should be lower 22 leter");
    }
  } else {
    alert("Can't add an empty value");
  }
  input.value = "";
};
//Sending data to firestore
const addData = async () => {
  const docRef = await addDoc(collection(db, "todos"), {
    value: input.value,
    timestamp: serverTimestamp(),
  });
  console.log("Document written with ID: ", docRef.id);
};
//getting butting event listener
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
//Edit Button
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
//Delete button
var deleteItem = (index) => {
  let items = document.querySelectorAll(".list_item");
  console.log("items[index]", items[index]);
  items[index].remove();
  index--;
};

const addItem_btn = document.getElementById("addItem_btn");
addItem_btn.addEventListener("click", addItem);

addEventListeners();
