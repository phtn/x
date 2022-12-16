import { FC, useRef, useState } from "react";
import { Input, Table, Space, Button } from "antd";
import { textAtomizer } from "./CLT_compute.js";
import columns from "./DataColumns";
import "./CLT.css";

const { TextArea } = Input;

const CLT: FC = () => {
  const [text, setText] = useState("");
  const [view, setView] = useState("chars");
  let inputRef: any = useRef(null);

  const renderView = (param: string) => {
    switch(param){
        case 'chars':{ return textAtomizer(text, false)}
        case 'words':{ return textAtomizer(text, true)}
      }
  }
  const handleChange = (event: any) => {
    setText(event.target.value);
  };
  const inputFocus = () => {
    inputRef.current.focus();
  };

  return (
    <>
      <div style={styles.container}>
        <div style={styles.title}>
          <h1 id="title">Information Central Limit Theorem</h1>
        </div>
        <Space direction="vertical" style={styles.textArea}>
          <TextArea
            value={text}
            rows={3}
            maxLength={2000000}
            size="large"
            placeholder="type here..."
            onChange={handleChange}
            autoFocus={true}
            wrap="hard"
            ref={inputRef}
          />
          {text && (
            <Space direction="horizontal" style={styles.menu}>
              <Button type="dashed" onClick={()=> setView('chars')} >chars</Button>
              <Button type="dashed" onClick={()=> setView('words')}>words</Button>
              <Button
                type="dashed"
                danger
                onClick={() => {
                  setText("");
                  inputFocus();
                }}
              >
                clear text-area
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
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    maxWidth: 600,
    width: "100%",
    margin: 5,
  },
  title: {
    display: "flex",
    alignItems: "center",
    // justifyContent: "center",
    fontSize: 10,
    minWidth: 375,
  },
  textArea: {
    maxWidth: 600,
    width: "100%",
  },
  menu: {
    display: "flex",
    // justifyContent: "center",
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
