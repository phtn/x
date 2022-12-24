import { Alert, Button, Checkbox, Form, Input, Select, Spin } from "antd";
import { createRef, FC, useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore/lite";
import { db } from "../../db/db";
import type { FormInstance } from "antd/es/form";

type AddProductPropTypes = {
  setData: Function;
};
type AddAnotherItemPropType = {
  setActiveForm: Function;
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const AddProduct: FC<AddProductPropTypes> = ({ setData }) => {
  const formRef = createRef<FormInstance>();
  const [spin, setSpin] = useState(false);
  const [activeForm, setActiveForm] = useState(true);

  // * Wrtie to Firestore
  const writeDoc = async (data: any) => {
    await addDoc(collection(db, "products"), data)
      .then(async () => {
        // * Get docs to update products table
        let items: Array<object> = [];
        const querySnapshot = await getDocs(collection(db, "products"));
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setData(items);
      })
      .finally(() => {
        setSpin(false);
        setActiveForm(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onFinish = (values: any) => {
    setSpin(true);
    writeDoc(values);
    formRef.current!.resetFields();
  };
  const onReset = () => {
    formRef.current!.resetFields();
  };
  const onFinishFailed = (errorInfo: any) => {
    // console.log("Failed:", errorInfo);
  };

  return activeForm ? (
    <div className="product-content">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: false }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        ref={formRef}
      >
        <Form.Item
          label="Make"
          name="make"
          rules={[{ required: true, message: "Must have a manufacturer." }]}
        >
          <Select
            placeholder="Select manufacturer"
            allowClear
            options={[
              {
                value: "apple",
                label: "Apple",
              },
              {
                value: "razer",
                label: "Razer",
              },
              {
                value: "alienware",
                label: "Alienware",
              },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Model"
          name="model"
          rules={[{ required: true, message: "Please input a model name." }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Processor"
          name="processor"
          rules={[{ required: true, message: "Please input a processor." }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please input a price." }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="inStock"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>In Stock?</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          {spin ? (
            <Spin style={styles.submitElements} />
          ) : (
            <Button
              type="primary"
              htmlType="submit"
              style={styles.submitElements}
            >
              Submit
            </Button>
          )}
          <Button htmlType="button" onClick={onReset} style={styles.btn}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  ) : (
    <AddAnotherItem setActiveForm={setActiveForm} />
  );
};

const AddAnotherItem: FC<AddAnotherItemPropType> = ({ setActiveForm }) => {
  return (
    <div>
      <div className="success-content">
        <Alert
          type="success"
          message="Item Successfully Added!"
          style={styles.successElements}
        />
      </div>
      <div className="success-content">
        <Button
          type="primary"
          onClick={() => setActiveForm(true)}
          style={styles.successElements}
        >
          Add Another Item?
        </Button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "280px",
    border: "1px solid red",
  },
  content: {
    border: "1px solid green",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "auto",
    height: "200px",
    paddingTop: 60,
  },
  submitElements: {
    width: 100,
  },
  successElements: {
    width: 180,
  },
  btn: {
    marginLeft: 10,
    width: 100,
  },
};
export default AddProduct;
