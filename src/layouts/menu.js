import { UserOutlined, LaptopOutlined, NotificationOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
const nav1 = [
  { name: "抖店列表", path:'/tiktokList',icon:<LaptopOutlined/>},
  { name: "会员管理", path:'/memberManage',icon:<UserOutlined/>, children: [{ name: "会员列表",path:'/memberList' }, { name: "会员运营",path:'/operation' }] },
];
const nav2 = [
  { name: "角色管理", path: '/user',  icon:<MenuUnfoldOutlined/>},
  { name: "菜单管理", path: '/menu', icon:<MenuFoldOutlined/> },
];

const menuList = [
  { name: "抖店模块", path: "/doudian",  children: nav1 },
  { name: "权限管理", path: "/auth", children: nav2 },
//   { name: "nav 3", key: "3", children: nav3 },
];
export { menuList };
