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
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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

const displayMovement = function (movements) {
    containerMovements.innerHTML = ''


    movements.forEach(function (mov, i) {
        const type = mov > 0 ? 'deposit' : 'withdrawal'
        const html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">
          ${i + 1} ${type}</div>
          <div class="movements__value">${mov}£</div>
        </div>`;
        containerMovements.insertAdjacentHTML('afterbegin', html)
    });
};


const calcDisplayBalance = function (acc) {
    acc.balance = acc.movements.reduce(function (acc, mov) {

        return acc + mov
    }, 0)
    // acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);


    labelBalance.textContent = `${acc.balance}`;
}


const calcDisplaySummary = function (acc) {
    const incomes = acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
    labelSumIn.textContent = `${incomes}£`;

    const out = acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
    labelSumOut.textContent = `${Math.abs(out)}£`;

    const interest = acc.movements.filter(mov => mov > 0).map(deposit => deposit * acc.interestRate / 100).filter((int) => { return int >= 1 }).reduce((acc, int) => acc + int, 0);
    labelSumInterest.textContent = `${interest}£`
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
    displayMovement(acc.movements);

    //display balance
    calcDisplayBalance(acc);


    //display summary
    calcDisplaySummary(acc);
}


//Event handler
let currentAccount;


//NB. revisit this

btnLogin.addEventListener('click', function (e) {
    //prevent form from submitting
    e.preventDefault();

    currentAccount = accounts.find(acc => acc.userName === inputLoginUsername.value)
    console.log(currentAccount);

    if (currentAccount?.pin === Number(inputLoginPin.value)) {
        //display ui and welcome msg
        labelWelcome.textContent = `welcome back, ${currentAccount.owner.split(' ')[0]}`;
        containerApp.style.opacity = 100;

        //clear input fields
        inputLoginUsername.value = inputLoginPin.value = '';

        inputLoginPin.blur();

        //update ui
        updateUi(currentAccount);

    }
});

btnTransfer.addEventListener('click', function (e) {
    e.preventDefault();
    const amount = Number(inputTransferAmount.value);
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

        //update ui
        updateUi(currentAccount)

    }

})













/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES


// filtering out the positives from negatives
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];



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