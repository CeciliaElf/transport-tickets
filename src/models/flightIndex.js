import dayjs from "dayjs";

const INIT_STATE = {
  dptCityId: 2,
  dptCityName: "上海",
  dptAirportName: "虹桥机场",
  arrCityId: 1,
  arrCityName: "北京",
  arrAirportName: "大兴机场",
  cityType: "depart", // 选择的城市类型 depart: 出发， arrive：到达
  dptDate: dayjs().format("YYYY-MM-DD"),  // 起飞时间
};

export default {
  namespace: "flightIndex",
  state: { ...INIT_STATE },
  reducers: {
    // 同步操作放在这里
    /**
     *
     * @param {*} state 当前操作的 state
     * @param {*} action 执行动作的对象
     */
    updateState(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  effects: {},
};
