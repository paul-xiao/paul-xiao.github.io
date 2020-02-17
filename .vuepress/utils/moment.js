export default (moment) => {
  
  const [date, time ] = new Date(moment).toLocaleString('en-US').split(', ')
  const getMonth = () => {
   const Year = new Date(date).getUTCFullYear()
   const Month = new Date(date).getUTCMonth() + 1
   return `${Year}/${Month}`
  }
  return {
      date,
      time,
      getMonth
  }
}