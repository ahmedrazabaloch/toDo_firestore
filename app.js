let input = document.getElementById("input");
let index = 1;
const addItem = (e) => {
  e.preventDefault();
  console.log(input.value);
  let list_item = document.getElementById("list_item");
  if (input.value.trim() !== "") {
    if (index < 6 && input.value.length < 22) {
      list_item.innerHTML += `
    <div class="list_item">
          <div>
              <p>${index} - </p>
              <p>${input.value}</p>
          </div>
          <div>
              <button id="edit_btn">Edit</button>
              <button id="del_btn">Delete</button>
          <div>
      <div>
    `;
      index++;
    } else {
      alert("reached the count");
    }
  } else {
    alert("can't add empty value");
  }
  input.value = "";
};

const addItem_btn = document.getElementById("addItem_btn");

addItem_btn.addEventListener("click", addItem);
