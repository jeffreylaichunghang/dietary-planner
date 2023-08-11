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
$(document).ready(() => {
  const table = document.getElementById("dish-list")
  getTotalRow(table)
})



function calculateCalories(c, p, f, cb) {
  return cb(c * 4 + p * 4 + f * 9)
}

function getTotalRow(table) {
  const body = table.tBodies[0]
  const rows = Array.from(body.querySelectorAll('tr'));

  let lastRow = rows[rows.length - 1]
  let columnLength = rows[0].querySelectorAll('th').length

  for (let j = 1; j < columnLength; j++) {
    let totalCell = lastRow.querySelectorAll('td')[j].innerText // all cells from the last column
    let total = 0

    for (let i = 1; i < rows.length - 1; i++) {
      const td = rows[i].querySelectorAll('td')[j].innerText;
      (total) += Number(td)
    }

    console.log(total)
    if (total === NaN) {
      lastRow.querySelectorAll('td')[j].innerText = ''
    } else {
      lastRow.querySelectorAll('td')[j].innerText = total.toFixed(2)
    }
  }
}
