import { message, Spin, Checkbox, Form, Input, Modal } from "antd";
import { useState, useEffect } from "react";
import { register } from "@/api/auth/user";

const Edit = (props) => {
  const { close } = props;
  const [ifShowModel, setifShowModel] = useState(true);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    console.log("mounted");
  }, []);
  const onFinish = async () => {
    let val = form.getFieldsValue(true);
    let valid;
    await form.validateFields().catch(() => {
      valid = true;
    });
    if (valid) return;
    setLoading(true);
    register(val)
      .then((res) => {
        setLoading(false);
        if (res.data.code == 1) {
          message.success("创建成功");
          close();
          form.resetFields();
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Modal
        title='添加账号'
        visible={ifShowModel}
        onOk={onFinish}
        onCancel={() => {
          setifShowModel(false);
        }}
        afterClose={() => {
          form.resetFields();
          close();
        }}
        width={600}>
        <Spin spinning={loading} delay={500}>
          <Form form={form} labelCol={{ span: 3 }} name='basic' onFinishFailed={onFinishFailed} autoComplete='off'>
            <Form.Item label='用户名' name='username' rules={[{ required: true, message: "Please input your username!" }]}>
              <Input placeholder='input username' />
            </Form.Item>
            <Form.Item label='密码' name='password' rules={[{ required: true, message: "Please input your password!" }]}>
              <Input.Password placeholder='input password' />
            </Form.Item>
            <Form.Item label='手机号' name='phone' rules={[{ required: true, message: "Please input your phone!" }]}>
              <Input placeholder='input phone' />
            </Form.Item>
            <Form.Item label='邮箱' name='email'>
              <Input placeholder='input email' />
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </>
  );
};

export default Edit;
