import { PureComponent } from "react";
import { View, SwiperItem, Swiper, Image } from "@tarojs/components";
import "../index/index.scss";
import Tab from "../../../components/Tab/index";
import NoExpolit from "../../../components/NoExploit/index";
import { adsReq } from "../../../common/api";

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
      adList: [], // 广告 banner
      currentTabId: 0,
    };
  }

  componentDidMount() {
    // 这里调用网络请求
    this.getAds();
  }

  handleTabClick = (id) => {
    this.setState({
      currentTabId: id,
    });
    console.log(id);
  };

  getAds = () => {
    adsReq().then((res) => {
      const { result } = res;
      this.setState({
        adList: result || [],
      });
      console.log(res);
    });
  };

  render() {
    const { adList } = this.state;
    return (
      <View className="flight-container">
        <View className="flight-top">
          <Tab
            tabList={FLIGHT_TABS}
            onTabClick={this.handleTabClick}
            initTabId={this.state.currentTabId}
            className="flight-index-tab"
          >
            <SwiperItem className="color-red">
              <NoExpolit className="no-data"></NoExpolit>
            </SwiperItem>
            <SwiperItem>
              <NoExpolit className="no-data"></NoExpolit>
            </SwiperItem>
            <SwiperItem>
              <NoExpolit className="no-data"></NoExpolit>
            </SwiperItem>
          </Tab>
        </View>
        <Swiper className="advs-banner-bd" autoplay circular interval={3000}>
          {adList.map((item) => {
            return (
              <SwiperItem key={item.id} className="item">
                <Image className="img" src={item.imgUrl}></Image>
              </SwiperItem>
            );
          })}
        </Swiper>
      </View>
    );
  }
}
