'use strict';
// const account1 = {
//   owner: 'Jonas Schmedtmann',
//   movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
//   interestRate: 1.2, // %
//   pin: 1111,

//   movementsDates: [
//     '2019-11-18T21:31:17.178Z',
//     '2019-12-23T07:42:02.383Z',
//     '2020-01-28T09:15:04.904Z',
//     '2020-04-01T10:17:24.185Z',
//     '2020-05-08T14:11:59.604Z',
//     '2020-05-27T17:01:17.194Z',
//     '2020-07-11T23:36:17.929Z',
//     '2020-07-12T10:51:36.790Z',
//   ],
//   currency: 'EUR',
//   locale: 'pt-PT', // de-DE
// };

// const account2 = {
//   owner: 'Jessica Davis',
//   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//   interestRate: 1.5,
//   pin: 2222,

//   movementsDates: [
//     '2019-11-01T13:15:33.035Z',
//     '2019-11-30T09:48:16.867Z',
//     '2019-12-25T06:04:23.907Z',
//     '2020-01-25T14:18:46.235Z',
//     '2020-02-05T16:33:06.386Z',
//     '2020-04-10T14:43:26.374Z',
//     '2020-06-25T18:49:59.371Z',
//     '2020-07-26T12:01:20.894Z',
//   ],
//   currency: 'USD',
//   locale: 'en-US',
// };

// const accounts = [account1, account2];

// console.log(23 === 23.0);

// //BASE 10 is 0-9. 1/10=0.1. 3/10=3.33333333
// //binary base2 is 0-1
// console.log(0.1 + 0.2);
// console.log(0.1 + 0.2 === 0.3);

// console.log(Number('23'));
// //JS sees the plus operator and will do type coercian
// console.log(+'23');

// //PARSING
// //this only works if string starts with a number
// //10 is the base of the number system we are using. 2 would be binary
// console.log(Number.parseInt('30px', 10));
// console.log(Number.parseInt('e23', 10));

// //Float
// console.log('----ParseFloat -- ParseInt');
// console.log(Number.parseFloat('2.5rem'));
// console.log(Number.parseInt('2.5rem'));
// //check to see if value is not a number
// console.log('----isNaN------');
// console.log(Number.isNaN(20));
// console.log(Number.isNaN('20'));
// console.log(Number.isNaN(+'20X'));
// console.log(Number.isNaN(23 / 0));

// //finite is the best way to check if value is a number
// console.log('-------isFinite------');
// console.log(Number.isFinite(20));
// console.log(Number.isFinite('20'));
// console.log(Number.isFinite(+'20X'));
// console.log(Number.isFinite(23 / 0));

//-------Math and Rounding-------
// console.log('---Square Roots');
// console.log(Math.sqrt(25));
// console.log(25 ** (1 / 2)); //square root
// console.log(25 ** (1 / 3)); //third square. Whatever that means

// console.log('----Max Values----');
// console.log(Math.max(5, 1, 2, 3, 5, 10, 200));
// console.log(Math.max(5, 1, 2, 3, 5, 10, '200'));
// console.log(Math.max(5, 1, 2, 3, 5, 10, '200px'));
// console.log('----Min Values-----');
// console.log(Math.min(5, 1, 2, 3, 5, 10, 200));
// //Radius of a 10px circle
// console.log(Math.PI * Number.parseFloat('10px') ** 2);
// console.log('--random dice roll-----');
// console.log(Math.trunc(Math.random() * 6) + 1);
// //function to give a random int between two numbers
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min) + 1) + min;
// console.log(randomInt(10, 20));
// //rounding INTEGERS
// console.log('Rounding 23.something');
// console.log('----Trunc(23.3)----');
// console.log(Math.trunc(23.3));
// console.log('-----round(23.5)----');
// console.log(Math.round(23.5));
// console.log('-----round(23.4)----');
// console.log(Math.round(23.4));
// console.log('----ceil(23.9)----');
// console.log(Math.ceil(23.9));
// console.log('----ceil(23.1)----');
// console.log(Math.ceil(23.1));
// console.log('---FLoor(23.1)----');
// console.log(Math.floor(23.1));
// console.log('---FLoor(23.9)----');
// console.log(Math.floor(23.9));
// console.log('---Floor(-23.3)---');
// console.log(Math.floor(-23.3));
// console.log('---trunc(-23.3)----');
// console.log(Math.trunc(-23.3));

// //Rounding decimals
// console.log((2.7).toFixed(0)); //0 is the number of decimal places

///----Remainder operator------
// returns whats left to reach the first number after division
// console.log(5 % 2);
// console.log(10 % 9); //need 1 to reach 10
// console.log(10 % 8); //need 2 to reach 10
// console.log(10 % 4); // 4 goes into 10 twice. then need 2 to reach 10
// console.log(10 % 2); // 2 goes into 10 evenly. 0 remainder
// ///this operator is great to check if a number is even or odd
// //a number is even if its divisible by 2. As in has 0 remainder
// console.log(6 % 2);
// console.log(7 % 2);

// const isEven = n => n % 2 === 0;
// console.log(isEven(8));
// console.log(isEven(23));
// console.log(isEven(1023085637486));
// ///its also great for doing something every nth time
// labelBalance.addEventListener('click', function () {
//   [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
//     //sets every other row to different color
//     if (i % 2 === 0) row.style.backgroundColor = 'orangered';
//     //every 3 row. 0,3,6,9
//     if (i % 3 === 0) row.style.backgroundColor = 'blue';
//   });
// });

//--------DATES AND TIMES---------////
///creating a date
// const now = new Date();
// console.log(now);
// console.log(new Date('december 25 2023'));
// console.log(new Date(account1.movementsDates[0]));

// //arguments. year, month, day, hour, minute, seconds
// console.log(new Date(2037, 10, 19, 15, 23, 5));
// //Js will auto correct if you put in a wrong day like below. Only 30 days in novemebr so it logs decmeber 1st
// console.log(new Date(2037, 10, 31));
// //miliseconds passed sinced the beggining of unix time
// console.log(new Date(0));
// //three days * 24 hours * 60 minutes * 60 seconds * 1000 miliseconds
// console.log(new Date(3 * 24 * 60 * 60 * 1000));

////Working with dates
// const future = new Date(2037, 10, 19, 15, 23);
// console.log(future);
// console.log('----year----');
// console.log(future.getFullYear());
// console.log('----Month 0index----');
// console.log(future.getMonth());
// console.log('----day of month----');
// console.log(future.getDate());
// console.log('----day of week----');
// console.log(future.getDay());
// console.log('----hours----');
// console.log(future.getHours());
// console.log('----minutes----');
// console.log(future.getMinutes());
// console.log('----seconds----');
// console.log(future.getSeconds());
// console.log('----to string----');
// console.log(future.toISOString());
// console.log('---timeStamp since jan 1st 1970');
// console.log(future.getTime());
// console.log('-----current timestamp-----');
// console.log(Date.now());
// ///you can use set for all of the above to change the date of future
// future.setFullYear(2077);
// console.log(future);
