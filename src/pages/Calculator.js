import React, { useState, useEffect } from "react";
import "./CSS/Calculator.css";
import { useDispatch, useSelector } from "react-redux";
import { startUp } from "../redux/blockchain/blockchainActions";

const Calculator = () => {
  const currentAPY = 460367;
  let blockchain = useSelector((state) => state.blockchain);
  const dispatch = useDispatch();
  const [price, setPrice] = useState(0);
  const [apy, setAPY] = useState("");
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [prevPrice, setPrevPrice] = useState("");
  const [futurePrice, setFuturePrice] = useState("");
  const [day, setDay] = useState(30);
  const [initInvest, setInitInvest] = useState("");
  const [potenReturn, setPotenReturn] = useState("");
  const [rewardEstimation, setRewardEstimation] = useState("");

  useEffect(() => {
    dispatch(startUp());
  }, []);
  useEffect(() => {
    let price = blockchain.price;
    setPrice(Number(price).toFixed(2));
    setBalance(blockchain.myBalance);
    setPrevPrice(Number(price).toFixed(2));
    setAmount(blockchain.myBalance);
    setFuturePrice(Number(price).toFixed(2));
    setAPY(Number(blockchain.apy).toFixed(2));
    setAPY(currentAPY);
  }, [blockchain]);

  useEffect(() => {
    if (amount !== "" && prevPrice !== "")
      setInitInvest(Number(amount * prevPrice).toFixed(2));
    if (amount !== "" && apy !== "" && prevPrice !== "" && futurePrice !== "") {
      let perQuarter = (apy / 100.0 + 1) ** (1 / 96.0 / 364.0);
      let num = (day - 1) * 96;
      let reward = amount * (perQuarter ** num - 1);
      setRewardEstimation(reward.toFixed(2));
      let returnable =
        (Number(reward) + Number(amount)) * futurePrice - prevPrice * amount;
      console.log("returnable", Number(reward) + Number(amount));
      setPotenReturn(returnable.toFixed(2));
    }
  }, [amount, apy, prevPrice, futurePrice, day]);

  return (
    <div className="calculator">
      <div className="calc_head">
        <h4>Calculator</h4>
        <h5>Estimate your returns</h5>
      </div>

      <div className="calc_block">
        <div className="calc_inner1">
          <h4>SAFUU Price</h4>
          <h5>${price}</h5>
        </div>
        <div className="calc_inner1 right_block">
          <h4>Current APY</h4>
          <h5>{currentAPY}%</h5>
        </div>
        <div className="calc_inner1 right_block">
          <h4>Your SAFUU Balance</h4>
          <h5>{balance}</h5>
        </div>
      </div>

      <div className="calc_input">
        <div className="div_input">
          <h5>SAFUU Amount</h5>
          <div className="input">
            <input
              style={{ color: "#ffffff", fontSize: "1em" }}
              type="text"
              placeholder="123.."
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <p onClick={() => setAmount(balance)}>Current</p>
          </div>
        </div>
        <div className="div_input right_block">
          <h5>APY(%)</h5>
          <div className="input">
            <input
              style={{ color: "#ffffff", fontSize: "1em" }}
              placeholder="123.."
              type="text"
              value={apy}
              onChange={(e) => setAPY(e.target.value)}
            />
            <p onClick={() => setAPY(currentAPY)}>Current</p>
          </div>
        </div>
      </div>

      <div className="calc_input">
        <div className="div_input">
          <h5>SAFUU price at purchase($)</h5>
          <div className="input">
            <input
              style={{ color: "#ffffff", fontSize: "1em" }}
              placeholder="123.."
              value={prevPrice}
              onChange={(e) => setPrevPrice(e.target.value)}
            />
            <p onClick={() => setPrevPrice(price)}>Current</p>
          </div>
        </div>
        <div className="div_input right_block">
          <h5>Future SAFUU market price ($)</h5>
          <div className="input">
            <input
              style={{ color: "#ffffff", fontSize: "1em" }}
              placeholder="123.."
              value={futurePrice}
              onChange={(e) => setFuturePrice(e.target.value)}
            />
            <p onClick={() => setFuturePrice(price)}>Current</p>
          </div>
        </div>
      </div>

      <div className="calc_range">
        <h5>{day} days</h5>
        <input
          type="range"
          min="1"
          max="365"
          className="slider"
          value={day}
          id="myRange"
          onChange={(e) => setDay(e.target.value)}
        ></input>
      </div>

      <div className="calc_foot">
        <div className="foot_inner">
          <h4>Your initial investment</h4>
          <h5>${initInvest}</h5>
        </div>
        <div className="foot_inner">
          <h4>SAFUU rewards estimation</h4>
          <h5>{rewardEstimation}</h5>
        </div>
        <div className="foot_inner">
          <h4>Potential return</h4>
          <h5>${potenReturn}</h5>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
