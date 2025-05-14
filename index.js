import { KiteConnect } from "kiteconnect";
require('dotenv').config();
const apiKey = process.env.API_KEY;
const apiSecret = process.env.API_SECRET;
const requestToken = "";

const access_token  = ""; 
const kc = new KiteConnect({ api_key: apiKey });

// console.log(kc.getLoginURL())
async function init() {
  try {
    kc.setAccessToken(access_token)
    await generateSession();
    // await getHolding();
    // await getProfile();
    // await getProfile();
  } catch (err) {
    console.error(err);
  }
}

async function getProfile(){
  try {
    const profile = await kc.placeOrder("regular",{
      exchange:"NSE",
      tradingsymbol: "ITC",
      transaction_type:"BUY",
      quantity:10,
      product:"CNC",
      order_type:"MARKET"
    });

    console.log(profile);
  } catch (err) {
    console.log(err)
  }
}
// kc.placeOrder()
async function generateSession() {
  try {
    // const response = await kc.generateSession(requestToken, apiSecret);
    // console.log(response.access_token);
    // kc.setAccessToken(response.access_token);
    // console.log("Session generated:", response);

    const profile = await kc.placeOrder("regular",{
      exchange:"NSE",
      tradingsymbol: "MRF",
      transaction_type:"BUY",
      quantity:1,
      product:"CNC",
      order_type:"MARKET"
    });
    console.log(profile);
  } catch (err) {
    console.error("Error generating session:", err);
  }
}

// async function getProfile() {
//   try {
//     const profile = await kc.getProfile();
//     console.log("Profile:", profile);
//   } catch (err) {
//     console.error("Error getting profile:", err);
//   }
// }
async function getHolding(){
    try{
        const eqHold = await kc.getHoldings();
        console.log(eqHold)
    }
    catch(err){
        console.err(err);
    }
}

async function getmfHolding() {
    try {
        await kc.invalidateAccessToken();
        // await kc.renewAccessToken();
        console.log("Access token renewed successfully.");
        // You can add more logic here after token renewal
    } catch (error) {
        console.error("Failed to renew access token:", error);
        // Optional: handle error, maybe retry or notify the user
    }
}


// Initialize the API calls
// init();
// getHolding();
// getmfHolding();


// export async function placeOrder(stock, qty, type){
//   try {
//     kc.setAccessToken(access_token)
//     await kc.placeOrder("regular",{
//       exchange:"NSE",
//       tradingsymbol: stock,
//       transaction_type:type,
//       quantity:qty,
//       product:"CNC",
//       order_type:"MARKET"
//     });
//   } catch (error) {
//     console.log(error)
//   }
// }


export async function placeOrder(stock, qty, type) {
  try {
    kc.setAccessToken(access_token);

    await kc.placeOrder("regular", {
      exchange: "NSE",
      tradingsymbol: stock,
      transaction_type: type,
      quantity: qty,
      product: "CNC",
      order_type: "MARKET",
    });

    console.log(`Order placed: ${type} ${qty} of ${stock}`);
  } catch (error) {
    console.error("Error placing order:", error);
    // throw error; // Re-throw for upstream error handling
  }
}
// init()