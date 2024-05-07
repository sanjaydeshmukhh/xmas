

let arr = ["a", "b", "c", "d", "e"];
let map = arr.map((letter) => letter.toUpperCase());
console.log(map);

let arr2 = ['sam','ram','jessi'];
let ans = arr2.map((val)=> 'Mr '+val)
console.log(ans)

let a2 = [-1,-2,3,4,5,-9,-5]
let ans2 = a2.filter((val)=> val>=0)
console.log(ans2)

let a3 = [1,2,3,4,5,6,7,8,9,10]
let ans3 = a3.filter((val)=> val%2==0)
console.log(ans3)

let a4 = ['pinkman','sam','openheimer','jessi','breaking','ram']
let ans4 = a4.filter((val)=> val.length>=5)
console.log(ans4)

// 4. Given an array of temperatures in Celsius,
//  create a new array that converts each temperature to Fahrenheit using the formula (Celsius * 9/5) + 32.

let arr4 = [30,50,40,35,42]
let ans5 = arr4.map((val)=> (val *9/5) +32)
console.log(ans5)

let ab = 0
ab => ab+100;
console.log(ab)
