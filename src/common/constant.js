import dayjs from "dayjs";

export const ERR_MES = "网络开小差啦，请稍后尝试~";

// 日历最小日期
export const MIN_DATE = dayjs().format('YYYY-MM-DD')

// 最大日期
export const MAX_DATE = dayjs().add(60, 'day').format('YYYY-MM-DD')