'use strict';

const arr = ['a', 'b', 'c', 'd', 'e',];

//returns a new array from position 2. does not mutate the original
//slice method. does not mutate the array
console.log(arr.slice(2));
//returns a new array between position 2 and 4
console.log(arr.slice(2, 4));
// returns a new array from last 2 positions/elements
console.log(arr.slice(-2));
// returns a new array from last 1 position
console.log(arr.slice(-1));
// returns as shallow copy of original
console.log(arr.slice());
console.log([...arr]);

//splice method. mutates the array
console.log(arr.splice(2));
//removes the last element from the array
console.log(arr.splice(-1));
//removes the element between position 1 and 2
console.log(arr.splice(1, 2));

//reverse method
//mutates the array
const arr2 = ['a', 'b', 'c', 'd', 'e',];
console.log(arr2.reverse());

//concat method
//adds the elements of both arrays
const letters = arr.concat(arr2);
//or
console.log([...arr, arr2]);
console.log(letters);

//join method
//joins the array with '-'
console.log(letters.join('-'));


//at method
const arr3 = [23, 11, 64];
console.log(arr3[0]);
console.log(arr3.at(0));

//getting the last element of an array with an unknown length
//with arr.length
console.log(arr3[arr3.length - 1]);
//0r
//with slice
console.log(arr3.slice(-1)[0]);
//or
//with at
//note that -1 counts from the right to the left
console.log(arr3.at(-1));


/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
// const account1 = {
//     owner: 'Jonas Schmedtmann',
//     movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//     interestRate: 1.2, // %
//     pin: 1111,
// };

// const account2 = {
//     owner: 'Jessica Davis',
//     movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//     interestRate: 1.5,
//     pin: 2222,
// };

// const account3 = {
//     owner: 'Steven Thomas Williams',
//     movements: [200, -200, 340, -300, -20, 50, 400, -460],
//     interestRate: 0.7,
//     pin: 3333,
// };

// const account4 = {
//     owner: 'Sarah Smith',
//     movements: [430, 1000, 700, 50, 90],
//     interestRate: 1,
//     pin: 4444,
// };

// const accounts = [account1, account2, account3, account4];

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
        '2025-07-07T17:01:17.194Z',
        '2025-07-06T23:36:17.929Z',
        '2020-04-12T10:51:36.790Z',
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


//nb. it is good practice to pass the data as a parameter instead of working with a global variable.

const displayMovement = function (acc, sort = false) {
    containerMovements.innerHTML = ''

    const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;



    const formatMovementDate = function (date) {
        const calcDaysPassed = (date1, date2) => Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

        const daysPassed = calcDaysPassed(new Date(), date);
        console.log(daysPassed);

        if (daysPassed === 0) return 'Today';
        if (daysPassed === 1) return 'Yesterday';
        if (daysPassed === 7) return `${daysPassed} days ago`;
        else {

            const day = `${date.getDate()}`.padStart(2, 0);
            const month = `${date.getMonth() + 1}`.padStart(2, 0);
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        }
    };


    movs.forEach(function (mov, i) {
        const type = mov > 0 ? 'deposit' : 'withdrawal';

        const date = new Date(acc.movementsDates[i]);
        const displayDate = formatMovementDate(date);


        const html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">
          ${i + 1} ${type}</div>
                    <div class="movements__date">${displayDate}</div>

          <div class="movements__value">${mov.toFixed(2)}£</div>
        </div>`;
        containerMovements.insertAdjacentHTML('afterbegin', html)
    });
};


const calcDisplayBalance = function (acc) {
    acc.balance = acc.movements.reduce(function (acc, mov) {

        return acc + mov
    }, 0)
    // acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);


    labelBalance.textContent = `${acc.balance.toFixed(2)}`;
}


const calcDisplaySummary = function (acc) {
    const incomes = acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
    labelSumIn.textContent = `${incomes.toFixed(2)}£`;

    const out = acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
    labelSumOut.textContent = `${Math.abs(out).toFixed(2)}£`;

    const interest = acc.movements.filter(mov => mov > 0).map(deposit => deposit * acc.interestRate / 100).filter((int) => { return int >= 1 }).reduce((acc, int) => acc + int, 0);
    labelSumInterest.textContent = `${interest.toFixed(2)}£`
}


// const user = 'Steven Thomas';

const createUserName = function (accs) {
    accs.forEach(function (acc) {
        acc.userName = acc.owner.toLowerCase().split(' ').map(name =>
            name[0]
        ).join('');
    })
}

createUserName(accounts);


const updateUi = function (acc) {
    //display movements
    displayMovement(acc);

    //display balance
    calcDisplayBalance(acc);


    //display summary
    calcDisplaySummary(acc);
}


//Event handler
let currentAccount;


//fake always logged in
currentAccount = account1;
updateUi(currentAccount)
containerApp.style.opacity = 100;


//experimenting with api
const now = new Date();
labelDate.textContent = new Intl.DateTimeFormat('en-US').format(now);

//NB. revisit this

btnLogin.addEventListener('click', function (e) {
    //prevent form from submitting
    e.preventDefault();

    currentAccount = accounts.find(acc => acc.userName === inputLoginUsername.value)
    console.log(currentAccount);

    if (currentAccount?.pin === +(inputLoginPin.value)) {
        //display ui and welcome msg
        labelWelcome.textContent = `welcome back, ${currentAccount.owner.split(' ')[0]}`;
        containerApp.style.opacity = 100;

        //create current date
        const day = `${now.getDate()}`.padStart(2, 0);
        const month = `${now.getMonth() + 1}`.padStart(2, 0);
        const year = now.getFullYear();
        const hour = `${now.getHours()}`.padStart(2, 0);
        const min = `${now.getMinutes()}`.padStart(2, 0);
        labelDate.textContent = `${day}/${month}/${year},${hour}:${min}`;

        //clear input fields
        inputLoginUsername.value = inputLoginPin.value = '';

        inputLoginPin.blur();

        //update ui
        updateUi(currentAccount);

    }
});

btnTransfer.addEventListener('click', function (e) {
    e.preventDefault();
    const amount = +(inputTransferAmount.value);
    const receiverAcc = accounts.find(acc => acc.userName === inputTransferTo.value);

    //clear input fields
    inputTransferAmount.value = inputTransferTo.value = '';

    if (amount > 0 &&
        receiverAcc &&
        currentAccount.balance >= amount &&
        receiverAcc?.userName !== currentAccount.userName
    ) {
        // doing the transfer
        currentAccount.movements.push(-amount);
        receiverAcc.movements.push(amount);


        //add transfer date
        currentAccount.movementsDates.push(new Date().toISOString());
        receiverAcc.movementsDates.push(new Date().toISOString());
        //update ui
        updateUi(currentAccount)

    }

})

btnLoan.addEventListener('click', function (e) {
    e.preventDefault();

    const amount = Math.floor(inputLoanAmount.value);

    if (amount > 0 && currentAccount.movements.some(function (mov) { return mov >= amount * 0.1 })) {
        //add the movement here
        currentAccount.movements.push(amount);


        //add loan date
        currentAccount.movementsDates.push(new Date().toISOString());

        //update ui
        updateUi(currentAccount);
    }

    inputLoanAmount.value = 0;
})

btnClose.addEventListener('click', function (e) {
    e.preventDefault();

    if (inputCloseUsername.value === currentAccount.userName && +inputClosePin.value === currentAccount.pin) {

        const index = accounts.findIndex(acc => acc.userName === currentAccount.userName)

        //delete account
        accounts.splice(index, 1);

        //hide ui
        containerApp.style.opacity = 0;
    }
    inputCloseUsername.value = inputClosePin.value = '';

})


let sorted = false;

btnSort.addEventListener('click', function (e) {
    e.preventDefault();
    displayMovement(currentAccount.movements, !sorted);
    sorted = !sorted;
})







/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES


// filtering out the positives from negatives
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];


console.log(movements);


//checks for equality
console.log(movements.includes(-130));


// checks condition
const anyDeposits = movements.some(function (mov) {
    return mov > 5000;
})
console.log(anyDeposits);

//some and every. nb. sum return true if one condition is met. every returns true if all conditions are met.

console.log(movements.every(mov => mov > 0));
// console.log(account4.movements.every(mov => mov > 0));

//separate callback

const deposit = function (mov) {
    return mov > 0
}
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

//reduce returns the maximum value in the iteration
const max = movements.reduce(function (acc, mov) {
    if (acc > mov) return acc;
    else return mov;
})
console.log(max);
// the accumulator in the reduce method is like a snowball. ineach call of the callback function, it is basically the sum of all the previous values. so in each loop iteration below, we return the updated accumulator(acc) + the current value(curr) so that we can keep adding to it in the next iteration. the zero(0) at the end of the callback function is the initial value we specify ourselves so that the iteration starts at 0, the next iteration starts at 200 because it is the initial value(0) + the current value(200), and the next iteration we add the current value(450)
const balance = movements.reduce(function (acc, cur, i, arr) {
    console.log(`iteration ${i}: ${acc}`);
    return acc + cur
}, 0)
console.log(balance);


let balanceFor = 0;
for (const mov of movements) balanceFor += mov;
console.log(balanceFor);


const deposits = movements.filter(function (mov) {
    return mov > 0;
});

console.log(movements);
console.log(deposits);


const depositsFor = [];
for (const mov of movements)
    if (mov > 0) {
        depositsFor.push(mov)
    }
console.log(depositsFor);

const withdrawals = movements.filter(function (mov) {
    return mov < 0;
})
console.log(withdrawals);

const withdrawalsFinal = [];
for (const mov of movements) if (mov < 0) withdrawalsFinal.push(mov);
console.log(withdrawalsFinal);


/////////////////////////////////////////////////

for (const movement of movements) {
    if (movement > 0) {
        console.log(`you deposited ${movement}`);
    } else {
        console.log(`you withdrew ${Math.abs(movement)}`);
    }
}




//nb. foreach is a higher order function which requires a callback function to tel  it whhat to do. so the call back function basically tells the higher order function(foreach) what it should do.
console.log('---forEach---');
movements.forEach(function (movement) {
    if (movement > 0) {
        console.log(`you deposited ${movement}`);
    } else {
        console.log(`you withdrew ${Math.abs(movement)}`);
    }
})

// using the counter
for (const [i, movement] of movements.entries()) {
    if (movement > 0) {
        console.log(`movement ${i + 1}: you deposited ${movement}`);
    } else {
        console.log(`movement ${i + 1}: you withdrew ${Math.abs(movement)}`);
    }
}

console.log('---forEach---');
//nb. make sure the order of the arguements are the same as below
movements.forEach(function (movement, index, array) {
    if (movement > 0) {
        console.log(`movement ${index + 1}: you deposited ${movement}`);
    } else {
        console.log(`movement ${index + 1}: you withdrew ${Math.abs(movement)}`);
    }
})

//when should we use foreach or for of. use for of if you want to break out of loop.
// for each does not break out.


// map
const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
    console.log(`${key}: ${value}`);
});

//set
//nb. a set doesnt have keys and indexes, only values
const currenciesUnique = new Set(['usd', 'gbp', 'usd', 'eur', 'eur']);
currenciesUnique.forEach(function (value, _, set) {
    console.log(`${value}: ${value}`);
});


// const movEg = movements.filter(function (mov) {
//     return mov > 0;
// })


// const euroToUsd = 1.1;
// const egMov = movEg.map(function (mov) {
//     return mov * euroToUsd;
// })

// const redMov = egMov.reduce(function (acc, mov) {
//     return acc + mov
// }, 0)

// console.log(redMov);

// or with chaining

const euroToUsd = 1.1;
//PIPELINE
const totalDeposit = movements.filter(mov => mov > 0).map(mov => mov * euroToUsd).reduce((acc, mov) => acc + mov)
console.log(totalDeposit);

for (const account of accounts) {
    if (account.owner === 'Jessica Davis')
        console.log();
}


//flat stores shallow nested arrays into 1 array
const arrX = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arrX.flat());


//using flat and an argument (1,2) in its brackets stores deeply nested arrays into 1 array deepending on the depth of the nesting level
const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2));


//merging all the accounts movement into one account array
const accountMovements = accounts.map(function (acc) {
    return acc.movements;

})

console.log(accountMovements);

const allMovements = accountMovements.flat();
console.log(allMovements);

const overalBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);

//lets make it easier and cleaner with optional chaining
const allMovementsX = accounts.map(acc => acc.movements).flat().reduce((acc, mov) => acc + mov, 0);
console.log(allMovementsX);

//lets make it easier and cleaner with optional chaining and flatMap. nb. flatMap goes only 1 level deep in nesting
const allMovementsA = accounts.flatMap(acc => acc.movements).reduce((acc, mov) => acc + mov, 0);
console.log(allMovementsA);


//sorting arrays alpabetically with strings
const owners = ['jonas', 'zack', 'adam', 'martha'];
console.log(owners.sort());

//sort with numbers. nb. this method doesnt really work as it sorts the numbers as if they were alphabets. use method below
console.log(movements.sort());

//if we return < 0, A will be sorted before B/ keep order
//if we return > 0, B, A/ switch order

//sorting in ascending order
// movements.sort(function (a, b) {
//     if (a > b) return 1;
//     if (a < b) return -1;
// })
// console.log(movements);
movements.sort((a, b) => a - b);
console.log(movements);

//sorting in descending order
// movements.sort(function (a, b) {
//     if (a > b) return -1;
//     if (a < b) return 1;
// })
// console.log(movements);

movements.sort((a, b) => b - a);
console.log(movements);

//alt ways of creating arrays
const x = new Array(7);
console.log(x);
// x.fill(1)

//like the slice method, fill we can also indicate what index we want to start from. so in the example below, 1 will start from index 3 and end at 4
x.fill(1, 3, 5)

//array.from
const y = Array.from({ length: 7 }, () => 1)
console.log(y);

//creating an array programatically
const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);

// const rando = new Array
const rand = Array.from({ length: 100 }, function () {
    return Math.floor(Math.random() * 6 + 1);
})
console.log(rand);


labelBalance.addEventListener('click', function () {
    const movementsUi = Array.from(document.querySelectorAll('.movements__value'), el => Number(el.textContent.replace('£', '')));

    console.log(movementsUi);
    //or

    const movementsUi2 = [...document.querySelectorAll('.movements__value')]
})

//1
const bankDepositSum = accounts.flatMap(acc => acc.movements).filter(mov => mov > 0).reduce((sum, curr) => sum + curr, 0);
console.log(bankDepositSum);

//2
// const numDeposits100 = accounts.flatMap(acc => acc.movements)
//     .filter(mov => mov >= 1000).length;
// console.log(numDeposits100);

//3
const numDeposits100 = accounts.flatMap(acc => acc.movements)
    .reduce((count, curr) => curr >= 1000 ? count + 1 : count, 0);
console.log(numDeposits100);

//prefixed ++ operator
let a = 10;
console.log(++a);
console.log(a);

//sorting the sum of deposits and withdrawals of acccounts into an obj
const sums = accounts.flatMap(acc => acc.movements)
    .reduce((sums, curr) => {
        // curr > 0 ? sums.deposits += curr : sums.withdrawals += curr;
        //or
        sums[curr > 0 ? 'deposits' : 'withdrawals'] += curr;
        return sums;
    }, { deposits: 0, withdrawals: 0 })
console.log(sums);


// const bankDepositSum = accounts.flatMap(acc => acc.movements).filter(mov => mov > 0).reduce((sum, curr) => sum + curr, 0);
// console.log(bankDepositSum);

// const sumss = accounts.flatMap(acc => acc.movements)
//     .reduce((sumss, curr) => {
//         curr[i] === 0 ? sumss += curr[i] : sumss;
//         return sumss;
//     }, accounts[i])

// console.log(sumss);

//4
const convertTiltleCase = function (title) {
    const capitalize = str => str[0].toUpperCase() + str.slice(1)
    const exceptions = ['a', 'an', 'and', 'the', 'or', 'on', 'in', 'with'];

    const titleCase = title.toLowerCase().split(' ')
        .map(word => exceptions.includes(word) ? word : capitalize(word))
        .join(' ');
    return capitalize(titleCase);
}
console.log(convertTiltleCase('this is a nice title'));
console.log(convertTiltleCase('this is a LONG title but not too long'));
console.log(convertTiltleCase('here is another example DONE'));



//convert 
console.log(Number('23'));
console.log(+'23');

//parsing
console.log(Number.parseInt('30px', 10));
console.log(Number.parseInt('e23', 10));


//go to to read if theres a value in a string
console.log(Number.parseFloat('2.5rem'));


// to check if value is not a number
console.log(Number.isNaN(20));
console.log(Number.isNaN('20'));
console.log(Number.isNaN(+'20x'));
console.log(Number.isNaN(23 / 0));


// better way of checking is a value is a number    
console.log(Number.isFinite(20));
console.log(Number.isFinite('20'));
console.log(Number.isFinite(+'20x'));
console.log(Number.isFinite(20 / 0));


console.log(Number.isInteger(23));
console.log(Number.isInteger(23.0));
console.log(Number.isInteger(23 / 0));


console.log(Math.sqrt(25));
console.log(25 ** (1 / 2));
console.log(8 ** (1 / 3));

console.log(Math.max(3, 5, 6, 23, 3));
console.log(Math.min(3, 5, 6, 23, 3));


//calculating the area of a circle
console.log(Math.PI * Number.parseFloat('10px') ** 2);

console.log(Math.trunc(Math.random() * 6) + 1);

const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + 1) + min;
console.log(randomInt(10, 20));

//rounding integers
console.log(Math.trunc(23.3));

console.log(Math.round(23.3));
console.log(Math.round(23.9));

console.log(Math.ceil(23.3));
console.log(Math.ceil(23.9));

console.log(Math.floor(23.3));
console.log(Math.floor('23.9'));

console.log(Math.trunc(-23.3));
console.log(Math.floor(-23.9));

//rounding decimals
//tofixed returns a string
console.log((2.7).toFixed(0));
console.log((2.7).toFixed(3));
console.log((2.345).toFixed(2));

//always note that the + sign will convert string to a number
console.log(+(2.345).toFixed(2));

//remainder operator
console.log(5 % 2);
console.log(5 / 2); // 5 =2 * 2 + 1

console.log(8 % 3);
console.log(8 / 3); // 8 = 2 * 3 + 2

//remainder operator for even numbers
console.log(6 % 2);
console.log(6 / 2);

//remainder operator for odd numbers
console.log(7 % 2);
console.log(7 / 2);

const isEven = n => n % 2 === 0;
console.log(isEven(8));
console.log(isEven(23));
console.log(isEven(514));

labelBalance.addEventListener('click', function () {

    [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {

        //0, 2, 4, 6 ...
        if (i % 2 === 0) row.style.backgroundColor = ' orangered';

        // 0, 3, 6, 9 ...
        if (i % 3 === 0) row.style.backgroundColor = 'yellowgreen';
    })
});

//numeric separators
// 287,460, 000,000
const diameter = 287_460_000_000;
console.log(diameter);

const priceCents = 345_99;
console.log(priceCents);

const transferFee1 = 15_00;
const transferFee2 = 1_500;

const PI = 3.1415;
console.log(PI);

console.log(Number('230_000'));
console.log(parseInt('230_000'));


console.log(2 ** 52 - 1);
console.log(Number.MAX_SAFE_INTEGER);
console.log(2 ** 53 + 1);

console.log(1232133454355645655645);
console.log(1232133454355645655645n);
console.log(BigInt(6743859385948));


//operations with bigint
console.log(10000n + 10000n);

const huge = 438738753785n;
const num = 23;
console.log(huge + BigInt(num));

//exceptions for string concatenations
console.log(20n > 15);
console.log(20n === 20);
console.log(typeof 20n);
console.log(typeof 20n);
console.log(20n == '20');

//divisions
console.log(11n / 3n);
console.log(10 / 3);


//dates and time
//create a date
//1st way
// const noww = new Date();
// console.log(now);

// 2nd way
// console.log(new Date('Mar 02 2025 18:00:00'));
// console.log(new Date('December 24, 2025'));


// console.log(new Date(account1.movementsDates[0]));

// console.log(new Date(2037, 10, 19, 15, 23, 5));
// console.log(new Date(2037, 10, 31));

// console.log(new Date(0));
// console.log(new Date(3 * 24 * 60 * 60 * 1000));

//working with dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getDay());
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString());
console.log(future.getTime());

console.log(Date.now());

future.setFullYear(2040);
console.log(future);



const futureDay = new Date(2037, 10, 19, 23);
console.log(+futureDay);

const calcDaysPassed = (date1, date2) => Math.abs(date2 - date1) / (1000 * 60 * 60 * 24)

const days1 = calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 14))
console.log(days1);