import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startUp } from "../redux/blockchain/blockchainActions";
import "./CSS/Account.css";

const Account = () => {
  const secondsToTime = (secs) => {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      h: hours.toString(),
      m: minutes.toString(),
      s: seconds.toString(),
    };
    return obj;
  };
  const currentAPY = 460367;
  const dispatch = useDispatch();
  let blockchain = useSelector((state) => state.blockchain);
  const [myValue, setMyValue] = useState(0);
  const [myBalance, setMyBalance] = useState(0);
  const [apy, setAPY] = useState(0);
  const [dailyROI, setDailyROI] = useState(0);
  const [sec, setSec] = useState({ h: "00", m: "00", s: "00" });
  const [price, setPrice] = useState(0);
  const [nextRewardSAFUU, setNextRewardSafuu] = useState(0);
  const [nextRewardUSD, setNextRewardUSD] = useState(0);
  const [nextRewardYield, setNextRewardYield] = useState(0);
  const [roi1USD, setRoi1USD] = useState(0);
  const [roi5, setRoi5] = useState(0);
  const [roi5USD, setRoi5USD] = useState(0);

  var timer = 0;
  var secondes = 10 * 60;
  const countDown = () => {
    if (secondes > 0) secondes--;
    else secondes = 10 * 60;
    setSec(secondsToTime(secondes));
  };
  useEffect(() => {
    dispatch(startUp());
  }, []);
  useEffect(() => {
    const t =
      (new Date(Date.now() + new Date().getTimezoneOffset() * 60000).getTime() /
        1000) |
      0;
    console.log("t", t);
    if (timer > 0) clearInterval(timer);
    timer = setInterval(countDown, 1000);
    dispatch(startUp());
  }, []);
  useEffect(() => {
    let lauchtime = blockchain.launchTime;
    const t =
      (new Date(Date.now() + new Date().getTimezoneOffset() * 60000).getTime() /
        1000) |
      0;
    secondes = 600 - ((t - lauchtime) % 600);
    setPrice(Number(blockchain.price).toFixed(2));
    if (blockchain.myBalance == 0) {
      setMyValue(
        (Number(blockchain.price) * Number(blockchain.myBalance)).toFixed(2)
      );
      setMyBalance(Number(blockchain.myBalance).toFixed(2));
    }
    setAPY(currentAPY);
    let perQuarter = (apy / 100.0 + 1) ** (1 / 96.0 / 364.0);
    setNextRewardYield(perQuarter.toFixed(2));
    setNextRewardSafuu((Number(blockchain.myBalance) * perQuarter).toFixed(2));
    setNextRewardUSD(
      (
        Number(blockchain.price) *
        Number(blockchain.myBalance) *
        perQuarter
      ).toFixed(2)
    );
    let _roi1 = (perQuarter ** 96 - 1) * blockchain.myBalance;
    let _roi1_Per = (perQuarter ** 96 - 1) * 100;
    let _roi5 = (perQuarter ** 480 - 1) * 100;
    let _roi5USD = (perQuarter ** 480 - 1) * blockchain.myBalance;
    setRoi1USD(_roi1.toFixed(2));
    setDailyROI(_roi1_Per.toFixed(2));
    setRoi5(_roi5.toFixed(2));
    setRoi5USD(_roi5USD.toFixed(2));
  }, [blockchain]);
  return (
    <div className="account">
      <div className="first_block">
        <div className="block_inner">
          <h4>Your Balance</h4>
          <h3>${myValue}</h3>
          <h5>{myBalance}SUUPER</h5>
        </div>
        <div className="block_inner right_block">
          <h4>APY</h4>
          <h3>{apy}%</h3>
          <h5>Daily ROI {dailyROI}%</h5>
        </div>
        <div className="block_inner right_block">
          <h4>Next rebase:</h4>
          <h3>
            {sec.m}:{sec.s}
          </h3>
          <h5>You will earn money soon</h5>
        </div>
      </div>

      <div className="block2">
        <div className="block2_inner">
          <h4>Current SUUPER Price</h4>
          <h5>${price}</h5>
        </div>
        <div className="block2_inner">
          <h4>Next Reward Amount</h4>
          <h5>{nextRewardSAFUU}SUUPER</h5>
        </div>
        <div className="block2_inner">
          <h4>Next Reward Amount USD</h4>
          <h5>${nextRewardUSD}</h5>
        </div>
        <div className="block2_inner">
          <h4>Next Reward Yield</h4>
          <h5>{nextRewardYield}%</h5>
        </div>
        <div className="block2_inner">
          <h4>ROI(1-Day Rate) USD</h4>
          <h5>${roi1USD}</h5>
        </div>
        <div className="block2_inner">
          <h4>ROI(5-Day Rate)</h4>
          <h5>{roi5}%</h5>
        </div>
        <div className="block2_inner">
          <h4>ROI(5-Day Rate) USD</h4>
          <h5>${roi5USD}</h5>
        </div>
      </div>
    </div>
  );
};

export default Account;
