import { Button } from "antd";
import { FC } from "react";
import { GoGraph, GoFlame } from "react-icons/go";
import { RiBitCoinLine } from "react-icons/ri";
import { GiCrossedChains } from "react-icons/gi";

type MainPropTypes = {
  screen: {
    width: number;
    height: number;
  };
  setComp: (comp: string) => void;
};

const Main: FC<MainPropTypes> = ({ screen, setComp }) => {
  return (
    <>
      <div
        style={{ width: screen.width * 0.9, height: 400 }}
        className="container"
      >
        <div className="menu">
          <Button
            onClick={() => setComp("clt")}
            style={{ width: "50%", height: 200, borderRadius: 0 }}
          >
            <div>
              <GoGraph size={42} />
            </div>
            <div>CLT</div>
          </Button>
          <Button
            onClick={() => setComp("crypto")}
            style={{ width: "50%", height: 200, borderRadius: 0 }}
          >
            <div>
              <RiBitCoinLine size={42} />
            </div>
            <div>Exchange Rate</div>
          </Button>
        </div>

        <div className="menu">
          <Button
            onClick={() => setComp("main")}
            style={{ width: "50%", height: 200, borderRadius: 0 }}
          >
            <div>
              <GiCrossedChains size={42} />
            </div>
            <div>Blockchain</div>
          </Button>
          <Button
            onClick={() => setComp("main")}
            style={{ width: "50%", height: 200, borderRadius: 0 }}
          >
            <div>
              <GoFlame size={42} />
            </div>
            <div>Firebase</div>
          </Button>
        </div>
      </div>
    </>
  );
};
export default Main;
