import { PureComponent } from "react";
import { View, SwiperItem, Swiper, Image, Text } from "@tarojs/components";
import "../index/index.scss";
import Tab from "../../../components/Tab/index";
import NoExpolit from "../../../components/NoExploit/index";
import Taro from "@tarojs/taro";
import { adsReq } from "../../../common/api";
import { connect } from "react-redux";
import dayjs from "dayjs";

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

@connect(({ flightIndex }) => ({
  flightIndex,
}))

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

  chooseFlightCtiy = (type) => {
    this.props.dispatch ({
      type: "flightIndex/updateState",
      payload: {
        cityType: type,
      }
    })
    Taro.navigateTo({
      url: "/pages/airportList/airportList",
    })
  }

  chooseFlightDate = () => {
    Taro.navigateTo({
      url: "/pages/calendar/calendar"
    })
  }

  render() {
    const { adList } = this.state;
    const { arrCityName = "北京", dptCityName = "上海", dptDate } = this.props.flightIndex;
    return (
      <View className="flight-container">
        <View className="flight-top">
          <Tab
            tabList={FLIGHT_TABS}
            onTabClick={this.handleTabClick}
            initTabId={this.state.currentTabId}
            className="flight-index-tab"
          >
            <SwiperItem>
              <View className="item station">
                <View
                  className="cell from"
                  onClick={() => this.chooseFlightCtiy("depart")}
                >
                  {dptCityName}
                </View>
                <Text className="iconfont icon-conversion"></Text>
                <View
                  className="cell to"
                  onClick={() => this.chooseFlightCtiy("arrive")}
                >
                  {arrCityName}
                </View>
              </View>
              <View className="item date" onClick={this.chooseFlightDate}>
                {dayjs(dptDate).format("M月D日")}
              </View>
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
