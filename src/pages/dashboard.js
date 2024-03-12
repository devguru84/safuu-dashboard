import React, { useState, useEffect } from "react";
import "./CSS/dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { startUp } from "../redux/blockchain/blockchainActions";

export const Dashboard = () => {
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

  const [safuuPrice, setSafuuPrice] = useState(0);
  let blockchain = useSelector((state) => state.blockchain);
  const [supply, setSupply] = useState(0);
  const [treasuryPrice, setTreasuryPrice] = useState(0);
  const [insurancePrice, setInsurancePrice] = useState(0);
  const [deadBalance, setDeadBalance] = useState(0);
  const [marketcap, setMarketCap] = useState(0);
  const [deadPrice, setDeadPrice] = useState(0);
  const dispatch = useDispatch();
  var timer = 0;
  var secondes = 10 * 60;
  const [sec, setSec] = useState({ h: "00", m: "10", s: "00" });

  const countDown = () => {
    if (secondes > 0) secondes--;
    else secondes = 10 * 60;
    setSec(secondsToTime(secondes));
  };

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
    let price = Number(blockchain.price);
    let totalSupply = blockchain.totalSupply;
    let treasuryBalance = blockchain.treasuryBalance;
    let insuranceBalance = blockchain.insuranceBalance;
    let deadBalance = blockchain.deadBalance;
    let lauchtime = blockchain.launchTime;
    const t =
      (new Date(Date.now() + new Date().getTimezoneOffset() * 60000).getTime() /
        1000) |
      0;
    secondes = (t - lauchtime) % 600;
    console.log("seconds", secondes);
    setSafuuPrice(price.toFixed(2));
    setSupply((Number(totalSupply) / 100000).toFixed(2));
    setMarketCap(Number((totalSupply / 100000) * price).toFixed(2));
    setTreasuryPrice((Number(price * treasuryBalance) / 100000).toFixed(2));
    setInsurancePrice((Number(price * insuranceBalance) / 100000).toFixed(2));
    setDeadPrice((Number(price * deadBalance) / 100000).toFixed(2));
    setDeadBalance((Number(deadBalance) / 100000).toFixed(2));
  }, [blockchain]);
  return (
    <div className="dashboard">
      <div className="head_block">
        <div className="block1">
          <div className="inner_block">
            <h4>SUUPER Price</h4>
            <h5>${safuuPrice}</h5>
          </div>
          <div className="inner_block">
            <h4>Market Cap</h4>
            <h5>${marketcap}</h5>
          </div>
          <div className="inner_block">
            <h4>Circulating Supply</h4>
            <h5>{supply}</h5>
          </div>
          <div className="inner_block">
            <h4>Backed Liquidity</h4>
            <h5>100%</h5>
          </div>
          <div className="inner_block">
            <h4>Next Release</h4>
            <h5>
              {sec.h}:{sec.m}:{sec.s}
            </h5>
          </div>
        </div>

        <div className="secondary_block">
          <div className="inner_block2">
            <h4>SUUPER Price</h4>
            <h5>${safuuPrice}</h5>
          </div>
          <div className="inner_block2 right_block">
            <h4>Market Value of Treasury Asset</h4>
            <h5>${treasuryPrice}</h5>
          </div>
        </div>

        <div className="secondary_block">
          <div className="inner_block2">
            <h4>Pool Value</h4>
            <h5>$58.56</h5>
          </div>
          <div className="inner_block2 right_block">
            <h4>SUUPER Insurance Fund Value</h4>
            <h5>${insurancePrice}</h5>
          </div>
        </div>

        <div className="secondary_block">
          <div className="inner_block2">
            <h4># Value of deadAddress</h4>
            <h5>{deadBalance}</h5>
          </div>
          <div className="inner_block2 right_block">
            <h4>$ Value of deadAddress</h4>
            <h5>${deadPrice}</h5>
          </div>
          <div className="inner_block2 right_block">
            <h4>% deadAddress : Supply</h4>
            <h5>%{(Number(deadBalance) / Number(supply)) * 100}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};
