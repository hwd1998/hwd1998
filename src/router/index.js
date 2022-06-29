import { UserOutlined, LaptopOutlined, NotificationOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import memberList from "@/views/doudian/memberManage/memberList";
import operation from "@/views/doudian/memberManage/operation";
import tiktokList from "@/views/doudian/tiktokList/index";
import user from "@/views/auth/user/index";
import menu from "@/views/auth/menu/index";
const router = [
  {
    path: "/doudian",
    name: "抖店模块",
    icon:<NotificationOutlined/>,
    children: [
      {
        path: "/tiktokList",
        name: "抖店列表",
        icon:<LaptopOutlined/>,
        component: tiktokList,
      },
      {
        path: "/memberManage",
        name: "会员管理",
        icon:<UserOutlined/>,
        children: [
          {
            path: "/operation",
            name: "会员运营",
            component: operation,
          },
          {
            path: "/memberList",
            name: "会员列表",
            component: memberList,
          },
        ],
      },
    ],
  },
  {
    path: "/auth",
    name: "权限管理",
    icon:<MenuUnfoldOutlined/>,
    children: [
      {
        path: "/user",
        name: "用户管理",
        component: user,
        icon:<UserOutlined/>,
      },
      {
        path: "/menu",
        name: "菜单管理",
        component: menu,
        icon:<MenuFoldOutlined/>,
      },
    ],
  },
];

export default router;
