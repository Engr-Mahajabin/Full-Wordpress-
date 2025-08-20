// Function:

// Even Number:

function even_num() {
  var a;
  for (var a = 1; a <= 10; a++) {
    if (a % 2 === 0) {
      document.write(a, "<br>");
    }
  }
}
even_num();

document.write("<br>");

//Odd Number:
function odd_num() {
  var a;
  for (var a = 1; a <= 10; a++) {
    if (a % 2 === 1) {
      document.write(a, "<br>");
    }
  }
}
odd_num();

document.write("<br>");

// Object:
var car = { name: "BMW", color: "Black", model: "Aventador" };
document.getElementById("car").innerHTML = car.name;

document.write("<br>");

// Scope:
var a = 555;
var b = 666;

function fun() {
  document.write(a + b);
}
fun();
document.write("<br>", b - a);
document.write("<br>", a * b);
document.write("<br>", a / b);

document.write("<br>");
document.write("<br>");

// Marksheet:
var result = 90;
if (result <= 32) {
  document.write("Fail");
} else if (result >= 33 && result <= 40) {
  document.write("You have got D");
} else if (result >= 41 && result <= 50) {
  document.write("You have got C");
} else if (result >= 51 && result <= 60) {
  document.write("You have got B");
} else if (result >= 61 && result <= 70) {
  document.write("You have got A");
} else if (result >= 71 && result <= 80) {
  document.write("You have got A+");
} else if (result >= 81 && result <= 100) {
  document.write("You have got Golden A+");
} else {
  document.write("Computer Mistake");
}

document.write("<br>");
document.write("<br>");

// ATM machine:
var a = "RightPin";
var b = "CashWithdraw";
var c = "BalanceInquery";
var d = "LogOut";
var e = "PutAmount";
var f = 500;

if (a === "RightPin") {
  //   document.write("Right pin");
  if (b === "CashWithdraw") {
    // document.write("Ready for checkout");
    if (c === "BalanceInquery") {
      //document.write("Check Your Balance");
      if (d === "LogOut") {
        //document.write("Logout Successfully");
        if (e === "PutAmount") {
          //document.write("Put Your Input");
          if (f === 500 || 5000 || 10000 || 20000) {
            document.write("Total Amount 5000 tk.");
          } else {
            document.write("Wrong Input");
          }
        } else {
          document.write("Wrong Input");
        }
      } else {
        document.write("TRy Again");
      }
    } else {
      document.write("Try Again");
    }
  } else {
    document.write("Wrong input");
  }
} else {
  document.write("Wrong pin");
}
