export default {
  pages: [
    "pages/index/index",
    "pages/order/order",
    "pages/airportList/airportList",
    "pages/calendar/calendar",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "旅途",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    color: "#7f8389",
    selecedColor: "#5495e6",
    borderStyle: "black",
    backgroundColor: "#ffffff",
    list: [
      {
        pagePath: "pages/index/index",
        iconPath: "assets/images/index-unselected.png",
        selectedIconPath: "assets/images/index-selected.png",
        text: "首页",
      },
      {
        pagePath: "pages/order/order",
        iconPath: "assets/images/order-unselected.png",
        selectedIconPath: "assets/images/order-selected.png",
        text: "我的订单",
      },
    ],
  },
  permission: {
    "scope.userLocation": {
      desc: "为了更好的服务体验，我们希望获取你的位置",
    },
  },
  requiredPrivateInfos: ["getLocation"],
};
