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
  const [status, setStatus] = useState("good");
  const [send, setSend] = useState(true);
  const [link, setLink] = useState("");
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
            //   cover={
            //     <img
            //       alt="Solana Card"
            //       src="https://solana.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdark-horizontal.c3a5eb36.svg&w=384&q=75"
            //     />
            //   }
            actions={[
              <Button
                type="link"
                onClick={() =>
                  getSol(secret, setStatus)
                    .then(() => {
                        setStatus("sol received")
                        setSend(false)
                    })
                    .catch((error) => console.log(error))
                }
              >
                get SOL
              </Button>,
              <Button
                type="link"
                disabled={send}
                onClick={() =>
                  sendSol(secret, setStatus, setLink)
                    .then(() => setStatus("finished"))
                    .catch((error) => console.log(error))
                }
              >
                send SOL
              </Button>,
              //   <EllipsisOutlined key="ellipsis" />,
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
  status: string;
  link: string;
};

const Status: FC<StatusPropTypes> = ({ status, link }) => {
  return (
    <div className="status-container">
      <p className="status-label">STATUS: </p>
      <span className="gap"></span>
      <Tag color="cyan" className="tag">
        {status}
      </Tag>
      {link ? (
        <Tag color="blue" className="tag">
          <a href={link} className="link-tag">scan</a>
        </Tag>
      ) : null}
    </div>
  );
};

export default Blockchain;
