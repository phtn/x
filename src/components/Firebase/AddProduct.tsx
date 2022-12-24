import { Button, Checkbox, Form, Input, Select } from "antd";
import { FC } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore/lite";
import { db } from "../../db/db";

type AddProductPropTypes = {
  setData: Function;
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const AddProduct: FC<AddProductPropTypes> = ({ setData }) => {
  const [form] = Form.useForm();

  const writeDoc = async (data: any) => {
    await addDoc(collection(db, "products"), data).then(async () => {
      let items: Array<object> = [];
      const querySnapshot = await getDocs(collection(db, "products"));
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setData(items);
    });
  };
  const onFinish = (values: any) => {
    writeDoc(values);
  };
  const onReset = () => {
    form.resetFields();
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="product-content">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: false }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
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
          <Button type="primary" htmlType="submit" style={styles.btn}>
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
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
  btn: {
    marginRight: 10,
  },
};
export default AddProduct;
