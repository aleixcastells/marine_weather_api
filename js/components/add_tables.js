import { LOCATION_ARRAY, LOCATION_AMOUNT, LOCATION_HEADERS, NOW, LOCATION_INFO_TABLES, open_tables } from '../main.js'
import { flagColor } from './flag_color.js'
import { LOCATIONS } from './locations.js'
import { selectData } from './select_data.js'
import { cellColor } from './cell_color.js'
import { uviColor, uviText } from './uvi_functions.js'
import { windCardinalDirection } from './cardinal_direction.js'
import { closeTables } from './close_tables.js'

export function addTables() {

    let table_containters_array = ['table_container_1', 'table_container_2', 'table_container_3']
    let header_classes_array = ['header_flag', 'header_location', 'header_wind', 'header_temperature', 'header_town']
    let table_titles = ['WAVE HEIGHT (m)', 'WAVE PERIOD (s)', 'WAVE DIRECTION', 'CLOUD COVER (%)', 'AIR TEMPERATURE (°C)']
    let table_colors = ['waves', 'period', 'disable', 'cloudcover', 'temperature']
    let table_select = 0
    let main_container;
    let expand_array = ['expand all', 'close all']

    let expand_button = document.getElementById('expand_button')
    expand_button.addEventListener('click', () => {

        if (expand_button.textContent == expand_array[0]) {
            expand_button.textContent = expand_array[1]
            closeTables(false)
        }
        else {
            expand_button.textContent = expand_array[0]
            closeTables(true)
        }
    })

    for (let i = 0; i < LOCATION_AMOUNT; i++) {
        if (LOCATION_AMOUNT <= 0) { return }
        if (LOCATION_AMOUNT <= 3) { main_container = document.getElementById(table_containters_array[table_select]) }
        if (LOCATION_AMOUNT > 3) {
            if (i % Math.ceil(LOCATION_AMOUNT / 3) == 0 && i % Math.ceil(LOCATION_AMOUNT / 3) != 0) {
                table_select++
            }
        }

        main_container = document.getElementById(table_containters_array[Math.floor(i / (LOCATION_AMOUNT / 3))])

        let new_div = document.createElement('div')
        let new_table = document.createElement('table')
        let new_div_uvi = document.createElement('div')
        let new_div_uvi_number = document.createElement('div')
        let new_div_uvi_text = document.createElement('div')
        let new_div_hour_axis = document.createElement('div')
        let new_thead = document.createElement('thead')
        let new_header_tr = document.createElement('tr')
        let table_inner_div_wrap = document.createElement('div')
        let table_inner_div = document.createElement('div')

        main_container.append(new_div)
        new_div.setAttribute('class', 'table_div table_div_open')
        new_div.setAttribute('id', `table_div_${(i + 1)}`)
        new_div.addEventListener('click', (event) => {

            if (document.getElementById(event.currentTarget.id).classList.contains('table_div_open')) {
                document.getElementById(event.currentTarget.id).classList.replace('table_div_open', 'table_div_collapsed')
                document.getElementById('inner_div_' + event.currentTarget.id.match(/\d{1,}$/g)).classList.replace('visible', 'hidden')
                document.getElementById('inner_div_wrap_' + event.currentTarget.id.match(/\d{1,}$/g)).classList.replace('inner_open', 'inner_closed')
                open_tables[0]--
            }
            else {
                document.getElementById(event.currentTarget.id).classList.replace('table_div_collapsed', 'table_div_open')
                document.getElementById('inner_div_' + event.currentTarget.id.match(/\d{1,}$/g)).classList.replace('hidden', 'visible')
                document.getElementById('inner_div_wrap_' + event.currentTarget.id.match(/\d{1,}$/g)).classList.replace('inner_closed', 'inner_open')
                open_tables[0]++
            }

            if (open_tables[0] == LOCATION_AMOUNT) {
                expand_button.textContent = expand_array[1]
            }
            if (open_tables[0] == 0) {
                expand_button.textContent = expand_array[0]
            }
        })

        new_div.append(new_table)
        new_table.setAttribute('class', 'table table-dark')
        new_table.append(new_thead)
        new_thead.append(new_header_tr)

        for (let h = 0; h < LOCATION_HEADERS; h++) {
            let new_th = document.createElement('th')
            new_th.setAttribute('scope', 'col')
            new_header_tr.append(new_th)
            new_th.setAttribute('class', header_classes_array[h])

            if (h == 0) { new_th.setAttribute('class', `${flagColor(i)} header_flag`) }
            if (h == 1) { new_th.innerHTML = `<div class="${header_classes_array[4]}">${LOCATIONS[i][1]}</div><div>${LOCATIONS[i][0]}</div>` }
            if (h == 2) { new_th.textContent = `↖ ${Math.round(LOCATION_ARRAY[i].wind_speed[48 + NOW])} kmh` }
            if (h == 3) { new_th.textContent = `${(LOCATION_ARRAY[i].temperature[48 + NOW]).toFixed(0)} ºC` }
        }

        table_inner_div_wrap.setAttribute('class', 'inner_div_wrap inner_open')
        table_inner_div_wrap.setAttribute('id', `inner_div_wrap_${(i + 1)}`)
        new_div.append(table_inner_div_wrap)

        table_inner_div_wrap.append(table_inner_div)

        table_inner_div.setAttribute('class', 'inner_div visible')
        table_inner_div.setAttribute('id', `inner_div_${(i + 1)}`)
        table_inner_div.append(new_div_hour_axis)
        new_div_hour_axis.setAttribute('class', 'new_div_hour_axis')

        for (let g = 0; g < 12; g++) {
            let new_div_hour_axis_cells = document.createElement('div')
            new_div_hour_axis.append(new_div_hour_axis_cells)
            new_div_hour_axis_cells.innerHTML = (`${g + 1}<br>|`)

            if (g == NOW - 1 || g == NOW - 13) {
                new_div_hour_axis_cells.setAttribute('class', 'new_div_hour_axis_cells axis_highlight')
            }
            else {
                new_div_hour_axis_cells.setAttribute('class', 'new_div_hour_axis_cells')
            }
        }

        for (let y = 0; y < LOCATION_INFO_TABLES; y++) {
            let new_div_colortable = document.createElement('div')
            let new_div_colortable_title = document.createElement('div')
            table_inner_div.append(new_div_colortable)
            new_div_colortable.setAttribute('class', 'div_colortable')
            new_div_colortable.append(new_div_colortable_title)
            new_div_colortable_title.setAttribute('class', 'div_colortable_title')
            new_div_colortable_title.innerText = table_titles[y]

            for (let j = 0; j < 2; j++) {
                let new_div_colortable_row = document.createElement('div')
                new_div_colortable.append(new_div_colortable_row)
                new_div_colortable_row.setAttribute('class', 'colortable_row')

                for (let k = 0; k < 12; k++) {
                    let new_div_colortable_cell = document.createElement('div')
                    new_div_colortable_row.append(new_div_colortable_cell)
                    new_div_colortable_cell.textContent = `${selectData(i, y, k, j)}`
                    if (y != 2) { new_div_colortable_cell.setAttribute('class', `colortable_cell ${cellColor(new_div_colortable_cell.textContent, table_colors[y])}`) }
                    if (y == 2) { new_div_colortable_cell.setAttribute('class', `colortable_cell wind_cell`) }
                    if (y == 2) { new_div_colortable_cell.textContent = windCardinalDirection(new_div_colortable_cell.textContent) }
                    if (k + (12 * j) == NOW) {
                        new_div_colortable_cell.classList.add('cell_highlight')
                    }
                }
            }
        }

        if (LOCATION_ARRAY[i].uvi != null) {
            table_inner_div.append(new_div_uvi)
            new_div_uvi.setAttribute('class', 'new_div_uvi')
            new_div_uvi.append(new_div_uvi_number)
            new_div_uvi_number.textContent = `UVI ${(LOCATION_ARRAY[i].uvi).toFixed(1)}`
            new_div_uvi_number.setAttribute('class', 'new_div_uvi_number')
            new_div_uvi_number.setAttribute('id', 'uvi_number' + (i + 1))
            new_div_uvi.append(new_div_uvi_text)
            new_div_uvi_text.textContent = uviText(LOCATION_ARRAY[i].uvi)
            uviColor(i)
            new_div_uvi_text.setAttribute('class', 'new_div_uvi_text')
        }
    }
}