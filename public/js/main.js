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

function calculateCalories(c, p, f, cb) {
  return cb(c * 4 + p * 4 + f * 9)
}
