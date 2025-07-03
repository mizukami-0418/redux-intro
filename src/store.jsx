import { combineReducers, createStore } from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan": // Prevent multiple loans
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };

    default:
      return state;
  }
}

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalId: action.payload.nationalId,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return { ...state, fullName: action.payload };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

// store.dispatch({
//   type: "account/deposit",
//   payload: 500,
// });

// console.log("ハロー、Redux!");
// console.log("初期状態:", store.getState());
// store.dispatch({
//   type: "account/withdraw",
//   payload: 200,
// });
// console.log(store.getState());
// store.dispatch({
//   type: "account/requestLoan",
//   payload: { amount: 1000, purpose: "車の購入" },
// });
// console.log(store.getState());
// store.dispatch({
//   type: "account/payLoan",
// });
// console.log(store.getState());

// const ACCOUNT_DEPOSIT = "account/deposit";
// const ACCOUNT_WITHDRAW = "account/withdraw";
// const ACCOUNT_REQUEST_LOAN = "account/requestLoan";
// const ACCOUNT_PAY_LOAN = "account/payLoan";

function deposit(amount) {
  return {
    type: "account/deposit",
    payload: amount,
  };
}
function withdraw(amount) {
  return {
    type: "account/withdraw",
    payload: amount,
  };
}
function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}
function payLoan() {
  return {
    type: "account/payLoan",
  };
}

store.dispatch(deposit(500));
console.log(store.getState());
store.dispatch(withdraw(200));
console.log(store.getState());
store.dispatch(requestLoan({ amount: 1000, purpose: "車の購入" }));
console.log(store.getState());
store.dispatch(payLoan());
console.log(store.getState());

function createCustomer(fullName, nationalId) {
  return {
    type: "customer/createCustomer",
    payload: {
      fullName,
      nationalId,
      createdAt: new Date().toISOString(),
    },
  };
}

function updateName(fullName) {
  return {
    type: "customer/updateName",
    payload: fullName,
  };
}

store.dispatch(createCustomer("山田太郎", "1234567890"));
console.log(store.getState());
store.dispatch(updateName("山田花子"));
console.log(store.getState());
store.dispatch(deposit(1000));
console.log(store.getState());
