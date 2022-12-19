import { FC, useRef, useState } from "react";
import { Input, Table, Space, Button } from "antd";
import { textAtomizer } from "./CLT_compute.js";
import columns from "./DataColumns";
import "./CLT.css";

const { TextArea } = Input;

type CLTPropTypes = {
  screen: {
    width: number,
    height: number
  }
}

const CLT: FC<CLTPropTypes> = ({screen}) => {
  const [text, setText] = useState("");
  const [view, setView] = useState("chars");
  let inputRef: any = useRef(null);

  const renderView = (param: string) => {
    switch (param) {
      case "chars": {
        return textAtomizer(text, false);
      }
      case "words": {
        return textAtomizer(text, true);
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
        style={{width: screen.width * 0.9}}
      >
        <div className="header">
          <h1 id="title" className="heading">
            Central Limit Theorem
          </h1>
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
                <Button type="dashed" onClick={() => setView("chars")} disabled={view == 'chars'}>
                  chars
                </Button>
                <Button type="dashed" onClick={() => setView("words")} disabled={view == 'words'}>
                  words
                </Button>
                <Button
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
            {!text && 
              <div className="clt-svg-container">

                <img src="https://mathigon.org/content/intro-probability/images/densities.svg" alt="clt-img" width={500}/>
              </div>
            }
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
    backgroundColor: 'cornflowerblue'
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
};
export default CLT;
