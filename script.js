// Arr.map(function(va){
//     return 
// });

// map numbr of elements wiill not  decrease   map returns valye in a new array
// if you want to reduce the size of array we would use filter return only true of false 

// console.log('hello')

// var arr = [10,'hello',112,'hi'];
// var ar = arr.filter(function(val){
//     if (typeof val ==="string" ) return false;
//     else return true;
// })

// var arr = [12,15,16,8,15,10,NaN]
//  var ar = arr.filter(function(val){
//      if (isNaN(val)) return false;
//      else return true;
//  })

//  var ar = arr.filter(function (val) {
//      if (isNaN(val)=== true){
//             return false;
//     }
//      else return true;
//  });

//  var arr = [
//      { name: "iphone", value: 12000, available: true },
//      { name: "iphone", value: 12000, available: true },
//      { name: "ipad", value: 12000, available: false }
//  ];

//  var ans = arr.filter(val => val.available)

// const names = ['John Smith', 'Emily Johnson', 'William Smith'];
// const filteredNames = names.filter(name => name.includes('Smith'));
// console.log(filteredNames); // ['John Smith', 'William Smith']

// const names = ['ram','shyam','lakhan']
// const filteredNames = names.filter(function(val){
//     if (val.includes('lakhan')){
//         return true;
//     }else return false
// });

// const Names = ['william john','hemish wansir','Pere gustavo','hammond john'];

// let filterName = Names.filter((name) => name.includes('john'));

// 1) Given an array of integers, write a function to filter out and return only the even numbers.

// Example:
// Input: [1, 2, 3, 4, 5, 6]
// Output: [2, 4, 6]

// let arr = [1,2,3,4,5,6];
// let ans = arr.filter(val => (val%2===0));

// 2) Write a function that takes an array of words and a number 'n' as arguments and returns an array of words that have a length greater than 'n'.

// Example:
// Input: ["apple", "banana", "grape", "orange"], 5
// Output: ["banana", "orange"]

// let arr = ['apple','banana','grape','orange'];
// let ans = arr.filter(fruits => fruits.length!==5)

//  3)Input: ["Alice", "Bob", "Charlie", "David"], "B";
// Output: ["Bob"];

// let arr = ["Alice", "Bob", "Charlie", "David"];
// let ans = arr.filter(name => name.includes("B"))

// let arr = [-2, 0, 5, -1, 10];
// let ans = arr.filter(val => val>=0);

// Given an array of words, filter and return only the words that are palindromes (words that read the same backward as forward).

// Example:
// Input: ["level", "hello", "radar", "world"]
// Output: ["level", "radar"]

// let arr = ["level", "hello", "radar", "world"];
// let answ = arr.filter((name) => name === name.split("").reverse().join(""));






function Locos() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true,
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length
                ? locoScroll.scrollTo(value, 0, 0)
                : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight,
            };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform
            ? "transform"
            : "fixed",
    });
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
}
Locos();


// Array to store our Snowflake objects
  let snowflakes = [];

  // Global variables to store our browser's window size
  let browserWidth;
  let browserHeight;

  // Specify the number of snowflakes you want visible
  let numberOfSnowflakes = 150;

  // Flag to reset the position of the snowflakes
  let resetPosition = false;

  // Handle accessibility
  let enableAnimations = false;
  let reduceMotionQuery = matchMedia("(prefers-reduced-motion)");

  // Handle animation accessibility preferences
  function setAccessibilityState() {
    if (reduceMotionQuery.matches) {
      enableAnimations = false;
    } else {
      enableAnimations = true;
    }
  }
  setAccessibilityState();

  reduceMotionQuery.addListener(setAccessibilityState);

  //
  // It all starts here...
  //
  function setup() {
    if (enableAnimations) {
      window.addEventListener("DOMContentLoaded", generateSnowflakes, false);
      window.addEventListener("resize", setResetFlag, false);
    }
  }
  setup();

  //
  // Constructor for our Snowflake object
  //
  class Snowflake {
    constructor(element, speed, xPos, yPos) {
      // set initial snowflake properties
      this.element = element;
      this.speed = speed;
      this.xPos = xPos;
      this.yPos = yPos;
      this.scale = 1;

      // declare variables used for snowflake's motion
      this.counter = 0;
      this.sign = Math.random() < 0.5 ? 1 : -1;

      // setting an initial opacity and size for our snowflake
      this.element.style.opacity = (0.1 + Math.random()) / 3;
    }

    // The function responsible for actually moving our snowflake
    update(delta) {
      // using some trigonometry to determine our x and y position
      this.counter += (this.speed / 5000) * delta;
      this.xPos += (this.sign * delta * this.speed * Math.cos(this.counter)) / 40;
      this.yPos += Math.sin(this.counter) / 40 + (this.speed * delta) / 30;
      this.scale = 0.5 + Math.abs((10 * Math.cos(this.counter)) / 20);

      // setting our snowflake's position
      setTransform(
        Math.round(this.xPos),
        Math.round(this.yPos),
        this.scale,
        this.element
      );

      // if snowflake goes below the browser window, move it back to the top
      if (this.yPos > browserHeight) {
        this.yPos = -50;
      }
    }
  }

  //
  // A performant way to set your snowflake's position and size
  //
  function setTransform(xPos, yPos, scale, el) {
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0) scale(${scale}, ${scale})`;
  }

  //
  // The function responsible for creating the snowflake
  //
  function generateSnowflakes() {
    // get our snowflake element from the DOM and store it
    let originalSnowflake = document.querySelector(".snowflake");

    // access our snowflake element's parent container
    let snowflakeContainer = originalSnowflake.parentNode;
    snowflakeContainer.style.display = "block";

    // get our browser's size
    browserWidth = document.documentElement.clientWidth;
    browserHeight = document.documentElement.clientHeight;

    // create each individual snowflake
    for (let i = 0; i < numberOfSnowflakes; i++) {
      // clone our original snowflake and add it to snowflakeContainer
      let snowflakeClone = originalSnowflake.cloneNode(true);
      snowflakeContainer.appendChild(snowflakeClone);

      // set our snowflake's initial position and related properties
      let initialXPos = getPosition(50, browserWidth);
      let initialYPos = getPosition(50, browserHeight);
      let speed = (5 + Math.random() * 40) * delta;

      // create our Snowflake object
      let snowflakeObject = new Snowflake(
        snowflakeClone,
        speed,
        initialXPos,
        initialYPos
      );
      snowflakes.push(snowflakeObject);
    }

    // remove the original snowflake because we no longer need it visible
    snowflakeContainer.removeChild(originalSnowflake);

    requestAnimationFrame(moveSnowflakes);
  }

  //
  // Responsible for moving each snowflake by calling its update function
  //
  let frames_per_second = 60;
  let frame_interval = 1000 / frames_per_second;

  let previousTime = performance.now();
  let delta = 1;

  function moveSnowflakes(currentTime) {
    delta = (currentTime - previousTime) / frame_interval;

    if (enableAnimations) {
      for (let i = 0; i < snowflakes.length; i++) {
        let snowflake = snowflakes[i];
        snowflake.update(delta);
      }
    }

    previousTime = currentTime;

    // Reset the position of all the snowflakes to a new value
    if (resetPosition) {
      browserWidth = document.documentElement.clientWidth;
      browserHeight = document.documentElement.clientHeight;

      for (let i = 0; i < snowflakes.length; i++) {
        let snowflake = snowflakes[i];

        snowflake.xPos = getPosition(50, browserWidth);
        snowflake.yPos = getPosition(50, browserHeight);
      }

      resetPosition = false;
    }

    requestAnimationFrame(moveSnowflakes);
  }

  //
  // This function returns a number between (maximum - offset) and (maximum + offset)
  //
  function getPosition(offset, size) {
    return Math.round(-1 * offset + Math.random() * (size + 2 * offset));
  }

  //
  // Trigger a reset of all the snowflakes' positions
  //
  function setResetFlag(e) {
    resetPosition = true;
  }