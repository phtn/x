import { FC } from "react";
import { FaTwitter, FaGithub } from "react-icons/fa";
type DarkFooterPropTypes = {
  title: string;
  screen?: object;
};
const DarkFooter: FC<DarkFooterPropTypes> = ({ title }) => {
  return (
    <div style={styles.container}>
      <a style={styles.icons} href="https://twitter.com/phtn458">
        <FaTwitter size={20} />
      </a>
      <a style={styles.icons} href="https://github.com/phtn">
        <FaGithub size={20} />
      </a>
    </div>
  );
};
const styles = {
  container: {
    color: "papayawhip",
    backgroundColor: "darkcyan",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  icons: {
    margin: "0px 20px",
    color: "inherit",
  },
};
export default DarkFooter;
