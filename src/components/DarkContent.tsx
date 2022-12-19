import { FC } from "react";
import CLT from "./CLT/CLT";
// import BlockchainContent from './XRP/Blockchain'
// import Crypto from './Crypto/Crypto'
type DarkContentPropTypes = {
  screen: {
    width: number,
    height: number
  }
}

const DarkContent: FC<DarkContentPropTypes> = ({screen}) => {
  return (
      <div style={styles.container}>
        <CLT screen={screen}/>
      </div>
  );
}
const styles = {
  container: {
    color: "#243447",
    backgroundColor: "#F6F6F6",
    height: "100%",
    justifyContent: "center",
    display: "flex",
    overflow: "hidden",
  },
};
export default DarkContent;
