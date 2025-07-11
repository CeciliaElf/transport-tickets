import { PureComponent } from "react";
import { View, Swiper } from "@tarojs/components";
import "./index.scss";

// tabList = [
//   {
//     label: String,
//     id: Number,
//   },
// ];

export default class Tab extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentId: 0,
    };
  }

  componentDidMount() {
    const { initTabId, tabList } = this.props;
    if (initTabId == undefined) {
      this.setState({
        currentId: tabList?.[0]?.["id"],
      });
    } else {
      this.setState({
        currentId: initTabId,
      });
    }
  }

  handleClick = (id) => {
    this.setState({
      currentId: id,
    });
    this.props.onTabClick?.(id);
  };

  handleChange = (e) => {
    const id = e.detail.current
    this.setState({
      currentId: id,
    }, () => {
      // 将当前 id 传递到外部
      this.props.onChange?.(e)
    })
  }

  render() {
    const { className, tabList, children } = this.props;
    const { currentId } = this.state;
    const innerStyle = {
      width: `${100 / tabList?.length}%`,
      transform: `translateX(${currentId * 100}%)`,
    };
    return (
      <View className={`tab-container ${className}`}>
        {/* tab 选项卡 */}
        <View className="tab-bar">
          {tabList?.map((item) => {
            return (
              <View
                className={`tab-item ${currentId === item?.id ? "active" : ""}`}
                key={item.id}
                onClick={() => this.handleClick(item.id)}
              >
                {item.label}
              </View>
            );
          })}
          <View className="scroll-bar" style={innerStyle}></View>
        </View>
        {/* 选项卡内容 */}
        <Swiper current={currentId} className="tab-content" onChange={this.handleChange}>
          {children}
        </Swiper>
      </View>
    );
  }
} 