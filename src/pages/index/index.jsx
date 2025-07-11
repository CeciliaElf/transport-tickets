import { Component } from "react";
import { View } from "@tarojs/components";
import "./index.scss";
import FlightIndex from "../flight/index/index";
import NoExploit from '../../components/NoExploit'

const DEFAULT_TAB_LIST = [
  { title: "机票", tab: "flight", index: 0 },
  { title: "火车票", tab: "train", index: 1 },
  { title: "汽车票", tab: "car", index: 2 },
  { title: "酒店", tab: "hotel", index: 3 },
];

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0, // 当前选中的 tabIndex
    };
  }

  switchTab = (index) => {
    this.setState({
      tabIndex: index,
    });
  };

  render() {
    const { tabIndex } = this.state;
    const innerStyle = {
      width: `${100 / DEFAULT_TAB_LIST.length}%`, // 这个表达式会计算出每个选项卡应该占据的平均宽度百分比。例如，如果 DEFAULT_TAB_LIST 有 4 个元素，那么 width 将是 (100 / 4)%，即 25%。
      transform: `translateX(${tabIndex * 100}%)`,
    };
    return (
      <View className="index-container">
        <View className="top">
          <View className="index-tab">
            {DEFAULT_TAB_LIST.map((item) => (
              <View
                key={item.tab}
                className={`index_tab_item ${item.tab} ${
                  tabIndex === item.index ? "current" : ""
                }`}
                onClick={() => this.switchTab(item.index)}
              >
                {item.title}
              </View>
            ))}
          </View>
          <View className="scrollbar" style={innerStyle}></View>
        </View>
        <View>
          {DEFAULT_TAB_LIST[tabIndex]["tab"] === "flight" ? (
            <FlightIndex />
          ) : (
            <NoExploit />
          )}
        </View>
      </View>
    );
  }
}
