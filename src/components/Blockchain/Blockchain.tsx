import { Avatar, Button, Card, Divider, Tag } from "antd";
import { FC, useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { ComponentPropTypes } from "../../ComponentPropTypes";
import { generateKeypair, getSol, sendSol } from "./Solana";
import Meta from "antd/es/card/Meta";

import "./Blockchain.css";

const Blockchain: FC<ComponentPropTypes> = ({ screen, setComp }) => {
  const [secret, setSecret] = useState<any>();
  const [pub, setPub] = useState<any>();
  const [status, setStatus] = useState({ name: "good", color: "green" });
  const [send, setSend] = useState(true);
  const [link, setLink] = useState("");
  const [confirm, setConfirm] = useState("send SOL");
  return (
    <div
      className="container"
      style={{ width: screen.width * 0.9, height: 400 }}
    >
      <div className="header">
        <h1 id="title" className="heading">
          Blockchain using Solana (Devnet)
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

      {secret ? (
        <div className="big-content">
          <Card
            style={{ width: 300 }}
            actions={[
              <Button
                type="link"
                onClick={() => {
                  setStatus({ name: "processing", color: "blue" });
                  getSol(secret)
                    .then(() => {
                      setStatus({ name: "sol received", color: "green" });
                      setSend(false);
                    })
                    .catch((error) => {
                      setStatus({ name: "error", color: "red" });
                      console.log(error);
                    });
                }}
              >
                get SOL
              </Button>,
              <Button
                type="link"
                disabled={send}
                onClick={() => {
                  setStatus({ name: "sending", color: "blue" });
                  setConfirm("confirm send");
                  sendSol(secret, setLink)
                    .then(() => {
                      setStatus({ name: "sent", color: "green" });
                      setSend(true);
                      setConfirm("sent");
                    })
                    .catch((error) => {
                      setStatus({ name: "error", color: "red" });
                      setConfirm("try again");
                      console.log(error);
                    });
                }}
              >
                {confirm}
              </Button>,
            ]}
          >
            <Meta
              avatar={
                <Avatar src="https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png" />
              }
              title="Solana Card"
              description={pub.toString()}
            />
            <Divider />
            <Status status={status} link={link} />
          </Card>
        </div>
      ) : (
        <div className="big-content">
          <Button
            type="primary"
            size="large"
            className="generate-btn"
            onClick={() => generateKeypair(setSecret, setPub)}
          >
            Generate Solana Keypair
          </Button>
        </div>
      )}
    </div>
  );
};

type StatusPropTypes = {
  status: {
    name: string;
    color: string;
  };
  link: string;
};

const Status: FC<StatusPropTypes> = ({ status, link }) => {
  return (
    <div className="status-container">
      <p className="status-label">STATUS: </p>
      <span className="gap"></span>
      <Tag color={status.color} className="tag">
        {status.name}
      </Tag>
      {link ? (
        <Tag color="purple" className="tag">
          <a href={link} className="link-tag">
            view
          </a>
        </Tag>
      ) : null}
    </div>
  );
};

export default Blockchain;
