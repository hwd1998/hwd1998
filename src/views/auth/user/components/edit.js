import { message, Spin, Form, Input, Modal, Radio, Switch } from "antd";
import { useState, useEffect } from "react";
import api from "@/api/auth/user";

const Edit = (props) => {
  const { close, getList, _id } = props;
  const [ifShowModel, setifShowModel] = useState(true);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    if (_id !== -1) getModel();
  }, []);
  const initialValues = { state: true, type: 1 };
  //点击确认
  const onFinish = async () => {
    let valid;
    await form.validateFields().catch(() => {
      valid = true;
    });
    if (valid) return;
    if (_id === -1) add();
    else update();
  };
  //获取实体
  const getModel = async () => {
    setLoading(true);
    try {
      let res = await api.getmodel({ _id });
      form.setFieldsValue(res.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };
  //新增
  const add = async () => {
    try {
      setLoading(true);
      let res = await api.register(form.getFieldsValue(true));
      setLoading(false);
      message.success(res.msg);
      getList();
      setifShowModel(false);
    } catch (err) {
      setLoading(false);
    }
  };
  //更新
  const update = async () => {
    try {
      setLoading(true);
      let res = await api.update(form.getFieldsValue(true));
      setLoading(false);
      message.success(res.msg);
      getList();
      setifShowModel(false);
    } catch (err) {
      setLoading(false);
    }
  };
  return (
    <>
      <Modal
        title={_id === -1 ? "添加账号" : "编辑账号"}
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
          <Form form={form} labelCol={{ span: 4 }} initialValues={initialValues} name='basic' autoComplete='off'>
            <Form.Item label='用户名：' name='username' rules={[{ required: true, message: "Please input your username!" }]}>
              <Input placeholder='input username' />
            </Form.Item>
            <Form.Item label='密码：' name='password' rules={[{ required: true, message: "Please input your password!" }]}>
              <Input.Password placeholder='input password' />
            </Form.Item>
            <Form.Item label='账号类型：' name='type' rules={[{ required: true, message: "请选择账号类型" }]}>
              <Radio.Group>
                <Radio value={1}>普通账号</Radio>
                <Radio value={2}>管理员</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label='账号状态：' valuePropName='checked' name='state' rules={[{ required: true, message: "请选择账号状态" }]}>
              <Switch />
            </Form.Item>
            <Form.Item label='手机号：' name='phone' rules={[{ required: true, message: "Please input your phone!" }]}>
              <Input placeholder='input phone' />
            </Form.Item>
            <Form.Item label='邮箱：' name='email'>
              <Input placeholder='input email' />
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </>
  );
};

export default Edit;
