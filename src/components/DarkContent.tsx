// import BlockchainContent from './XRP/Blockchain'
import { FC, useState } from "react";
import CLT from "./CLT/CLT";
import Crypto from "./Crypto/Crypto";
import Main from "./Main/Main";

type DarkContentPropTypes = {
  screen: {
    width: number;
    height: number;
  };
};

const DarkContent: FC<DarkContentPropTypes> = ({ screen }) => {
  const [comp, setComp] = useState("main");
  

  const renderComponent = (component: string) => {
    switch (component) {
      case "main":
        return <Main screen={screen} setComp={setComp} />
      case "clt":
        return <CLT screen={screen} setComp={setComp} />;
      case "crypto":
        return <Crypto screen={screen} setComp={setComp}/>;
    }
  };

  return (
    <div style={styles.container}>
      {renderComponent(comp)}
    </div>
  );
};
const styles = {
  container: {
    color: "#243447",
    backgroundColor: "#666",
    height: "100%",
    justifyContent: "center",
    display: "flex",
    overflow: "hidden",
  },
};
export default DarkContent;
