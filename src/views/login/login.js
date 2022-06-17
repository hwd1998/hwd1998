import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import "./login.scss";
export default class Login extends Component {
  render() {
    const onFinish = (values) => {
      console.log("Success:", values);
    };
    return (
      <div className='warp'>
        <Form name='form' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} initialValues={{ remember: true }} onFinish={onFinish} autoComplete='off'>
          <Form.Item label='Username' name='username' rules={[{ required: true, message: "Please input your username!" }]}>
            <Input />
          </Form.Item>
          <Form.Item label='Password' name='password' rules={[{ required: true, message: "Please input your password!" }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
