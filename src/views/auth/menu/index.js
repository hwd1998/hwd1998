/*
 * @Author: hwd
 * @Description:
 * @FilePath: \my-react-crm\src\views\auth\menu\index.js
 */
import { Space, Spin, message, Table, Button, Popconfirm } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useState, useEffect, useRef } from "react";
import Edit from "./components/edit";
import api from "@/api/auth/menu";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [list, setlist] = useState([]);
  const editEl = useRef();
  //打开编辑
  const openEdit = (_id = -1) => {
    editEl.current.open(_id);
  };
  useEffect(() => {
    getList();
  }, []);
  //获取列表
  const getList = async () => {
    setLoading(true);
    try {
      let res = await api.get();
      setLoading(false);
      setlist(res.data);
    } catch (err) {
      setLoading(false);
    }
  };
  //删除
  const removeMenu = async (e, _id) => {
    console.log("e", e);
    setLoading(true);
    try {
      let res = await api.remove({ _id });
      setLoading(false);
      message.success(res.msg);
      getList();
    } catch (err) {
      setLoading(false);
    }
  };
  const columns = [
    { title: "名称", dataIndex: "name", key: "name" },
    { title: "编码", dataIndex: "path", key: "path" },
    { title: "序号", dataIndex: "index", key: "index" },
    { title: "图标", dataIndex: "icon", key: "icon" },
    { title: "路径", dataIndex: "component", key: "component" },
    {
      title: "操作",
      key: "action",
      width: "250px",
      render: (_, record) => (
        <Space>
          <Button
            type='link'
            onClick={() => {
              openEdit(record._id);
            }}>
            编辑
          </Button>
          <Button
            type='link'
            onClick={() => {
              openEdit(record._id);
            }}>
            添加下级菜单
          </Button>
          <Popconfirm title='你确定要删除吗？' onConfirm={(e) => removeMenu(e, record._id)} okText='确定' cancelText='取消'>
            <Button type='link'>删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Button
        type='primary'
        onClick={() => {
          openEdit();
        }}
        style={{ marginBottom: "10px" }}>
        <PlusOutlined />
        添加一级菜单
      </Button>
      <Edit
        ref={editEl}
        callback={() => {
          getList();
        }}></Edit>
      <Spin spinning={loading} delay={200}>
        <Table columns={columns} dataSource={list} rowKey={(record) => record._id} />;
      </Spin>
    </>
  );
};

export default App;
