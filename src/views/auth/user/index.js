/*
 * @Author: hwd
 * @Description:
 * @FilePath: \my-react-crm\src\views\auth\user\index.js
 */
import { Space, Table, Tag, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import Edit from "./components/edit";

const columns = [
  { title: "账号", dataIndex: "account", key: "account", render: (text) => <Button type='link'>{text}</Button> },
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
const data = [];

const App = () => {
  const [ifShowEdit, setifShowEdit] = useState(false);
  let edit = (_, type = "add") => {
    setifShowEdit(true);
  };
  let close = (refresh=false) => {
    if(refresh){}
    setifShowEdit(false);
  };
  return (
    <>
      <Button type='primary' onClick={edit} style={{ marginBottom: "10px" }}>
        <PlusOutlined />
        添加账号
      </Button>
      <Edit close={close} ifShowEdit={ifShowEdit}></Edit>
      <Table columns={columns} dataSource={data} />;
    </>
  );
};

export default App;
