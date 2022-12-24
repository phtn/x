import { FC, ReactNode, useState } from "react";
import { FaWindowClose, FaApple } from "react-icons/fa";
import { SiRazer } from "react-icons/si";
import { RiAliensLine, RiAddLine } from "react-icons/ri";
import { ComponentPropTypes } from "../../ComponentPropTypes";
import { Button, Spin, Table, Tabs } from "antd";
import { getDocs, collection } from "firebase/firestore/lite";
import { db } from "../../db/db";
import columns from "./TableColumns";
import AddProduct from "./AddProduct";
import "./Firebase.css";

type ItemLabelPropTypes = {
  name: string;
  icon: ReactNode;
};

type ProductTablePropTypes = {
  data: object[];
};

const FirebaseProduct: FC<ComponentPropTypes> = ({ screen, setComp }) => {
  const [tabDisabled, setTabDisabled] = useState(true);
  const [data, setData] = useState<object[]>([]);
  const [spin, setSpin] = useState(false);
  const [activeKey, setActiveKey] = useState("0");
  const handleChange = (key: string) => {
    setActiveKey(key);
  };

  const fetchData = async () => {
    const items: Array<object> = [];
    setSpin(true);

    // Firestore Query
    const querySnapshot = await getDocs(collection(db, "products"));
    querySnapshot.forEach((doc) => {
      items.push(doc.data());
    });
    setData(items);
    setTabDisabled(false);
    setSpin(false);
    setActiveKey("1");
  };

  return (
    <div
      className="container"
      style={{ width: screen.width * 0.9, height: 400 }}
    >
      <div className="header">
        <h1 id="title" className="heading">
          Product Inventory using Firebase
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

      <div className="product-container">
        <Tabs
          className="tabs"
          activeKey={activeKey}
          onChange={handleChange}
          items={[
            {
              label: <ItemLabel icon={<FaApple />} name="Apple" />,
              key: "1",
              children: (
                <ProductTable
                  data={data.filter((item: any) => item.make === "apple")}
                />
              ),
              disabled: tabDisabled,
            },
            {
              label: <ItemLabel icon={<SiRazer />} name="Razer" />,
              key: "2",
              children: (
                <ProductTable
                  data={data.filter((item: any) => item.make === "razer")}
                />
              ),
              disabled: tabDisabled,
            },
            {
              label: <ItemLabel icon={<RiAliensLine />} name="Alienware" />,
              key: "3",
              children: (
                <ProductTable
                  data={data.filter((item: any) => item.make === "alienware")}
                />
              ),
              disabled: tabDisabled,
            },
            {
              label: <ItemLabel icon={<RiAddLine />} name="Add" />,
              key: "4",
              children: <AddProduct setData={setData} />,
              disabled: tabDisabled,
            },
          ]}
        />
      </div>
      {data.length ? null : (
        <div className="fetch-content">
          {spin ? (
            <Spin />
          ) : (
            <Button
              type="primary"
              onClick={() => fetchData()}
              className="fetch-btn"
              size="large"
            >
              <span>Fetch Products</span>
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

const ItemLabel: FC<ItemLabelPropTypes> = ({ name, icon }) => {
  return (
    <div className="tab-label">
      {icon}&nbsp;{name}
    </div>
  );
};
const ProductTable: FC<ProductTablePropTypes> = ({ data }) => {
  return data.length ? (
    <div className="product-content">
      <Table
        columns={columns}
        dataSource={data}
        rowKey={(item: any) => item.id}
      />
    </div>
  ) : null;
};
export default FirebaseProduct;
