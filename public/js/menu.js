$(document).ready(() => {
  let date = getTodayDate()
  console.log(date)
  $('#date').attr('value', date)
})

$('#date').on('change', function (e) {
  inputDate = e.target.value
  console.log(inputDate)
  this.value = inputDate
})

function getTodayDate() {
  const date = new Date()
  let day = date.getDate()
  let month = date.getMonth() + 1
  let year = date.getFullYear()
  //console.log(day, month, year)
  if (day < 10) {
    day = '0' + day
  }
  if (month < 10) {
    month = '0' + month
  }

  return `${year}-${month}-${day}`
}
