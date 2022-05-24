import { UserOutlined, LaptopOutlined, NotificationOutlined, MenuUnfoldOutlined, MenuFoldOutlined, DownOutlined } from "@ant-design/icons";

const nav1 = [
  { name: "nav1-sub1", key: '1-1',icon:<UserOutlined/>, childList: [{ name: "n1s1-1",key:'n1s1_1',path:'n1s1_1' }, { name: "n1s1_2",key:'n1s1_2',path:'n1s1_2' }] },
  { name: "nav1-sub2", key: '1-2',path:'n1s2_1',icon:<LaptopOutlined/>},
  { name: "nav1-sub3", key: '1-3',path:'n1s3_1',icon:<NotificationOutlined/>},
];
const nav2 = [
  { name: "nav2-sub1", key: 'n2s1_1',path:'n2s1_1' ,icon:<MenuUnfoldOutlined/>},
  { name: "nav2-sub2", key: 'n2s2_1',path:'n2s2_1',icon:<MenuFoldOutlined/> },
];
const nav3 = [
  { name: "nav3-sub1", key: 'n3s1_1',path:'n3s1_1' ,icon:<DownOutlined/>},
];

const menuList = [
  { name: "nav 1", key: "1", childList: nav1 },
  { name: "nav 2", key: "2", childList: nav2 },
  { name: "nav 3", key: "3", childList: nav3 },
];
export { menuList };
