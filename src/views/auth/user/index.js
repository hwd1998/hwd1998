/*
 * @Author: hwd
 * @Description:
 * @FilePath: \my-react-crm\src\views\auth\user\index.js
 */
import { Space, Table,  Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import Edit from "./components/edit";
import { getlist } from "@/api/auth/user";

const columns = [
  { title: "账号", dataIndex: "username", key: "username", render: (text) => <Button type='link'>{text}</Button> },
  { title: "密码", dataIndex: "password", key: "password" },
  { title: "账号类型", dataIndex: "type", key: "type" },
  { title: "账号状态", key: "state", dataIndex: "state" },
  { title: "邮箱", key: "email", dataIndex: "email" },
  { title: "手机号", key: "phone", dataIndex: "phone" },
  { title: "创建时间", key: "createTime", dataIndex: "createTime" },
  {
    title: "操作",
    key: "action",
    render: (_, record) => (
      <Space size='middle'>
        <Button type='link'>操作1</Button>
        <Button type='link'>操作2</Button>
      </Space>
    ),
  },
];

const App = () => {
  const [ifShowEdit, setifShowEdit] = useState(false);
  const [list, setlist] = useState([]);
  useEffect(() => {
    getlist().then((res) => setlist(res.data.data));
  }, []);

  return (
    <>
      <Button
        type='primary'
        onClick={() => {
          setifShowEdit(true);
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
            id='-1'
            ifShowEdit={ifShowEdit}></Edit>
        ) : null}
      </>
      <Table columns={columns} dataSource={list} rowKey={(record) => record._id} />;
    </>
  );
};

export default App;
