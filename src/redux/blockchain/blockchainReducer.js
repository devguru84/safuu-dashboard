const initialState = {
  loading: false,
  account: null,
  smartContract: null,
  web3: null,
  errorMsg: "",
  totalSupply: 0,
  insuranceBalance: 0,
  treasuryBalance: 0,
  price: 0,
  deadBalance: 0,
};

const blockchainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CONNECTION_REQUEST":
      return {
        ...initialState,
        loading: true,
      };
    case "CONNECTION_SUCCESS":
      return {
        ...state,
        loading: false,
        account: action.payload.account,
        smartContract: action.payload.smartContract,
        web3: action.payload.web3,
      };
    case "CONNECTION_FAILED":
      return {
        ...initialState,
        loading: false,
        errorMsg: action.payload,
      };
    case "UPDATE_ACCOUNT":
      return {
        ...state,
        account: action.payload.account,
      };
    case "STARTUP_SUCCESS":
      return {
        ...state,
        totalSupply: action.payload.totalSupply,
        treasuryBalance: action.payload.treasury,
        insuranceBalance: action.payload.insurance,
        price: action.payload.price,
        deadBalance: action.payload.dead,
      };
    default:
      return state;
  }
};

export default blockchainReducer;
