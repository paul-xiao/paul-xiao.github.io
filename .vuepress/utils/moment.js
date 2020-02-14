export default (moment) => {
  
  const [date, time ] = new Date(moment).toLocaleString('zh-ZH').split(', ')
  return {
      date,
      time
  }
}