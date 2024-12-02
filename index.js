const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

app.use(express.static('static'));

//1
let person = {
  firstName: "Amit",
  lastName: "Sharma",
  gender: "male",
  age: 30,
  isMember: true,
}

app.get("/person", (req, res) => {
  res.json(person);
})


//2
function getFullName(person) {
  return person.firstName + " " + person.lastName;
}

app.get("/person/fullname", (req, res) => {
  let fullName = getFullName(person);
  res.json({fullName: fullName});
})


//3
function getFirstNameAndGender(person) {
  return {
    firstName: person.firstName,
    gender: person.gender,
  };
}

app.get("/person/firstname-gender", (req, res) => {
  let firstNameAndGender = getFirstNameAndGender(person);
  res.json(firstNameAndGender);
});


//4
function getIncrementedAgeObject(person) {
  person.age = person.age + 1;
  return person;
}

app.get("/person/incremented-age", (req, res) => {
  let updatedObject = getIncrementedAgeObject(person);
  res.json(updatedObject);
});


//5
function getFullNameAndMembership(person) {
  return {
    fullName: getFullName(person),     //directly use from Ques 3
    isMember: person.isMember,
  };
}

app.get("/person/fullname-membership", (req, res) => {
  let fullNameAndMembership = getFullNameAndMembership(person);
  res.json(fullNameAndMembership);
});


//6
function getFinalPrice(cartTotal, isMember) {
  let finalPrice = 0;  // null variable
  if (isMember === true) {
    finalPrice = cartTotal - (cartTotal * 0.1);
  } else {
    finalPrice = cartTotal;
  }
  return finalPrice;
}
app.get("/person/final-price", (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let finalPrice = getFinalPrice(cartTotal, person.isMember);
  res.json ({finalPrice: finalPrice.toFixed(2) });
});


//7
function getShippingCost(cartTotal, isMember) {
  let finalShippingCost;
  if ( cartTotal > 500 && isMember === true) {
    finalShippingCost = 0;
  } else {
    finalShippingCost = 99;
  }
  return finalShippingCost;
}

app.get("/person/shipping-cost", (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let shippingCost = getShippingCost(cartTotal, person.isMember);
  res.json ({shippingCost: shippingCost.toFixed(2) })  
}),




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
