/*
 * @Author: hwd
 * @Description:
 * @FilePath: \my-react-crm\src\views\auth\user\index.js
 */
import { Space, Spin, Table, Button, Popconfirm, Switch } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import Edit from "./components/edit";
import api from "@/api/auth/user";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [ifShowEdit, setifShowEdit] = useState(false);
  const [list, setlist] = useState([]);
  const [_id, set_id] = useState(-1);

  useEffect(() => {
    setLoading(true);
    getList();
  }, []);

  //确认删除
  const deleteConfirm = async (e, record) => {
    await api.deletelist({ _id: record._id });
    getList();
  };
  //列表加载
  const getList = async () => {
    setLoading(true);
    api
      .getlist()
      .then((res) => {
        setLoading(false);
        setlist(res.data);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  //打开编辑
  const edit = (_id = -1) => {
    set_id(_id);
    setifShowEdit(true);
  };
  const columns = [
    { title: "账号", dataIndex: "username", key: "username", render: (text) => <div style={{ fontWeight: 700 }}>{text}</div> },
    { title: "密码", dataIndex: "password", key: "password" },
    { title: "账号类型", dataIndex: "type", key: "type", render: (text) => (text === 2 ? "管理员" : "普通账号") },
    { title: "账号状态", key: "state", dataIndex: "state", render: (text) => <Switch checked={text}></Switch> },
    { title: "邮箱", key: "email", dataIndex: "email" },
    { title: "手机号", key: "phone", dataIndex: "phone" },
    { title: "创建时间", key: "createtime", dataIndex: "createtime" },
    {
      title: "操作",
      width: 100,
      key: "action",
      render: (_, record) => (
        <Space size='middle'>
          <Button
            type='link'
            onClick={() => {
              edit(record._id);
            }}>
            编辑
          </Button>
          <Popconfirm title='你确定要删除吗？' onConfirm={(e) => deleteConfirm(e, record)} okText='确定' cancelText='取消'>
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
          edit();
        }}
        style={{ marginBottom: "10px" }}>
        <PlusOutlined />
        添加账号
      </Button>
      <>
        {ifShowEdit ? (
          <Edit
            close={() => {
              setifShowEdit(false);
            }}
            getList={() => {
              getList();
            }}
            _id={_id}
            ifShowEdit={ifShowEdit}></Edit>
        ) : null}
      </>
      <Spin spinning={loading} delay={200}>
        <Table columns={columns} dataSource={list} rowKey={(record) => record._id} />
      </Spin>
    </>
  );
};

export default App;
