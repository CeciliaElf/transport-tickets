import { PureComponent } from "react";
import Taro from "@tarojs/taro";
import { connect } from "react-redux"; // 连接容器组件和 models 的高阶方法
import { View, Text } from "@tarojs/components";

import "./index.scss";

@connect(({ flightIndex }) => ({
  ...flightIndex,
}))
export default class cityItem extends PureComponent {
  onCityClick = (cityInfo) => {
    const { cityType } = this.props;
    const { cityId, cityName, airportName } = cityInfo;
    this.props.dispatch({
      type: 'flightIndex/updateState',
      payload: cityType === "depart" ? {
        dptCityId: cityId,
        dptAirportName: airportName,
        dptCityName: cityName,
      } : {
        arrCityId: cityId,
        arrAirportName: airportName,
        arrCityName: cityName,
      }
    })
    Taro.navigateBack()
  };
  render() {
    // cityList: 每个字母所包含的城市
    // label: 字母
    const { cityList, label } = this.props;
    return (
      <View className="list-item" id={label}>
        <Text className="table">{label}</Text>
        {cityList?.map((item) => {
          return (
            <View className="name" key={item} onClick={() => this.onCityClick(item)}>
              {`${item.cityName}(${item.airportName})`}
            </View>
          );
        })}
      </View>
    );
  }
}
