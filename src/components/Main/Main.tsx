import { Button } from "antd";
import { FC } from "react";
import { GoGraph } from "react-icons/go";
import { RiBitCoinLine } from "react-icons/ri";
import { GiCrossedChains } from "react-icons/gi";
import { SiFirebase } from "react-icons/si";
import { ComponentPropTypes } from "../../ComponentPropTypes";

const Main: FC<ComponentPropTypes> = ({ screen, setComp }) => {
  return (
    <>
      <div
        style={{ width: screen.width * 0.9, height: 400 }}
        className="container"
      >
        <div className="menu">
          <Button onClick={() => setComp("clt")} style={styles.menuBtn}>
            <div>
              <GoGraph size={42} />
            </div>
            <div>CLT</div>
          </Button>
          <Button onClick={() => setComp("crypto")} style={styles.menuBtn}>
            <div>
              <RiBitCoinLine size={42} />
            </div>
            <div>Exchange Rate</div>
          </Button>
        </div>

        <div className="menu">
          <Button onClick={() => setComp("blockchain")} style={styles.menuBtn}>
            <div>
              <GiCrossedChains size={42} />
            </div>
            <div>Blockchain</div>
          </Button>
          <Button onClick={() => setComp("firebase")} style={styles.menuBtn}>
            <div>
              <SiFirebase size={42} />
            </div>
            <div>Firebase</div>
          </Button>
        </div>
      </div>
    </>
  );
};

const styles = {
  menuBtn: {
    width: "50%",
    height: 200,
    borderRadius: 0,
  },
};
export default Main;
