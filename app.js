import {
  collection,
  addDoc,
  db,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "./firebase.js";

//Sending data to firestore
let input = document.getElementById("input");
let list_item = document.getElementById("list_item");

const addItem = async (e) => {
  e.preventDefault();

  if (input.value.trim() !== "") {
    if (input.value.length < 23) {
      const docRef = await addDoc(collection(db, "todos"), {
        value: input.value,
        timestamp: serverTimestamp(),
      });
    } else {
      Swal.fire({
        title: "Value should lessthen 22 leter",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        }
      });
    }
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Can't add an empty value",
    });
  }
  input.value = "";
}
const addItem_btn = document.getElementById("addItem_btn");
addItem_btn.addEventListener("click", addItem);

//Button event listener
const getElements = () => {
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
const editItem = async (index) => {
  let newValue = prompt("Enter new value:");

  if (newValue !== null) {
    if (newValue.length < 23) {
      // Update Firestore data
      const ref = query(collection(db, "todos"), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(ref);
      const documents = querySnapshot.docs;
      const docId = documents[index].id;

      await updateDoc(doc(db, "todos", docId), {
        value: newValue,
        timestamp: serverTimestamp(),
      });

      // Update UI
      let paragraphs = document.querySelectorAll(".para");
      paragraphs[index].textContent = newValue;
    } else {
      alert("Value should be less than 20 characters");
    }
  } else {
    alert("Can't add an empty value");
  }
};

//Delete button
const deleteItem = async (index) => {
  const ref = query(collection(db, "todos"), orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(ref);
  const documents = querySnapshot.docs;
  const docId = documents[index].id;
  await deleteDoc(doc(db, "todos", docId));
};

//Getting data from FireStore & Display
const getData = async () => {
  const ref = query(collection(db, "todos"), orderBy("timestamp", "desc"));
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
    getElements();
  });
};
getData();
