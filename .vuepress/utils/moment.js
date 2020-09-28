export default (moment) => {

  const [date, time] = new Date(moment).toLocaleString().split(', ')
  let Day, Month, Year
  let m = moment && moment.includes('Z') ? moment : moment.replace(/\-/g, '/')
  const dateTime = new Date(m)
  Day = dateTime.getDate() < 10 ? `0${dateTime.getDate()}` : dateTime.getDate()
  Year = dateTime.getUTCFullYear()
  Month = (dateTime.getUTCMonth() + 1) < 10 ? `0${dateTime.getUTCMonth() + 1}` : (dateTime.getUTCMonth() + 1)
  const getMonth = () => {
    return `${Year}/${Month}`
  }
  return {
    date: `${Year}/${Month}/${Day}`,
    time,
    getMonth
  }
}

