import { PureComponent } from "react";
import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";

import "./index.scss";

export default class cityItem extends PureComponent {
  render() {
    // cityList: 每个字母所包含的城市
    // label: 字母
    const { cityList, label } = this.props;
    return (
      <View className="list-item">
        <Text className="table">{label}</Text>
        {cityList?.map((item) => {
          return (
            <View className="name" key={item}>
              {`${item.cityName}(${item.airportName})`}
            </View>
          );
        })}
      </View>
    );
  }
}
