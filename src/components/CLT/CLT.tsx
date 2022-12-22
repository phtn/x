import { FC, useRef, useState } from "react";
import { Input, Table, Space, Button } from "antd";
import { textAtomizer } from "./CLT_compute.js";
import columns from "./DataColumns";
import { FaWindowClose } from "react-icons/fa";
import "./CLT.css";

const { TextArea } = Input;

type CLTPropTypes = {
  screen: {
    width: number;
    height: number;
  };
  setComp: (comp: string) => void
};

const CLT: FC<CLTPropTypes> = ({ screen, setComp }) => {
  const [text, setText] = useState("");
  const [view, setView] = useState("chars");
  
  let inputRef: any = useRef(null);
  
  // let visibility = useContext(context);
  // const [visible, setVisible] = useState()

  const renderView = (param: string) => {
    switch (param) {
      case "chars": {
        return textAtomizer(text, false, true);
      }
      case "words": {
        return textAtomizer(text, true);
      }
      case "noSpace": {
        return textAtomizer(text, false, false);
      }
    }
  };

  const handleChange = (event: any) => {
    setText(event.target.value);
  };
  const inputFocus = () => {
    inputRef.current.focus();
  };

  return (
    <>
      <div
        className="container"
        data-testid="clt-main-container"
        style={{
          width: screen.width * 0.9,
          marginTop: screen.height < 400 ? "-2em" : "-8em",
        }}
      >
        <div className="header">
          <h1 id="title" className="heading">
            Central Limit Theorem
          </h1>
          <div style={{ display: "flex" }}></div>
          <button onClick={() => {
            setComp('main')
          }} className="close">
            <span>
              <FaWindowClose size={20} />
            </span>
          </button>
        </div>

        <div className="sub-container">
          <Space direction="vertical" style={styles.textArea}>
            <TextArea
              value={text}
              rows={3}
              maxLength={2000000}
              size="large"
              placeholder="Type here... or Paste an entire book..."
              onChange={handleChange}
              autoFocus={true}
              wrap="hard"
              ref={inputRef}
              data-testid="text-area"
            />

            {text && (
              <Space direction="horizontal" style={styles.menu}>
                <Button
                  size="small"
                  type="dashed"
                  onClick={() => setView("chars")}
                  disabled={view === "chars" || view === "noSpace"}
                >
                  chars
                </Button>
                <Button
                  size="small"
                  type="dashed"
                  onClick={() =>
                    view === "chars" ? setView("noSpace") : setView("chars")
                  }
                  disabled={view === "words"}
                  style={styles.spaceButton}
                >
                  {view === "chars" ? "no space" : "with space"}
                </Button>
                <Button
                  size="small"
                  type="dashed"
                  onClick={() => setView("words")}
                  disabled={view === "words"}
                >
                  words
                </Button>

                <Button
                  size="small"
                  type="dashed"
                  danger
                  onClick={() => {
                    setText("");
                    inputFocus();
                  }}
                >
                  clear text
                </Button>
              </Space>
            )}
          </Space>
          <div style={styles.results}>
            {text && (
              <>
                <Table
                  dataSource={renderView(view)}
                  columns={columns}
                  rowKey={(item) => item.symbol}
                />
              </>
            )}
            {!text && (
              <div className="clt-svg-container">
                <img
                  src="https://mathigon.org/content/intro-probability/images/densities.svg"
                  alt="clt-img"
                  width={400}
                />
                <h2>About</h2>
                <p>
                  In probability theory, the central limit theorem establishes
                  that, in many situations, when independent random variables
                  are summed up, their properly normalized sum tends toward a
                  normal distribution even if the original variables themselves
                  are not normally distributed. Source: Wikipedia
                </p>

                <p>
                  <i>
                    This experiment shows the CLT of Information.
                  </i>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    // width: "100%",
  },
  title: {
    fontSize: "24px",
    border: "border",
    backgroundColor: "cornflowerblue",
  },
  textArea: {
    width: "100%",
  },
  menu: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  results: {
    overflow: "scroll",
    height: "60vh",
    // border: "1px solid red",
    marginTop: 10,
  },
  spaceButton: {
    width: 100,
  },
};
export default CLT;
