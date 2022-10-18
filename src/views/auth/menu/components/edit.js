import React, { forwardRef, useImperativeHandle } from "react";
import { message, Spin, Form, Input, Modal } from "antd";
import { useState, useEffect } from "react";
import api from "@/api/auth/menu";

const Edit = forwardRef((props, ref) => {
  const { callback } = props;
  const [_id, set_id] = useState(-1);
  const [ifShowModel, setifShowModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentData, setcurrentData] = useState({});
  const [form] = Form.useForm();

  //将需要的方法暴露出ref
  useImperativeHandle(ref, () => ({
    open,
  }));
  //打开弹框
  const open = (_id) => {
      setifShowModel(true);
      set_id(_id);
    if (_id != -1) getModel(_id);
  };
  //点击确认
  const onFinish = async () => {
    let valid;
    await form.validateFields().catch(() => {
      valid = true;
    });
    if (valid) return;
    if (_id === -1) add();
    else edit();
  };
  //获取model
  const getModel = async (_id) => {
    setLoading(true);
    try {
      let res = await api.getmodel({ _id });
      form.setFieldsValue(res.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };
  //添加
  const add = async () => {
    setLoading(true);
    try {
      let res = await api.addmenu(form.getFieldsValue(true));
      setLoading(false);
      message.success(res.msg);
      setifShowModel(false);
      callback();
      form.resetFields();
    } catch (err) {
      setLoading(false);
    }
  };
  //编辑
  const edit = async () => {
    setLoading(true);
    try {
      let res = await api.updatemenu(form.getFieldsValue(true));
      setLoading(false);
      message.success(res.msg);
      setifShowModel(false);
      callback();
      form.resetFields();
    } catch (err) {
      setLoading(false);
    }
  };
  return (
    <>
      <Modal
        title={props._id === -1 ? "添加菜单" : "编辑菜单"}
        visible={ifShowModel}
        onOk={onFinish}
        onCancel={() => {
          setifShowModel(false);
        }}
        afterClose={() => {
          form.resetFields();
        }}
        width={600}>
        <Spin spinning={loading} delay={500}>
          <Form form={form} labelCol={{ span: 3 }} name='basic' autoComplete='off'>
            <Form.Item label='名称' name='name' rules={[{ required: true, message: "Please input your name!" }]}>
              <Input placeholder='input name' />
            </Form.Item>
            <Form.Item label='编码' name='path' rules={[{ required: true, message: "Please input your path!" }]}>
              <Input placeholder='input path' />
            </Form.Item>
            <Form.Item label='序号' name='index' rules={[{ required: true, message: "Please input your path!" }]}>
              <Input placeholder='input index' />
            </Form.Item>
            <Form.Item label='图标' name='icon'>
              <Input placeholder='input icon' />
            </Form.Item>
            <Form.Item label='路径' name='component'>
              <Input placeholder='input component' />
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </>
  );
});

export default Edit;
