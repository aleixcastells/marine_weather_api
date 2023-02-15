import { LOCATION_ARRAY } from '../main.js'


export function closeTables(toggle) {
    if (toggle == true) {
        for (let j = 1; j <= LOCATION_ARRAY.length; j++) {
            document.getElementById('table_div_' + j).classList.replace('table_div_open', 'table_div_collapsed')
            document.getElementById('inner_div_' + j).classList.replace('visible', 'hidden')
            document.getElementById('inner_div_wrap_' + j).classList.replace('inner_open', 'inner_closed')
        }
    }

    if (toggle == false) {
        for (let j = 1; j <= LOCATION_ARRAY.length; j++) {
            document.getElementById('table_div_' + j).classList.replace('table_div_collapsed', 'table_div_open')
            document.getElementById('inner_div_' + j).classList.replace('hidden', 'visible')
            document.getElementById('inner_div_wrap_' + j).classList.replace('inner_closed', 'inner_open')
        }
    }
}

