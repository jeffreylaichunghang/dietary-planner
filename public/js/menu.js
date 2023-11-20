const table = document.getElementById('menu-list')
let AllDish, selectedItem, meal, date;

// Sidebar
function openNav() {
  $('#sidebar').css('width', '250px')
}

function closeNav() {
  $('#sidebar').css('width', '0px')
}

$(document).ready(() => {
  // date = getTodayDate()
  // console.log(date)
  // $('#date').attr('value', date)

  getAllDishes()
    .then((data) => {
      //console.log(data[0])
      data.forEach(dish => {
        let option = `<option value='${dish.name}'>${dish.name}</option>`
        $('#selectDish').append(option)
      });

      AllDish = data
    })

  getTotalRow(table)
})

$('#date').on('change', function (e) {
  inputDate = e.target.value
  console.log(inputDate)
  this.value = inputDate
})

$('#selectMeal').change(function () {
  console.log($(this).val())
  meal = $(this).val()
})

$('.edit-btn').on('click', function () {
  console.log('edit button')
  $(this).parent().siblings().removeClass('disappear')
  $(this).addClass('disappear')
  $('.portionValue').removeClass('disappear')
  $('.selectMeal').removeClass('disappear')
})

$('.check-btn').on('click', function () {
  $(this).parent().prev().children().removeClass('disappear')
  $(this).parent().addClass('disappear')
  $('.portionValue').addClass('disappear')
  $('.selectMeal').addClass('disappear')

  //get portion input value and unit
  let portionValue = $('.portionValue').val()
  meal = $('.selectMeal').val()
  console.log(portionValue)
  let rowIndex = this.parentNode.parentNode.parentNode.rowIndex;

  if (!portionValue) {
    console.log('please add a value')
    return
  }

  updateRow(rowIndex, portionValue, meal)
  getTotalRow(table)
})

$('.cancel-btn').on('click', function () {
  $('.portionValue').addClass('disappear')
  $('.selectMeal').addClass('disappear')

  let rowIndex = this.parentNode.parentNode.parentNode.rowIndex;
  console.log(rowIndex)
  deleteRow(rowIndex)
})

$('#selectDish').change(function () {
  console.log($(this).val())
  selectedItem = $(this).val()
})

$('#add-item').on('click', () => {
  portion = $('#selectPortion').val()
  console.log(selectedItem)
  console.log(AllDish)
  console.log(portion)

  addNewColumn(table)

  let selectedItemInfo = AllDish.filter(item => item.name == selectedItem)
  console.log(selectedItemInfo)
  let portionRatio = portion / 100

  cell1.innerText = meal
  cell2.innerHTML = `
  <span class="left">
  <a href="/dish/${selectedItemInfo[0].id}" id="dish-link">
  ${selectedItemInfo[0].name}
              </a>
              <i class="fa-solid fa-pen-to-square edit-btn" type="button"></i>
    </span>
    <span class="right disappear">
      <i class="fa-solid fa-check fa-xl check-btn" type="button"></i>
      <i class="fa-solid fa-xmark fa-xl cancel-btn" style="color: #fa0000;" type="button"></i>
      </span>
      `
  cell3.innerText = Number(portion).toFixed(2)
  cell4.innerText = Number(selectedItemInfo[0].calories * portionRatio).toFixed(2)
  cell5.innerText = Number(selectedItemInfo[0].carb * portionRatio).toFixed(2)
  cell6.innerText = Number(selectedItemInfo[0].protein * portionRatio).toFixed(2)
  cell7.innerText = Number(selectedItemInfo[0].fat * portionRatio).toFixed(2)
  cell8.innerText = Number(selectedItemInfo[0].cholesterol * portionRatio).toFixed(2)
  cell9.innerText = Number(selectedItemInfo[0].trans_fat * portionRatio).toFixed(2)
  cell10.innerText = Number(selectedItemInfo[0].sat_fat * portionRatio).toFixed(2)
  cell11.innerText = Number(selectedItemInfo[0].fibre * portionRatio).toFixed(2)
  cell12.innerText = Number(selectedItemInfo[0].sodium * portionRatio).toFixed(2)
  cell13.innerText = Number(selectedItemInfo[0].sugar * portionRatio).toFixed(2)
  cell14.innerText = Number(selectedItemInfo[0].cost * portionRatio).toFixed(2)


  handleEditInputs()
  attachButtonsFunctionality(row)
  getTotalRow(table)
})

$('#menu-table').submit(function (e) {
  e.preventDefault();

  const body = table.tBodies[0]
  const rows = Array.from(body.querySelectorAll('tr'));
  const menuId = $(this).data('menuId')
  date = $('#date').val()

  //get total row value
  let totalRowValue = [{}]
  let key = 1
  rows[rows.length - 1].querySelectorAll('td').forEach(value => {
    totalRowValue[0][key] = value.innerText
    key++
  })
  //get individual ingredient name, portion, unit
  let dishList = []
  for (let i = 1; i < rows.length - 1; i++) {
    dishList.push({})
    for (let j = 0; j < 3; j++) {
      let value = rows[i].querySelectorAll('td')[j].innerText
      if (j == 0) {
        dishList[i - 1]["meal"] = value
      } else if (j == 1) {
        dishList[i - 1]["dish"] = value
      } else if (j == 2) {
        dishList[i - 1]["portion"] = value
      }
    }
  }

  console.log('totalRowValue ', totalRowValue)
  console.log('dishList ', dishList)
  console.log('menuId :', menuId)
  console.log('date submitted :', date)

  if (dishList.length == 0) {
    console.log('please add an ingredient to update')
    return
  }
  //send as a data set through ajax
  $.ajax({
    url: `https://distaryplanner.site/updateMenu/${menuId}`,
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
      totalRowValue: totalRowValue,
      dishList: dishList,
      date: date
    })
  }).done((data) => {
    //console.log(data)
  }).fail((err) => {
    console.log('err :', err)
  }).always(() => {
    //location.reload()
  })
})


function attachButtonsFunctionality(row) {
  const editButton = row.querySelector('.edit-btn');
  const checkButton = row.querySelector('.check-btn')
  const cancelButton = row.querySelector('.cancel-btn')


  editButton.addEventListener('click', function () {
    console.log('edit button')
    $(this).parent().siblings().removeClass('disappear')
    $(this).addClass('disappear')
    $('.portionValue').removeClass('disappear')
    $('.selectMeal').removeClass('disappear')
  })
  checkButton.addEventListener('click', function () {
    $(this).parent().prev().children().removeClass('disappear')
    $(this).parent().addClass('disappear')
    $('.portionValue').addClass('disappear')
    $('.selectMeal').addClass('disappear')

    let portionValue = $('.portionValue').val()
    console.log(portionValue, meal)
    meal = $('.selectMeal').val()
    let rowIndex = this.parentNode.parentNode.parentNode.rowIndex;

    if (!portionValue) {
      console.log('please add a value')
      return
    }

    updateRow(rowIndex, portionValue, meal)
    getTotalRow(table)
  })
  cancelButton.addEventListener('click', function () {
    $('.portionValue').addClass('disappear')
    $('.selectMeal').addClass('disappear')

    let rowIndex = this.parentNode.parentNode.parentNode.rowIndex;
    console.log(rowIndex)
    deleteRow(rowIndex)
  })
}

function handleEditInputs() {
  let input = document.createElement('input')
  let select = document.createElement('select')

  input.setAttribute('type', 'number')
  input.setAttribute('name', 'portionValue')
  input.setAttribute('placeholder', 'Portion')
  input.setAttribute('class', 'disappear')
  input.setAttribute('class', 'portionValue')

  select.setAttribute('class', 'selectMeal')
  select.setAttribute('class', 'disappear')
  select.innerHTML = `
    <option value="">--Meal</option>
    <option value="breakfast">Breakfast</option>
    <option value="lunch">Lunch</option>
    <option value="dinner">Dinner</option>
    <option value="snack">Snack</option>
  `

  $('#newItem-section').append(select)
}

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

function getTotalRow(table) {
  const body = table.tBodies[0]
  const rows = Array.from(body.querySelectorAll('tr'));

  let lastRow = rows[rows.length - 1]
  let columnLength = rows[0].querySelectorAll('th').length

  for (let j = 2; j < columnLength; j++) {
    let total = 0

    for (let i = 1; i < rows.length - 1; i++) {
      const td = rows[i].querySelectorAll('td')[j].innerText;
      (total) += Number(td)
    }

    //console.log(total)
    lastRow.querySelectorAll('td')[j].innerText = total.toFixed(2)
  }
}

function addNewColumn(table) {
  row = table.insertRow(1);//insert <tr>

  cell1 = row.insertCell(0)
  cell2 = row.insertCell(1)
  cell3 = row.insertCell(2)
  cell4 = row.insertCell(3)
  cell5 = row.insertCell(4)
  cell6 = row.insertCell(5)
  cell7 = row.insertCell(6)
  cell8 = row.insertCell(7)
  cell9 = row.insertCell(8)
  cell10 = row.insertCell(9)
  cell11 = row.insertCell(10)
  cell12 = row.insertCell(11)
  cell13 = row.insertCell(12)
  cell14 = row.insertCell(13)
}

function updateRow(index, portion, meal) {
  let row = table.rows[index]
  let originalPortion = row.querySelectorAll('td')[2].innerText
  let originalMeal = row.querySelectorAll('td')[0].innerText
  console.log('originalPortion :', originalPortion)
  console.log('row :', index)
  console.log('meal :', meal)

  if (!portion || portion == 0) {
    portion = originalPortion
  }
  if (!meal || meal == undefined) {
    meal = originalMeal
  }

  let changeRatio = portion / Number(originalPortion)
  console.log('changeRatio ', changeRatio)

  row.querySelectorAll('td')[0].innerText = meal
  row.querySelectorAll('td')[2].innerText = Number(portion).toFixed(2)

  for (let i = 3; i < 14; i++) {
    let cellData = row.querySelectorAll('td')[i].innerText
    cellData = Number(cellData) * changeRatio
    row.querySelectorAll('td')[i].innerText = cellData.toFixed(2)
  }
}

function deleteRow(index) {
  table.deleteRow(index)
  getTotalRow(table)
}

function getAllDishes() {
  console.log('getting dish')
  return new Promise((resolve, reject) => {
    $.ajax({
      url: 'https://dietaryplanner.site/selectDish',
      success: function (result) {
        resolve(result)
      },
      error: function (err) {
        reject(err)
      }
    })
  })
}
