// Sidebar
function openNav() {
  $('#sidebar').css('width', '250px')
  $('#main').css('margin-left', '250px')
}

function closeNav() {
  $('#sidebar').css('width', '0px')
  $('#main').css('margin-left', '0px')
}

// Ingredient
$('.macros').on('keyup', (e) => {
  console.log('keyup')
  // console.log(e.target.name, e.target.value)

  let carb = $('.macros[name="carb"]').val()
  let protein = $('.macros[name="protein"]').val()
  let fat = $('.macros[name="fat"]').val()

  if (e.target.name === 'carb') {
    carb = e.target.value
  } else if (e.target.name === 'protein') {
    protein = e.target.value
  } else if (e.target.name === 'fat') {
    fat = e.target.value
  }

  console.log('carb', carb, 'protein', protein, 'fat', fat)
  calculateCalories(carb, protein, fat, (calories) => {
    console.log(calories)
    $('#calories').val(calories.toFixed(2))
  })
})

$('#ingredient-table').submit(() => {
  $(':disabled').each(function (e) {
    $(this).removeAttr('disabled');
  })
})

// Dish
const table = document.getElementById("dish-list");
let AllIngredient, selectedItem;
let row, unit, portion, value;
let cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, cell9, cell10, cell11, cell12, cell13, cell14;

$(document).ready(() => {
  getIngredientsRows()// get ingredients rows correct value
  getTotalRow(table)
  getAllIngredient()
    .then((data) => {
      //console.log(data[0])
      data.forEach(ingredient => {
        let option = `<option value='${ingredient.ingredient_name}'>${ingredient.ingredient_name}</option>`
        $('#selectIngredient').append(option)
      });

      AllIngredient = data
    })
})

$('#selectIngredient').change(function () {
  console.log($(this).val())
  selectedItem = $(this).val()
})

$('#selectUnit, .portionUnit').change(function () {
  console.log($(this).val())
  unit = $(this).val()
})

$('#add-item').on('click', () => {
  portion = $('#selectPortion').val()
  console.log(selectedItem)
  console.log(AllIngredient)
  console.log(portion)
  console.log(unit)

  calculatePortion(portion, unit)
  addNewColumn(table)

  let selectedItemInfo = AllIngredient.filter(item => item.ingredient_name == selectedItem)
  console.log(selectedItemInfo)
  let portionRatio = value / 100

  cell1.innerHTML = `
  <span class="left">
  <a href="/ingredient/${selectedItemInfo[0].id}" id="ingredient-link">
  ${selectedItemInfo[0].ingredient_name}
              </a>
              <i class="fa-solid fa-pen-to-square edit-btn" type="button"></i>
    </span>
    <span class="right disappear">
      <i class="fa-solid fa-check fa-xl check-btn" type="button"></i>
      <i class="fa-solid fa-xmark fa-xl cancel-btn" style="color: #fa0000;" type="button"></i>
      </span>
      `
  cell2.innerText = value.toFixed(2)
  cell3.innerText = Number(portion).toFixed(2) + ' ' + unit
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

$('.edit-btn').on('click', function () {
  console.log('edit button')
  $(this).parent().siblings().removeClass('disappear')
  $(this).addClass('disappear')
  $('.portionValue').removeClass('disappear')
  $('.portionUnit').removeClass('disappear')
})

$('.check-btn').on('click', function () {
  $(this).parent().prev().children().removeClass('disappear')
  $(this).parent().addClass('disappear')
  $('.portionValue').addClass('disappear')
  $('.portionUnit').addClass('disappear')

  //get portion input value and unit
  let portionValue = $('.portionValue').val()
  console.log(portionValue, unit)
  let rowIndex = this.parentNode.parentNode.parentNode.rowIndex;

  if (!portionValue || !unit) {
    console.log('please add a value')
    return
  }

  updateRow(rowIndex, portionValue, unit)
  getTotalRow(table)
})

$('.cancel-btn').on('click', function () {
  $('.portionValue').addClass('disappear')
  $('.portionUnit').addClass('disappear')

  let rowIndex = this.parentNode.parentNode.parentNode.rowIndex;
  console.log(rowIndex)
  deleteRow(rowIndex)
})

$('#dish-table').submit(function (e) {
  e.preventDefault();

  const body = table.tBodies[0]
  const rows = Array.from(body.querySelectorAll('tr'));
  const dishId = $(this).data('dishId')

  //get total row value
  let totalRowValue = [{}]
  let key = 1
  rows[rows.length - 1].querySelectorAll('td').forEach(value => {
    totalRowValue[0][key] = value.innerText
    key++
  })
  //get individual ingredient name, portion, unit
  let ingredientList = []
  for (let i = 1; i < rows.length - 1; i++) {
    ingredientList.push({})
    for (let j = 0; j < 3; j++) {
      let value = rows[i].querySelectorAll('td')[j].innerText
      if (j == 0) {
        ingredientList[i - 1]["name"] = value
      } else if (j == 1) {
        ingredientList[i - 1]["portion"] = value
      } else if (j == 2) {
        ingredientList[i - 1]["unit"] = value
      }
    }
  }

  console.log('totalRowValue ', totalRowValue)
  console.log('ingredientList ', ingredientList)
  console.log('dishId :', dishId)

  if (ingredientList.length == 0) {
    console.log('please add an ingredient to update')
    return
  }
  //send as a data set through ajax
  $.ajax({
    url: `http://localhost:3000/updateDish/${dishId}`,
    method: 'PUT',
    contentType: 'application/json',
    data: JSON.stringify({
      totalRowValue: totalRowValue,
      ingredientList: ingredientList
    })
  }).done((data) => {
    console.log(data)
  }).fail((err) => {
    console.log('err :', err)
  }).always(() => {
    location.reload()
  })
})

function calculateCalories(c, p, f, cb) {
  return cb(c * 4 + p * 4 + f * 9)
}

function calculatePortion(portion, unit) {

  switch (unit) {
    case 'ounce':
      value = portion * 28.3495
      break;
    case 'gram':
      value = portion * 1
      break;
    case 'millimeter':
      value = portion * 1
      break;
    case 'litres':
      value = portion * 1000
      break;
    case 'pound':
      value = portion * 453.592
      break;
    case 'teaspoon':
      value = portion * 5.69
      break;
    case 'tablespoon':
      value = portion * 14.175
      break;
    case 'cup':
      value = portion * 140
      break;

    default:
      value = portion * 1
      break;
  }

}

function handleEditInputs() {
  let input = document.createElement('input')
  let select = document.createElement('select')

  input.setAttribute('type', 'number')
  input.setAttribute('name', 'portionValue')
  input.setAttribute('placeholder', 'Portion')
  input.setAttribute('class', 'disappear')
  input.setAttribute('class', 'portionValue')

  select.setAttribute('class', 'portionUnit')
  select.setAttribute('class', 'disappear')
  select.innerHTML = `
    <option value="">--Unit</option>
    <option value="ounce">Ounce</option>
    <option value="gram">Gram</option>
    <option value="millimeter">Millimeter</option>
    <option value="litres">Litres</option>
    <option value="pound">Pound</option>
    <option value="teaspoon">Teaspoon</option>
    <option value="tablespoon">Tablespoon</option>
    <option value="cup">Cup</option>
  `

  //$('#newItem-section').append(input)
  $('#newItem-section').append(select)
}

function attachButtonsFunctionality(row) {
  const editButton = row.querySelector('.edit-btn');
  const checkButton = row.querySelector('.check-btn')
  const cancelButton = row.querySelector('.cancel-btn')


  editButton.addEventListener('click', function () {
    console.log('edit button')
    $(this).parent().siblings().removeClass('disappear')
    $(this).addClass('disappear')
    $('.portionValue').removeClass('disappear')
    $('.portionUnit').removeClass('disappear')
  })
  checkButton.addEventListener('click', function () {
    $(this).parent().prev().children().removeClass('disappear')
    $(this).parent().addClass('disappear')
    $('.portionValue').addClass('disappear')
    $('.portionUnit').addClass('disappear')

    let portionValue = $('.portionValue').val()
    console.log(portionValue, unit)
    let rowIndex = this.parentNode.parentNode.parentNode.rowIndex;

    if (!portionValue || !unit) {
      console.log('please add a value')
      return
    }

    updateRow(rowIndex, portionValue, unit)
    getTotalRow(table)
  })
  cancelButton.addEventListener('click', function () {
    $('.portionValue').addClass('disappear')
    $('.portionUnit').addClass('disappear')

    let rowIndex = this.parentNode.parentNode.parentNode.rowIndex;
    console.log(rowIndex)
    deleteRow(rowIndex)
  })
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

function deleteRow(index) {
  table.deleteRow(index)
  getTotalRow(table)
}

function updateRow(index, portion, unit) {
  let row = table.rows[index]
  let originalPortion = row.querySelectorAll('td')[1].innerText
  let originalUnit = row.querySelectorAll('td')[2].innerText
  console.log(originalPortion)

  if (!portion || portion == 0) {
    portion = originalPortion
  }
  if (!unit || unit === undefined) {
    unit = originalUnit
  }

  calculatePortion(portion, unit)

  let changeRatio = value / Number(originalPortion)
  console.log('newPortion ', value)
  console.log('changeRatio ', changeRatio)

  row.querySelectorAll('td')[1].innerText = value.toFixed(2)
  row.querySelectorAll('td')[2].innerText = portion + ' ' + unit

  for (let i = 3; i < 14; i++) {
    let cellData = row.querySelectorAll('td')[i].innerText
    cellData = Number(cellData) * changeRatio
    row.querySelectorAll('td')[i].innerText = cellData.toFixed(2)
  }
}

function getAllIngredient() {
  console.log('getting ingredient')
  return new Promise((resolve, reject) => {
    $.ajax({
      url: 'http://localhost:3000/selectIngredient',
      success: function (result) {
        resolve(result)
      },
      error: function (err) {
        reject(err)
      }
    })
  })
}

function getTotalRow(table) {
  const body = table.tBodies[0]
  const rows = Array.from(body.querySelectorAll('tr'));

  let lastRow = rows[rows.length - 1]
  let columnLength = rows[0].querySelectorAll('th').length

  for (let j = 1; j < columnLength; j++) {
    let total = 0

    for (let i = 1; i < rows.length - 1; i++) {
      const td = rows[i].querySelectorAll('td')[j].innerText;
      (total) += Number(td)
    }

    //console.log(total)
    if (Number.isNaN(total)) {
      lastRow.querySelectorAll('td')[j].innerText = ''
    } else {
      lastRow.querySelectorAll('td')[j].innerText = total.toFixed(2)
    }
  }
}

function getIngredientsRows() {
  const body = table.tBodies[0]
  const rows = Array.from(body.querySelectorAll('tr'));

  for (let j = 1; j < rows.length - 1; j++) {
    let portion = rows[j].querySelectorAll('td')[1].innerText
    let portionRatio = Number(portion) / 100
    console.log('row', j, 'portion:', Number(portion), 'portionRatio: ', portionRatio)

    for (let i = 3; i < 14; i++) {
      let cell = rows[j].querySelectorAll('td')[i].innerText
      let finalValue = Number(cell) * portionRatio
      rows[j].querySelectorAll('td')[i].innerText = finalValue.toFixed(2)
    }

  }
}
