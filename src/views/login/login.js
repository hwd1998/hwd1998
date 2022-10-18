import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button,message } from "antd";
import "./login.scss";
import api from "@/api/auth/user";
export default function Login() {
  const [loading, setloading] = useState(false);
  const [form] = Form.useForm();
  const history = useHistory();
  //登录
  const login = async () => {
    let valid;
    await form.validateFields().catch(() => {
      valid = true;
    });
    if (valid) return;
    setloading(true);
    try {
    const res =  await api.login(form.getFieldsValue(true));
      message.success(res.msg);
      history.push("/home");
    } catch (err) {
      setloading(false);
    }
  };

  return (
    <div className='warp'>
      <div className='login-warp'>
        <div className='login-title'>XX CRM 系统</div>
        <Form form={form} name='form' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} initialValues={{ remember: true }} autoComplete='off'>
          <Form.Item label='Username' name='username' rules={[{ required: true, message: "Please input your username!" }]}>
            <Input />
          </Form.Item>
          <Form.Item label='Password' name='password' rules={[{ required: true, message: "Please input your password!" }]}>
            <Input.Password />
          </Form.Item>
        </Form>
        <Button loading={loading} type='primary' onClick={login} htmlType='submit' style={{ width: "100%" }}>
          登录
        </Button>
      </div>
    </div>
  );
}
