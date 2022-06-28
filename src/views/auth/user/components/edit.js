import { Button, Checkbox, Form, Input, Modal } from "antd";
import { useState } from "react";
// import {register} from "/src/api/auth/user"
const Edit = (props) => {
  const onFinish = (values) => {
    let val = form.getFieldsValue(true);
    console.log("val", val);
    form.resetFields();
  };
  const [form] = Form.useForm();
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const { ifShowEdit, close } = props;
  //初始化表单值

  return (
    <>
      <Modal
        title='添加账号'
        centered
        visible={ifShowEdit}
        onOk={onFinish}
        onCancel={() => {
          form.resetFields();
          close();
        }}
        width={600}>
        <Form form={form} labelCol={{ span: 4 }} name='basic' onFinishFailed={onFinishFailed} autoComplete='off'>
          <Form.Item label='Username' name='username' rules={[{ required: true, message: "Please input your username!" }]}>
            <Input placeholder='input username' />
          </Form.Item>
          <Form.Item label='Password' name='password' rules={[{ required: true, message: "Please input your password!" }]}>
            <Input.Password placeholder='input password' />
          </Form.Item>
          <Form.Item label='phone' name='phone' rules={[{ required: true, message: "Please input your phone!" }]}>
            <Input placeholder='input phone' />
          </Form.Item>
          <Form.Item label='E-mail' name='email'>
            <Input placeholder='input email' />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Edit;
