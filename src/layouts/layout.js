import React, { useState, useEffect } from "react";
import { Layout, Menu, Dropdown } from "antd";
import { HashRouter,Route, Redirect, Switch, Link } from "react-router-dom";
import routers from "@/router/index";
import { menuList } from "./menu";
import { MenuUnfoldOutlined, MenuFoldOutlined, HomeOutlined, SettingOutlined, LogoutOutlined, CaretDownOutlined } from "@ant-design/icons";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const menuWidth = "200px";
// 用户菜单
const userMenu = (
  <Menu>
    <Menu.Item key='0' icon={<HomeOutlined />}>
      <Link to='/welcome'>首页</Link>
    </Menu.Item>
    <Menu.Item key='1' icon={<SettingOutlined />}>
      <Link to='/accountSettings'>个人设置</Link>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key='4' icon={<LogoutOutlined />}>
      退出登录
    </Menu.Item>
  </Menu>
);
export default function MyLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [headerKey, clickHeaderMenu] = useState("1");
  const [menuIndex, setMenuIndex] = useState("1");
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  useEffect(() => {
    menuList.forEach((item, index) => {
      if (item.key === headerKey) setMenuIndex(index);
    });
  }, [headerKey]);
  return (
    <HashRouter>
      <Layout className='layout'>
        <Sider collapsible={true} collapsed={collapsed} width={menuWidth} className='site-layout-background' style={{ height: "100vh", overflowY: "auto", zIndex: 999 }}>
          <div className='logo-warp' style={{ float: "left", display: "flex", justifyContent: "center", alignItems: "center", width: "100%", margin: "10px 0" }}>
            <img className='logo' alt='logo' src={require("../static/img/logo.jpg")} style={{ width: "50%", height: "50px" ,objectFit:'scale-down'}} />
          </div>
          {/* 左侧边栏 */}
          <Menu theme='dark' mode='inline' defaultOpenKeys={["1-1"]} defaultSelectedKeys={["n1s1_1"]} style={{ height: "100%", borderRight: 0 }}>
            {menuList[menuIndex].childList.map((item, index) => {
              if (item.childList && item.childList.length > 0)
                return (
                  <SubMenu key={item.key} icon={item.icon} title={item.name}>
                    {item.childList.map((item1, index1) => {
                      return (
                        <Menu.Item key={item1.key}>
                          <Link to={item1.path}>{item1.name}</Link>
                        </Menu.Item>
                      );
                    })}
                  </SubMenu>
                );
              else
                return (
                  <Menu.Item key={item.key} icon={item.icon}>
                    <Link to={item.path}>{item.name}</Link>
                  </Menu.Item>
                );
            })}
          </Menu>
        </Sider>
        <Layout>
          <Header className='header' style={{ display: "flex", width: "100%", background: "white", padding: 0, paddingRight: "20px" }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, { className: "trigger", onClick: toggle, style: { padding: "0 10px 0 24px", fontSize: "18px", lineHeight: "64px", cursor: "pointer", transition: "color 0.3s" } })}
            {/* 上边栏 */}
            <Menu style={{ flex: 1 }} mode='horizontal' defaultSelectedKeys={["1"]}>
              {menuList.map((item, index) => {
                return (
                  <Menu.Item key={item.key} onClick={(e) => clickHeaderMenu(e.key)}>
                    {" "}
                    {item.name}
                  </Menu.Item>
                );
              })}
            </Menu>
            <Dropdown overlay={userMenu}>
              <div style={{ cursor: "pointer" }}>
                <img src={require("../static/img/user.gif")} alt='user' style={{ width: "40px", height: "40px", borderRadius: "10px" }} />
                <CaretDownOutlined style={{ color: "#999", fontSize: "12px", transform: "translateY(15px)" }} />
              </div>
            </Dropdown>
          </Header>
          <Content className='site-layout-background' style={{ padding: 24, margin: "0  16px 24px 16px", minHeight: 280 }}>
            <Switch>
              {routers.map((item) => {
                if (item.children) {
                  const ChildRoutes = item.children.map((item1) => {
                    return <Route key={item.path + item1.path} path={item.path + item1.path} component={item1.component} exact />;
                  });
                  return [<Route key={item.path} path={item.path} component={item.component} exact />, ChildRoutes];
                } else {
                  return <Route key={item.path} path={item.path} component={item.component} exact />;
                }
              })}
              <Redirect path='/' to='/n1s1_1' exact></Redirect>
              <Redirect path='*' to='/404'></Redirect>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </HashRouter>
  );
}
