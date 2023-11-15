'use strict';
//DATA
const account1 ={
  owner: 'Esther Obiri',
  movements: [20, 478, -500, 3890, -299, 9000, 3000, 1000],
  interestRate: 1.2,
  pin: 1010,
  movementsDates: [
    '2020-02-05T18:55:21.360Z',
    '2022-08-21T04:23:00.000Z',
    '2023-08-28T17:05:41.700Z',
    '2023-08-05T15:12:41.430Z',
    '2023-08-18T07:00:00.000Z',
    '2023-08-01T04:17:20.000Z',
    '2023-09-11T05:59:55.714Z',
    '2023-09-24T05:19:55.714Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account2 ={
  owner: 'Benjamin Oloye',
  movements: [7000, 678, 900, -2090, -299, -956, 3000, 600],
  interestRate: 0.5,
  pin: 1212,
  movementsDates: [
    '2020-02-05T18:55:21.360Z',
    '2022-08-21T04:23:00.000Z',
    '2023-08-28T17:05:41.700Z',
    '2023-08-05T15:12:41.430Z',
    '2023-08-18T07:00:00.000Z',
    '2023-08-01T04:17:20.000Z',
    '2023-09-11T05:59:55.714Z',
    '2023-09-24T05:19:55.714Z',
  ],
  currency: 'GBP',
  locale: 'en-GB',
};

const account3 ={
  owner: 'Success Elele',
  movements: [1000, -78, 9200, 90, -299, -956, 3700, 5000],
  interestRate: 0.7,
  pin: 1313,
  movementsDates: [
    '2020-02-05T18:55:21.360Z',
    '2022-08-21T04:23:00.000Z',
    '2023-08-28T17:05:41.700Z',
    '2023-08-05T15:12:41.430Z',
    '2023-08-18T07:00:00.000Z',
    '2023-08-01T04:17:20.000Z',
    '2023-09-11T05:59:55.714Z',
    '2023-09-24T05:19:55.714Z',
  ],
  currency: 'USD',
  locale: 'fr-CA',
};

const account4 ={
  owner: 'Jamala Ibeh Obowo',
  movements: [600, -568, 1200, 960, -499, -956, 5700, 6000 ],
  interestRate: 1,
  pin: 1414,
  movementsDates: [
    '2020-02-05T18:55:21.360Z',
    '2022-08-21T04:23:00.000Z',
    '2023-08-28T17:05:41.700Z',
    '2023-08-05T15:12:41.430Z',
    '2023-08-18T07:00:00.000Z',
    '2023-08-01T04:17:20.000Z',
    '2023-09-11T05:59:55.714Z',
    '2023-09-24T05:19:55.714Z',
  ],
  currency: 'EUR',
  locale: 'de-DE',
};

const accounts = [account1, account2, account3, account4];
//SETTING TIME
/* const setDates1 = new Date('February 5 2020 10:55:21.360');
const  setDates2 = new Date(2020, 7, 19, 45, 13, 600);
const  setDates3 = new Date('August 12 2021 10:05:41.700');
const  setDates4 = new Date('December 28 2022 7:12:41.430');
const  setDates5 = new Date('March 15 2023');
const  setDates6 = new Date(2020, 7, 19, 45, 13, 260);
const  setDates7 = new Date();
const  setDates8 = new Date();

console.log(setDates1.toISOString());
console.log(setDates2.toISOString());
console.log(setDates3.toISOString());
console.log(setDates4.toISOString());
console.log(setDates5.toISOString());
console.log(setDates6.toISOString());
console.log(setDates7.toISOString());
console.log(setDates8.toISOString()); */


//ELEMENTS FROM HTML
const acctName = document.querySelector('.name_account');
const bankApp = document.querySelector('.bank_app');
const balanceLabel = document.querySelector('.balance_label');
const date = document.querySelector('.date');
const timerLabel = document.querySelector('.timer_label');

//movements of funds
const transMovements = document.querySelector('.transactions');
const totalBalance = document.querySelector('.total_balance');

//summary
const summaryValueIn = document.querySelector('.summary_value_in');
const summaryValueOut = document.querySelector('.summary_value_out');
const summaryValueInterest = document.querySelector('.summary_value_interest');
const summarySort = document.querySelector('.summary_sort');

//login data
const username = document.getElementById('username');
const password = document.getElementById('password');
const login = document.getElementById('login');

const users = document.querySelector('.user');
const pinNum = document.querySelector('.pin');
const loginBtn = document.querySelector('.user_btn');

//Operational transaction elements
//tranfer to
const transferTo = document.querySelector('.form-input_to');
const transferAmount = document.querySelector('.form-input_number');
const transferBtn = document.querySelector('.transfer_btn');

//loan request
const loanAmount = document.querySelector('.form_input_loan');
const loanEmail = document.querySelector('.form_email');
const loanBtn = document.querySelector('.loan_btn');

//close account
const closeAcctUser = document.querySelector('.form-userAcct');
const closeAcctPin = document.querySelector('.form_input_acctPin');
const closeAcctBtn = document.querySelector('.closeAcct_btn');

//Setting date function
const formatMovementDates = function(date, locale){
  const calcDaysPassed = (date1, date2) =>Math.round(Math.abs(date2 -date1) / (1000 * 60 * 60 * 24));

  const daysPassed =calcDaysPassed(new Date(), date);

  if(daysPassed === 0) return 'Today';
  if(daysPassed === 1) return 'Yesterday';
  if(daysPassed <=30) return `${daysPassed} days ago`;
  
    /* const day = `${date.getDate()}`.padStart(2,0);
        const month = `${date.getMonth() + 1}`.padStart(2,0);
        const year = date.getFullYear();
        return `${day}/${month}/${year} `; */ //LETS do this in a formated in order to be apply aso to the movement dates
    return new Intl.DateTimeFormat(locale).format(date);
}

//Function for formating numbers & currency. this function can be reuseable outside this code, so we need to put all the needed parameters instead of 'currentAcct' variable
const formatCurrency = function(value, locale, currency){
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
}


//display the balance
const displayPrintBalance = function(accts){
  accts.balance = accts.movements.reduce((acc, cur) => acc + cur, 0);
 
  totalBalance.textContent = formatCurrency(accts.balance, accts.locale, accts.currency);
  //`$${accts.balance.toFixed(2)}`;
};

//display the summary
const displaySummary = function (accts){
  //IN
  const sumIn = accts.movements.filter(acct => acct > 0).reduce((acc, acct) => acc + acct, 0);
  //OUT
  const sumOut = accts.movements.filter(acct => acct < 0).reduce((acc, acct) => acc + acct, 0);
  //INTEREST
  const interest = accts.movements.filter(acct => acct > 0).map(deposit => (deposit * accts.interestRate) /100).filter(int=>int >= 1).reduce((acc, int) => acc + int, 0);
 
  //display Content
   summaryValueIn.textContent = formatCurrency(sumIn, accts.locale, accts.currency);//`$${sumIn.toFixed(2)}`;
   summaryValueOut.textContent = formatCurrency(Math.abs(sumOut), accts.locale, accts.currency); //`$${Math.abs(sumOut).toFixed(2)}`;
   summaryValueInterest.textContent = formatCurrency(interest, accts.locale, accts.currency); //`$${interest.toFixed(2)}`;
   
};

//UPDATE THE BALANCES
const updateAcctUI = function(accts){
  //display transactions
  displayMovement(accts);
  //display balance
  displayPrintBalance(accts);
  //display summary
  displaySummary(accts);
}

//creating username in all the accounts
const createUsernames = function(accts){
  accts.forEach(function(acct){
    acct.username = acct.owner.toLowerCase().split(' ').map(names => names[0]).join('');
      });
    };
    createUsernames(accounts);
    //console.log(accounts); //OR
   /*  const createUsername = function(accts){
      accts.forEach(function(acct){
        acct.username = acct.owner.toLowerCase().split(' ').map(function(names){ 
          return names[0];
        }).join('');
        return username;
      });
    };
    createUsername(accounts);
    console.log(accounts); */

    //Creating Email for the account
    const email = function(mails){
      mails.forEach(function(mail){
      mail.emails =`${ mail.owner.toLowerCase().split(' ')[0]}${mail.owner.length}@gmail.com`;
      });
    };
    email(accounts);
    console.log(accounts);

    //Set timer
    const startLogOutTimer = function(){
      //set time to 5 minutes
      let timer = 120;

      const tickFast = function() { 
        const min = String(Math.trunc(timer / 60)).padStart(2, 0)
      const sec = String(timer % 60).padStart(2, 0)
      //in each call, print the remaining time to UI
      timerLabel.textContent = `${min}:${sec}`;
      
      //when 0 seconds, stop the timer and log out user
      if(timer === 0){
        clearInterval(setLogout);
        acctName.textContent = 'Log in to get started';
      bankApp.style.opacity = 0;
      };
      //decrease 1 second
      timer--; //timer = timer -1
    }
  
      //cal the timer every second
      tickFast();
      const setLogout = setInterval(tickFast, 1000);
      return setLogout;
    };

    //Event handler login
    let currentAcct, setLogout;
    //fake log in
      /* currentAcct = account1;
      updateAcctUI(currentAcct);
      bankApp.style.opacity = 100; */


    loginBtn.addEventListener('click', function(e){
      //prevent form from submitting
      e.preventDefault();
      //username input
      currentAcct = accounts.find(acc => acc.username === users.value);

      if(currentAcct ?.pin === Number(pinNum.value)){
        //display UI and message
        acctName.textContent = `Dear ${currentAcct.owner.split(' ')[0]},`;
        bankApp.style.opacity = 100;

        //Creaing current dates and time
        //Experimenting with the API
      const dateAcct = new Date();
      const options = {
        hour: 'numeric',
        minute: 'numeric',
        day: 'numeric',
        month: 'short',// you can still use numeric or 2-digit or short
        year: 'numeric', //or 2-digit
        weekday: 'short'// or long or narrow
      }
      //const locale = navigator.language;

      date.textContent = new Intl.DateTimeFormat(currentAcct.locale, options).format(dateAcct);
     /*  const dateAcct = new Date();
      //formated like this day/month/year
      const day = `${dateAcct.getDate()}`.padStart(2,0);
      const month = `${dateAcct.getMonth() + 1}`.padStart(2,0);
      const year = dateAcct.getFullYear();
      const hours = `${dateAcct.getHours()}`.padStart(2,0);
      const min = `${dateAcct.getMinutes()}`.padStart(2,0);
      date.textContent = `${day}/${month}/${year}, ${hours}:${min} ` */

        //clear login input
        users.value = pinNum.value = '';
        pinNum.blur();

        //set Timer out
        if(setLogout) clearInterval(setLogout);
        setLogout = startLogOutTimer();

        //update UI
        updateAcctUI(currentAcct);
      }
    });

    //filling up other elements from Html

const displayMovement = function(accts, sort = false){

  transMovements.innerHTML = '';

  //sorting our arrays in ascending order
  const sorting = sort ? accts.movements.slice().sort((a, b) => a - b) : accts.movements; //the slice method will help to copy the array in order not to be mutated.

  sorting.forEach(function(mov, i){
    const creditOrDebitType = mov > 0 ? 'CREDIT' : 'DEBIT';

    //setting dates
    const dates = new Date(accts.movementsDates[i]); //this will point to the same index in the accout, bcos of the iteration it will loop 2 arrays at the same time
    
      const displayDate = formatMovementDates(dates, accts.locale);

      //reusing the currency function here
      const NumCurrency = formatCurrency(mov, accts.locale, accts.currency)
     /*  //formating Intl numbers & currency
      const NumCurrency = new Intl.NumberFormat(accts.locale, {
        style: 'currency',
        currency: accts.currency,
      }).format(mov.toFixed(2)); */

    const htmlElements = `
        <div class="alert">
        <div>
        <span class="alert_label trans_label--${creditOrDebitType}"> ${i + 1} ${creditOrDebitType}</span> 
        <span class="alert_date">${displayDate}</span>
        </div>
        <div class="alert_value">${NumCurrency}</div>
    </div>
    `;
    console.log(transMovements.insertAdjacentHTML('afterbegin', htmlElements)); //this html method accept 2 arguments, first s where to add the text, the second is the string containing the new element we want to add (stored in a variable)
  });
};


    //Tranfer funds
    transferBtn.addEventListener('click', function(e){
      e.preventDefault()//use this always for inputs
      const amount = Number(transferAmount.value);
      const receiverAcct = accounts.find(acct => acct.username === transferTo.value);

      transferTo.value = transferAmount.value = '';

      //putting some conditions on how to transfer
      if(amount > 0 && receiverAcct && currentAcct.balance >= amount && receiverAcct?.username !== currentAcct.username){

        //Doing the transfer
        currentAcct.movements.push(-amount);
        receiverAcct.movements.push(amount);

        //add transfer date
        currentAcct.movementsDates.push(new Date().toISOString());
        receiverAcct.movementsDates.push(new Date().toISOString());

        //update UI
        updateAcctUI(currentAcct);

        //reset setLogout to avoid log out after tranfer
        clearInterval(setLogout);
        setLogout = startLogOutTimer();

      }
    });


    //Request for Loan
    loanBtn.addEventListener('click', function(e){
      e.preventDefault();
      const amount = +loanAmount.value;
      const email = accounts.find(mail => mail.emails === loanEmail.value); 

      if(amount > 0 && email && currentAcct.movements.some(acct => acct >= amount * 0.1) ){
        //Set time out
        setTimeout(function (){
          //add money to acct
        currentAcct.movements.push(amount);

        //add loan date
        currentAcct.movementsDates.push(new Date().toISOString());

        //update UI
        updateAcctUI(currentAcct);

        const loanMSG = alert('Are you sure you want a loan?');
        
         //reset setLogout to avoid log out after tranfer
         clearInterval(setLogout);
         setLogout = startLogOutTimer();
        }, 3000);
        
      };
      loanAmount.value = loanEmail.value = '';
    });


    //TO CLOSE ACCOUNT
    closeAcctBtn.addEventListener('click', function(e){
      e.preventDefault();

      //confirm user data
      if(closeAcctUser.value === currentAcct.username && Number(closeAcctPin.value) === currentAcct.pin){
        const index = accounts.findIndex(accts => accts.username === currentAcct.username)

        accounts.splice(index, 1);
        const deleteMsg = alert('Account successfully deleted')
        bankApp.style.opacity = 0;
      }
      closeAcctUser.value = closeAcctPin.value = '';
    });

    //SORTING OUR ACCT
    let sorted = false;//this will help to click the sort and unclick as well
    summarySort.addEventListener('click', function(e){
      e.preventDefault();

      displayMovement(currentAcct.movements, !sorted);
      sorted = !sorted; //this will help to click the sort and unclick as well
    });

      //Using remainder operator %
    balanceLabel.addEventListener('click', function(e){
      e.preventDefault();

      [...document.querySelectorAll('.alert')].forEach(function(row, i){
        //0,2,4,6.....
        if(i % 2 === 0) row.style.backgroundColor = 'skyblue';

        //0,3,6,9....
        if(i % 3 === 0) row.style.backgroundColor = 'pink';
      })
    });




    //USING FLAT() & FLAtMAP() 
    //flat method example
    const arr = [1, 2, [3, 4, 5], 6, 7, [8, 9, 10]];
    console.log(arr.flat());
    //more nested array. here you need to pass an argument base on the deep level or how deep the nested is
    const arr1 = [1, 2, [3, [4, 5], 6], 7, [8, [9, 10]]];
    console.log(arr1.flat(2));

    //TO SUM THE WHOLE MOVEMENTS OF ARRAY
    //using flat()
    const overallAcctSum = accounts.map(acct => acct.movements).flat().reduce((acc, curr) => acc + curr, 0);
    console.log(overallAcctSum);

    //using flatmap()
    const overallAcctSum2 = accounts.flatMap(acct => acct.movements).reduce((acc, curr) => acc + curr, 0);
    console.log(overallAcctSum2);

    //using Array.from() save UI data and to remove the dollar sign
    totalBalance.addEventListener('click', function(){
      const movementsUI = Array.from(document.querySelectorAll('.alert_value'), ego => Number(ego.textContent.replace('$', '')));

      console.log(movementsUI);
    });

    //MORE ARRAY METHOD PRACTICE
    //How to su the entire deposit in the bank
    const bankDepositSum = accounts.flatMap(acct => acct.movements).filter(mov => mov > 0).reduce((acc, sum)=> acc + sum, 0);
    console.log(bankDepositSum);

    //To get how many deposit above 1000 in the bank
    /* const deposit1000 = accounts.flatMAp(acct => acct.movements).filter(mov => mov > 1000).length; //OR */
    const deposit1000 = accounts.flatMap(acct => acct.movements).reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);
    console.log(deposit1000);
    //Prefix ++ operator.
    let a =10;
    console.log(++a); //here it will give us the extact incrensement we want if placed before 'a' otherwise it will return the same value except you logged again the second time to see the result 
    console.log(a);

    //To sum all the credit and debit alert together but in diff objects created;
    const {All_Deposits, All_Debits} = accounts.flatMap(acct => acct.movements).reduce((acc, cur) =>{
      //cur > 0 ?(acc.All_Deposits += cur) : (acc.All_Debits += cur); //OR
     acc[cur > 0 ? 'All_Deposits' : 'All_Debits'] += cur;
      return acc; //remember to return the accumulator when there is a block code after the arrow function in reduce method
    },
    { All_Deposits: 0, All_Debits:0 }
    ); 
    console.log(All_Deposits, All_Debits);

   


