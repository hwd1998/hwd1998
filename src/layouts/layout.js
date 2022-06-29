import React, { useState, useEffect } from "react";
import { Layout, Menu, Dropdown } from "antd";
import { HashRouter, Route, Redirect, Switch, Link, useLocation } from "react-router-dom";
import routers from "@/router/index";
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
  const [headerPath, clickHeaderMenu] = useState(localStorage.getItem("MENUSELECT_TOP") || "/doudian");
  const [menuIndex, setMenuIndex] = useState("1");
  useEffect(() => {
    routers.forEach((item, index) => {
      if (item.path === headerPath) setMenuIndex(index);
    });
  }, [headerPath]);
  useEffect(()=>{
    console.log('routers',routers)
    console.log('routers',routers)

  },[])
  return (
    <HashRouter>
      <Layout className='layout'>
        <Sider collapsible={true} collapsed={collapsed} width={menuWidth} className='site-layout-background' style={{ height: "100vh", overflowY: "auto", zIndex: 999 }}>
          <div className='logo-warp' style={{ float: "left", display: "flex", justifyContent: "center", alignItems: "center", width: "100%", margin: "10px 0" }}>
            <img className='logo' alt='logo' src={require("../static/img/logo.jpg")} style={{ width: "50%", height: "50px", objectFit: "scale-down" }} />
          </div>
          {/* 左侧边栏 */}
          <Menu theme='dark' mode='inline' defaultOpenKeys={[localStorage.getItem("MENUSELECT_LEFT_OPEN")]} defaultSelectedKeys={[localStorage.getItem("MENUSELECT_LEFT") || "/doudian"]} style={{ height: "100%", borderRight: 0 }}>
            {routers[menuIndex].children.map((item, index) => {
              if (item.children && item.children.length > 0)
                return (
                  <SubMenu key={item.path} icon={item.icon} title={item.name}>
                    {item.children.map((item1, index1) => {
                      return (
                        <Menu.Item
                          key={item1.path}
                          onClick={(e) => {
                            localStorage.setItem("MENUSELECT_LEFT", e.keyPath[0]);
                            localStorage.setItem("MENUSELECT_LEFT_OPEN", e.keyPath[1]);
                          }}>
                          <Link to={routers[menuIndex].path + item.path + item1.path}>{item1.name}</Link>
                        </Menu.Item>
                      );
                    })}
                  </SubMenu>
                );
              else {
                let path = routers[menuIndex].path + item.path;
                return (
                  <Menu.Item
                    key={item.path}
                    icon={item.icon}
                    onClick={(e) => {
                      localStorage.setItem("MENUSELECT_LEFT", e.key);
                      localStorage.setItem("MENUSELECT_LEFT_OPEN", e.keyPath[1]);
                    }}>
                    <Link to={routers[menuIndex].path + item.path}>{item.name}</Link>
                  </Menu.Item>
                );
              }
            })}
          </Menu>
        </Sider>
        <Layout>
          <Header className='header' style={{ display: "flex", width: "100%", background: "white", padding: 0, paddingRight: "20px" }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: "trigger",
              onClick: () => {
                setCollapsed(!collapsed);
              },
              style: { padding: "0 10px 0 24px", fontSize: "18px", lineHeight: "64px", cursor: "pointer", transition: "color 0.3s" },
            })}
            {/* 上边栏 */}
            <Menu style={{ flex: 1 }} mode='horizontal' defaultSelectedKeys={[localStorage.getItem("MENUSELECT_TOP") || "/doudian"]}>
              {routers.map((item, index) => {
                return (
                  <Menu.Item
                    key={item.path}
                    icon={item.icon}
                    onClick={(e) => {
                      localStorage.setItem("MENUSELECT_TOP", e.key);
                      clickHeaderMenu(e.key);
                    }}>
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
                    if (item1.children) {
                      const GrandRoutes = item1.children.map((item2) => {
                        return <Route key={item.path + item1.path + item2.path} path={item.path + item1.path + item2.path} component={item2.component} exact />;
                      });
                      return [<Route key={item.path + item1.path} path={item.path + item1.path} component={item1.component} exact />, GrandRoutes];
                    } else {
                      return <Route key={item.path + item1.path} path={item.path + item1.path} component={item1.component} exact />;
                    }
                  });

                  return [<Route key={item.path} path={item.path} component={item.component} exact />, ChildRoutes];
                } else {
                  return <Route key={item.path} path={item.path} component={item.component} exact />;
                }
              })}
              <Redirect path='/' to='/n1s1_1' exact></Redirect>
              {/* <Redirect path='*' to='/404'></Redirect> */}
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </HashRouter>
  );
}
