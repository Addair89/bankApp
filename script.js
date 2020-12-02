'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-11-23T23:36:17.929Z',
    '2020-11-25T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
//--------------FUNCTIONS FOR THE APP----------------
function formatMovementDate(date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  if (daysPassed === 0) return `Today`;
  if (daysPassed === 1) return `Yesterday`;
  if (daysPassed === 2) return `Two days ago`;
  if (daysPassed === 3) return `Three days ago`;

  // const day = date.getDate();
  // const month = date.getMonth() + 1;
  // const year = date.getFullYear();
  // return `${month}/${day}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
}
//function to format the local currency depending on the user
function formatCurr(value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
}
///-------displaying the movements array from an account onto the site-------------------------------------------------------------
function displayMovements(acc, sort = false) {
  //emptty the entire container of the html then adding the dynamic html
  containerMovements.innerHTML = '';

  //making a copy of the movements array passed into the function using the slice method. then sorting that array numerically
  const movs = sort
    ? acc.movements.slice(' ').sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    //determining if it is a deposit or withdrawal
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    //getting the date that has the same index as the movement.
    const date = new Date(acc.movementsDates[i]);

    const displayDate = formatMovementDate(date, acc.locale);
    //creating the html to insert into the page based on the type of transaction and the amount from the array it being pulled from
    const formattedMovement = formatCurr(mov, acc.locale, acc.currency);

    const html = `
    <div class="movements__row">
        <div class="movements__type 
        movements__type--${type}"> ${type} #${i + 1}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMovement}</div>
    </div>
    `;
    //adding the html created above to the site :)
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

////------Printing the account balance to the html page-----------------------------------------------------------------
function calcDisplayBalance(acc) {
  //adding all the contents of the array from the accounts object property of movements. And creating another property of the account object to use later in transfers and loans
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  //displaying it using the .textcontent

  labelBalance.textContent = formatCurr(acc.balance, acc.locale, acc.currency);
}

///------Calculating and display the totals of deposits, widthrawals, and interest---------------------------------------------------------------
function calcDisplaySummary(acc) {
  const incomes = acc.movements ///calculating the total deposits
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  //displaying the results from above to HTML w/textcontent
  labelSumIn.textContent = formatCurr(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCurr(Math.abs(out), acc.locale, acc.currency);

  //didplaying the results of withdrawals to html w/textcontent
  ///calculating the interest of all deposits
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, mov) => acc + mov, 0);
  ////displaying the intrest
  labelSumInterest.textContent = formatCurr(interest, acc.locale, acc.currency);
}

//-----creating usernames with the initials of the users------------------------------------------------------------------

function createUserNames(accs) {
  //looping over the accounts array which holds all the accounts objects.
  accs.forEach(function (acc) {
    ///for each account object referenced in the array at line 36. we are creating a new property called username which is equal to the accounts full name----toLowercase-----split into an array----- mapped to grab the first letter of each word-----then stringified into one string. AKA thier initials.
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
}
createUserNames(accounts);
console.log(accounts);
//
//
function updateUI(acc) {
  //-------display movements
  displayMovements(acc);
  //-------display balance
  calcDisplayBalance(acc);
  //-------display summary
  calcDisplaySummary(acc);
}

function startLogoutTimer() {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    //in each call, print the remaining time
    labelTimer.textContent = `${min}:${sec}`;

    //when 0 seconds, stop and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = `Login in to get started 
      `;
      containerApp.style.opacity = 0;
    }

    //decrese 1 second
    time--;
  };
  //set time to 5 minutes
  let time = 300;
  //call timer every second
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
}
///------------EVENT HANDLER FOR LOGIN--------------------------------------------------

// currentAccount will be set globally whenever someone logs in. Can use currentAcc everywhere else in our code

let currentAccount, timer;

btnLogin.addEventListener('click', function (e) {
  //this prevents form from submitting
  e.preventDefault();
  //This checks if the input for username matches one of the accounts objects username that we created above
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  //checking to see if the pin equals the current accounts pin value
  if (currentAccount?.pin === +inputLoginPin.value) {
    //------display ui and welcom message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    ///current date when logged in
    const now = new Date();
    //experimenting with api
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    };
    ///this makes the time and date display according to the users local time and date
    // const locale = currentAccount.locale;
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);
    //-----clear the input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    //------blur()makes the element lose its focus
    inputLoginPin.blur();
    //------setting opacity to 100 if login accepted
    containerApp.style.opacity = 100;
    if (timer) clearInterval(timer);
    timer = startLogoutTimer();
    //update the ui
    updateUI(currentAccount);
  }
});

///--------EVENT HANDLER FOR TRANSFER ---------------------------------------------

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  //amount of the transfer. Convert to number
  const amount = +inputTransferAmount.value;
  ///loop through the accounts array and find the username that equals the input value
  const recieverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  //clearing the input fields after the button is clicked. Then  bleow is the calculations
  inputTransferTo.value = inputTransferAmount.value = '';
  inputTransferTo.blur();
  inputTransferAmount.blur();
  //check to see if the amount totransfer makes sense. I.E. not a negative amount or has enough money to make the tranfer
  if (
    amount > 0 && //is amount greater than 0
    recieverAcc && //does the account exist
    currentAccount.balance >= amount && //do you have enough to tranfer
    recieverAcc?.username !== currentAccount.username //cant transfer to yourself
  ) {
    //add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    recieverAcc.movementsDates.push(new Date().toISOString());
    //doing the transfer
    currentAccount.movements.push(-amount);
    recieverAcc.movements.push(amount);
    //update the UI to reflect it
    updateUI(currentAccount);

    //rest the timer
    clearInterval(timer);
    timer = startLogoutTimer();
  }
});
///--------EVENT HANDLER FOR LOAN ---------------------------------------------

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  //floor() eill coerce the type to number
  const amount = Math.floor(inputLoanAmount.value);
  //chekcing if amount is greater than 0 and if the highest deposit is at least 10% of the amount requested
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeOut(function () {
      ///adding movement
      currentAccount.movements.push(amount);
      //add Loan date
      currentAccount.movementsDates.push(new Date().toISOString());
      //update ui
      updateUI(currentAccount);

      //rest the timer
      clearInterval(timer);
      timer = startLogoutTimer();
    }, 2500);
  }
  inputLoanAmount.value = '';
  inputLoanAmount.blur();
});

///--------EVENT HANDLER FOR CLOSE ACCOUNT ---------------------------------------------
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  //first check to make sure its the same account thats logged in
  if (
    currentAccount.username === inputCloseUsername.value &&
    //plus sign type coercian
    currentAccount.pin === +inputClosePin.value
  ) {
    // then find the index of the current account by looping over the accounts array and checking for the same username of the current account then return that index number
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    //then splice(remove from array) the array at the index number found from the operation above
    accounts.splice(index, 1);
    //then hide the app
    containerApp.style.opacity = 0;
  }
  //clearing the fields
  inputCloseUsername.value = inputClosePin.value = '';
  inputCloseUsername.blur();
  inputClosePin.blur();
});

///--------EVENT HANDLER FOR SORT BTN ---------------------------------------------
//first we ned a state variable. Otherwise we cant unsort
// let sorted = false;
// btnSort.addEventListener('click', function (e) {
//   e.preventDefault();
//   displayMovements(currentAccount.movements, !sorted);
//   sorted = !sorted;
// });
