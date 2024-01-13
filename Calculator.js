// function calculator(string) {
//   const num = string.replaceAll(" ", "");
//   const arabicOperands = num.match(/\d+/g);
//   let romanOperands = num.match(/[IVXLCDMivxlcdm]+/g);

//   //ArabicCalculator;
//   const arabicCalc = (arabicOperands) => {
//     if (
//       arabicOperands &&
//       arabicOperands.length === 2 &&
//       !isNaN(arabicOperands[0]) &&
//       !isNaN(arabicOperands[1]) &&
//       arabicOperands[0] != 0 &&
//       arabicOperands[1] != 0 &&
//       arabicOperands[0] <= 10 &&
//       arabicOperands[1] <= 10 &&
//       !num.includes("%") &&
//       num.length === 3
//     ) {
//       const result = eval(num);
//       console.log(result);
//       return;
//     } else if (arabicOperands[0] == 0 || arabicOperands[1] == 0) {
//       console.log("Операнд не должен быть равен 0");
//     } else if (arabicOperands[0] > 10 || arabicOperands[1] > 10) {
//       console.log("Операнд не должен быть больше 10");
//     } else if (num.includes("%")) {
//       console.log("Операция деления с остатком невозможна");
//     } else if (arabicOperands) {
//       console.log("Недопустимое количество символов");
//     } else {
//       console.log("Неккоректные данные");
//     }
//   };

//   if (arabicOperands) {
//     arabicCalc(arabicOperands);
//   }

//   //RomanCalculator
//   const romanCalc = (romanOperands) => {
//     const romanNumerals = {
//       M: 1000,
//       CM: 900,
//       D: 500,
//       CD: 400,
//       C: 100,
//       XC: 90,
//       L: 50,
//       XL: 40,
//       X: 10,
//       IX: 9,
//       V: 5,
//       IV: 4,
//       I: 1,
//     };

//     //romanToArabic
//     function romanToArabic(roman) {
//       let arabic = 0;
//       let prevValue = 0;

//       for (let i = roman.length - 1; i >= 0; i--) {
//         const currentValue = romanNumerals[roman[i]];
//         if (currentValue < prevValue) {
//           arabic -= currentValue;
//         } else if (currentValue === undefined) {
//           console.log("''");
//           return;
//         } else {
//           arabic += currentValue;
//         }

//         prevValue = currentValue;
//       }

//       return arabic;
//     }

//     const arabicValue = romanToArabic(romanOperands);
//     //ArabicToRoman
//     function arabicToRoman(arabic) {
//       let result = "";

//       for (let key in romanNumerals) {
//         while (arabic >= romanNumerals[key]) {
//           result += key;
//           arabic -= romanNumerals[key];
//         }
//       }

//       return result;
//     }
//     if (
//       romanOperands &&
//       romanOperands.length === 2 &&
//       num.indexOf("%") === -1
//     ) {
//       let arabic = eval(arabicValue);
//       arabicToRoman(arabic);

//       const romanValue = arabicToRoman(arabic);
//       console.log(romanValue);
//     } else {
//       console.log("Не валиндные значения");
//     }
//   };

//   if (romanOperands) {
//     const romanOperandsUpper = romanOperands.map((operand) =>
//       operand.toUpperCase()
//     );
//     romanCalc(romanOperandsUpper);
//   }
// }

// calculator("I + II");

const btn = document.querySelectorAll(".btn"),
  display = document.querySelector(".display"),
  clear = document.querySelector(".clear"),
  equals = document.querySelector(".equals"),
  expression = document.querySelectorAll(".btn_expression");

display.textContent = "0";

btn.forEach((item) => {
  item.addEventListener("click", () => {
    if (display.textContent === "0" && item.textContent !== ".") {
      display.textContent = item.textContent;
    } else if (display.textContent.length < 9) {
      display.textContent += item.textContent;
      expression.forEach((item) => {
        item.classList.remove("background_red");
      });
    } else if (display.textContent.length === 10) {
      let number = display.textContent;
      display.textContent = item.textContent;

      equals.addEventListener("click", () => {
        let res = `${number}${display.textContent}`;
        console.log(res);
        display.textContent = eval(res);
        number = "";
        expression.forEach((item) => {
          item.classList.remove("background_red");
        });
      });
    } else if (
      display.textContent.includes("/") ||
      display.textContent.includes("*") ||
      display.textContent.includes("+") ||
      display.textContent.includes("-")
    ) {
      let number2 = display.textContent;
      display.textContent = item.textContent;

      equals.addEventListener("click", () => {
        let res2 = `${number2}${display.textContent}`;
        display.textContent = eval(res2);
        number2 = "";

        expression.forEach((item) => {
          item.classList.remove("background_red");
        });
      });
    }
  });
});

expression.forEach((item) => {
  item.addEventListener("click", () => {
    if (
      display.textContent.includes("/") ||
      display.textContent.includes("*") ||
      display.textContent.includes("-") ||
      display.textContent.includes("+")
    ) {
      return;
    }

    expression.forEach((otherItem) => {
      otherItem.classList.remove("background_red");
    });

    item.classList.add("background_red");

    if (display.textContent.length <= 9) {
      display.textContent += item.textContent;
    }
  });
});

equals.addEventListener("click", () => {
  display.textContent = eval(display.textContent);
});

clear.addEventListener("click", () => {
  display.textContent = "0";
  expression.forEach((item) => {
    item.classList.remove("background_red");
  });
});
