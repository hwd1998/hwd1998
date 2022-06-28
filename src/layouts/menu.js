import { UserOutlined, LaptopOutlined, NotificationOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
const nav1 = [
  { name: "nav1-sub1", key: '1-1',icon:<UserOutlined/>, childList: [{ name: "n1s1-1",key:'n1s1_1',path:'n1s1_1' }, { name: "n1s1_2",key:'n1s1_2',path:'n1s1_2' }] },
  { name: "nav1-sub2", key: '1-2',path:'n1s2_1',icon:<LaptopOutlined/>},
  { name: "nav1-sub3", key: '1-3',path:'n1s3_1',icon:<NotificationOutlined/>},
];
const nav2 = [
  { name: "角色管理", key: 'user',path:'user' ,icon:<MenuUnfoldOutlined/>},
  { name: "菜单管理", key: 'n2s2_1',path:'n2s2_1',icon:<MenuFoldOutlined/> },
];

const menuList = [
  { name: "xx模块", key: "1",  childList: nav1 },
  { name: "权限管理", key: "2", childList: nav2 },
//   { name: "nav 3", key: "3", childList: nav3 },
];
export { menuList };
