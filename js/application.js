// Calculate total cost
const setTotal = function() {
    let total = 0
    $('.cost>span').each(function (idx) {
        const cost = parseFloat($(this).text())
        if (!isNaN(cost)) {
            total += cost
        }
    })
    $('#cartTotal>span').text(total.toFixed(2))
}

// For removing rows (items)
$(document).on('click', '.btn.remove', function (event) {
    $(this).closest('tr').remove()
    setTotal()
})

// Set cost of line item
const setCost = function (row) {
    const price = parseFloat(row.find('.price>span').text())
    const qty = parseFloat(row.find('.qty>input').val())
    const sum = price * qty

    row.find('.cost>span').text(sum.toFixed(2))
    setTotal()
}

// Add new item
$('.btn.add').click(function (event) {
    const itemName = $('#item').val()
    const priceTag = $('#price').val()

    if (itemName === '' || priceTag === '') {
        return
    }

    const newRow = $('<tr></tr>')

    const itemTd = $('<td></td>').addClass('item').text(itemName)
    newRow.append(itemTd)
    const priceTd = $('<td>$ <span></span></td>').addClass('price')
    priceTd.find('span').text(parseFloat(priceTag).toFixed(2))
    newRow.append(priceTd)
    const qtyTd = $('<td></td>').addClass('qty').append($('<input type="number" value="1" />'))
    newRow.append(qtyTd)
    const costTd = $('<td>$ <span></span></td>').addClass('cost')
    newRow.append(costTd)
    const removeTd = $('<td></td>').append($('<button class="btn btn-xs remove">Remove</button>'))
    newRow.append(removeTd)

    newRow.insertBefore($('#lastRow'))
    setCost(newRow)

    $('#item').val('')
    $('#price').val('')

})

// Set costs of existing rows
$('tbody>tr:not(#lastRow)').each(function(idx) {
    setCost($(this))
})

// Set cost when qty changes
$(document).on('change', '.qty>input', function(event) {
    const row = $(this).closest('tr')
    setCost(row)
})
