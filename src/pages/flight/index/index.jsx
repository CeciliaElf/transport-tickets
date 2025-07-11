import { PureComponent } from "react";
import { View, SwiperItem } from "@tarojs/components";
import "../index/index.scss";
import Tab from "../../../components/Tab/index";

const FLIGHT_TABS = [
  {
    label: "单程",
    id: 0,
  },
  {
    label: "往返",
    id: 1,
  },
  {
    label: "多程",
    id: 2,
  },
];

export default class FlightIndex extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentTabId: 0,
    };
  }

  handleTabClick = (id) => {
    this.setState({
      currentTabId: id,
    });
    console.log(id);
  };

  render() {
    return (
      <View className="flight-container">
        <View className="flight-top">
          <Tab
            tabList={FLIGHT_TABS}
            onTabClick={this.handleTabClick}
            initTabId={this.state.currentTabId}
            className="flight-index-tab"
          >
            <SwiperItem className="color-red">111</SwiperItem>
            <SwiperItem>222</SwiperItem>
            <SwiperItem>333</SwiperItem>
          </Tab>
        </View>
      </View>
    );
  }
}
