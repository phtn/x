import { FC, ReactNode, useState } from "react";
import { Button, Select, Spin } from "antd";
import { FaWindowClose } from "react-icons/fa";
import axios from "axios";
import { options } from "./CryptoOptions";
import { ComponentPropTypes } from "../../ComponentPropTypes";
import "./Crypto.css";

const Crypto: FC<ComponentPropTypes> = ({ screen, setComp }) => {
  const [base, setBase] = useState("BTC");
  const [qoute, setQoute] = useState("USD");
  const [data, setData] = useState({ rate: 0 });
  const [loading, setLoading] = useState(false)

  async function fetchExchangeRate() {
    setLoading(true)
    axios
      .get(`https://rest.coinapi.io/v1/exchangerate/${base}/${qoute}?`, {
        headers: { "X-CoinAPI-Key": process.env.REACT_APP_COIN_API_KEY },
      })
      .then(function (response) {
        setData(response.data);
        setLoading(false)
      });
  }

  const handleBaseChange = (target: { value: string; label: ReactNode }) => {
    setBase(target.value);
  };
  const handleQouteChange = (target: { value: string; label: ReactNode }) => {
    setQoute(target.value);
  };

  return (
    <div
      className="container"
      style={{ width: screen.width * 0.9, height: 400 }}
    >
      <div className="header">
        <h1 id="title" className="heading">
          Crypto Exchange Rate
        </h1>
        <div style={{ display: "flex" }}></div>
        <button
          onClick={() => {
            setComp("main");
          }}
          className="close"
        >
          <span>
            <FaWindowClose size={20} />
          </span>
        </button>
      </div>
      <div className="content">
        <Select
          labelInValue
          defaultValue={{ value: base, label: base }}
          style={{ width: 150 }}
          onChange={handleBaseChange}
          options={options}
        />
        <div className="gap"></div>

        <Select
          labelInValue
          defaultValue={{ value: qoute, label: qoute }}
          style={{ width: 150 }}
          onChange={handleQouteChange}
          options={options}
        />
      </div>
      <div className="content">
        <Button className="get" size="large" type="primary" onClick={() => fetchExchangeRate()}>
          Get Exchange Rate
        </Button>
      </div>
      <div className="content">
        <span className="rate">
          {loading ? <Spin/> : data.rate}{" "}
          <span className="qoute">
            <b>{qoute}</b>
          </span>
        </span>
      </div>
    </div>
  );
};

export default Crypto;

// MongoDB password for phtn458 user
// 5MyqY23whR5Xwn3e
