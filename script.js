console.log("script js called");

// A promise in js is an object that represents a value
// which might be available now, or in future or never.
// It allows you to work with async ops.

// function step1() {
//   return new Promise((resolve, reject) => {
//     let sucess = true;
//     setTimeout(() => {
//       if (sucess) {
//         resolve("hurray!");
//       } else {
//         reject("I am sad :(");
//       }
//     }, 5000);
//   });
// }
// function step2() {
//   return new Promise((resolve, reject) => {
//     let sucess = true;
//     setTimeout(() => {
//       if (sucess) {
//         resolve("hurray 2!");
//       } else {
//         reject("I am sad 2 :(");
//       }
//     }, 5000);
//   });
// }
// how to use this promise?

// step1()
//   .then((result) => console.log("payment initiated"))
//   .then(step2)
//   .then((result) => display(result))
//   .catch((err) => console.error(err));

// 1. We might have an operation to do
// 2. We don't when we will get the result

// function display(result){
//     document.getElementById('result').innerText=result;
// }

document.addEventListener("DOMContentLoaded", () => {
  getMenu();
  document
    .getElementById("place-order")
    .addEventListener("click", mainFunction);
});

function getMenu() {
  const foodlist = document.getElementById("food-list");
  fetch(
    "https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json"
  )
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        let foodItem = document.createElement("div");
        foodItem.innerHTML = `
                    <img src="${item.imgSrc}" alt="${item.name}" height="200px">
                    <h1>${item.name}</h1>
                    <h4>${item.price}</h4>
                    `;
        foodlist.appendChild(foodItem);
      });
    });
}

function getRandomFood(data) {
  const all_food = data;
  const order = [];
  for (let i = 0; i < 3; i++) {
    let ri = Math.floor(Math.random() * data.length);
    order.push(all_food[ri]);
  }
  return order;
}

function TakeOrder(data) {
  return new Promise((resolve, reject) => {
    var order = getRandomFood(data);
    setTimeout(() => {
      resolve(order);
    }, 2500);
  });
}

function orderPrep() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log({ order_status: true, paid: false });
      resolve({ order_status: true, paid: false });
    }, 1500);
  });
}

function payOrder() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log({ order_status: true, paid: true });
      resolve({ order_status: true, paid: true });
    }, 1000);
  });
}
function thankyouFnc() {
  alert("thankyou for eating with us today!");
}

function mainFunction() {
  // get the data
  // adding the promises or writing the chain
  fetch(
    "https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json"
  )
    .then((response) => response.json())
    .then((data) => TakeOrder(data))
    .then((order) => {
      console.log(order);
      return order;
    })
    .then((order) => orderPrep())
    .then((status) => {
      if (status.order_status) {
        return payOrder();
      } else {
        throw new Error("Problem in making the order");
      }
    })
    .then((status) => {
      if (status.paid) {
        thankyouFnc();
      } else {
        throw new Error("Payment declined/failed.");
      }
    })
    .catch((err) => console.error(err));
}
