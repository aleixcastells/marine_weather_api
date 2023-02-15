import { cellColor } from './components/cell_color.js'
import { LOCATIONS } from './components/locations.js'
import { windCardinalDirection } from './components/cardinal_direction.js'
import { flagColor } from './components/flag_color.js'
import { uviColor, uviText } from './components/uvi_functions.js'

const API_URL = [
    ['https://api.open-meteo.com/v1/forecast?latitude=', '&longitude=', '&hourly=temperature_2m,apparent_temperature,precipitation,weathercode,cloudcover,windspeed_10m&models=best_match&daily=uv_index_max,uv_index_clear_sky_max&current_weather=true&timezone=auto&past_days=2'],
    ['https://marine-api.open-meteo.com/v1/marine?latitude=', '&longitude=', '&hourly=wave_height,wave_direction,wave_period&daily=wave_height_max,wave_direction_dominant,wave_period_max&timezone=auto&past_days=2']
]

class Location {
    constructor(name) { this.name = name }
}

export const LOCATION_ARRAY = []
const LOCATION_AMOUNT = LOCATIONS.length
const LOCATION_HEADERS = 4
const LOCATION_INFO_TABLES = 5
const DATE = new Date()
export const NOW = DATE.getHours()
console.log(NOW)

createLocationObjects()
console.log(LOCATION_ARRAY)




apiFetch()

async function apiFetch() {
    for (let i = 0; i < LOCATION_AMOUNT; i++) {


        let api_land_url =
            API_URL[0][0] +
            LOCATIONS[i][2] +
            API_URL[0][1] +
            LOCATIONS[i][3] +
            API_URL[0][2]

        let api_marine_url =
            API_URL[1][0] +
            LOCATIONS[i][2] +
            API_URL[1][1] +
            LOCATIONS[i][3] +
            API_URL[1][2]


        const RESPONSE_LAND = await fetch(api_land_url)
        const RESPONSE_MARINE = await fetch(api_marine_url)

        const API_DATA_LAND = await RESPONSE_LAND.json()
        const API_DATA_MARINE = await RESPONSE_MARINE.json()

        LOCATION_ARRAY[i].wave_height = API_DATA_MARINE.hourly.wave_height
        LOCATION_ARRAY[i].wave_period = API_DATA_MARINE.hourly.wave_period
        LOCATION_ARRAY[i].wave_direction = API_DATA_MARINE.hourly.wave_direction

        LOCATION_ARRAY[i].cloud_cover = API_DATA_LAND.hourly.cloudcover
        LOCATION_ARRAY[i].temperature = API_DATA_LAND.hourly.temperature_2m
        LOCATION_ARRAY[i].wind_speed = API_DATA_LAND.hourly.windspeed_10m
        LOCATION_ARRAY[i].weathercode = API_DATA_LAND.hourly.weathercode
        LOCATION_ARRAY[i].precipitation = API_DATA_LAND.hourly.precipitation
        LOCATION_ARRAY[i].uvi = API_DATA_LAND.daily.uv_index_clear_sky_max[2]

        console.log('Land', API_DATA_LAND)
        console.log('Marine', API_DATA_MARINE)
    }
    document.getElementById('loader').classList.add('hidden')
    document.getElementById('header_fixed').classList.remove('hidden')
    document.getElementById('footer').classList.remove('hidden')

    addTables()
    closeTables(true)
}

function createLocationObjects() {
    for (let i = 0; i < LOCATIONS.length; i++) {
        let location = new Location(LOCATIONS[i][0])
        LOCATION_ARRAY[i] = location
    }
}

function addTables() {

    let table_containters_array = ['table_container_1', 'table_container_2', 'table_container_3']
    let header_classes_array = ['header_flag', 'header_location', 'header_wind', 'header_temperature', 'header_town']
    let table_titles = ['WAVE HEIGHT (m)', 'WAVE PERIOD (s)', 'WAVE DIRECTION', 'CLOUD COVER (%)', 'AIR TEMPERATURE (°C)']
    let table_colors = ['waves', 'period', 'disable', 'cloudcover', 'temperature']
    let table_select = 0
    let main_container;

    let expand_button = document.getElementById('expand_button')
    expand_button.addEventListener('click', () => {

        let expand_array = ['expand all', 'close all']

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

            if (
                i == Math.ceil(LOCATION_AMOUNT / 3) ||
                i == (Math.ceil(LOCATION_AMOUNT / 3) * 2) ||
                i == (Math.ceil(LOCATION_AMOUNT / 3) * 3) ||
                i == (Math.ceil(LOCATION_AMOUNT / 3) * 4)
            ) {
                table_select++
                console.log(i)
            }

            main_container = document.getElementById(table_containters_array[table_select])
        }

        let new_div = document.createElement('div')
        let new_table = document.createElement('table')
        let new_div_uvi = document.createElement('div')
        let new_div_uvi_number = document.createElement('div')
        let new_div_uvi_text = document.createElement('div')
        let new_div_hour_axis = document.createElement('div')
        let new_thead = document.createElement('thead')
        let new_header_tr = document.createElement('tr')

        main_container.append(new_div)
        new_div.setAttribute('class', 'table_div table_div_open')
        new_div.setAttribute('id', `table_div_${(i + 1)}`)

        new_div.addEventListener('click', (event) => {

            console.dir(event.currentTarget.id)
            console.log(document.getElementById(event.currentTarget.id))

            if (document.getElementById(event.currentTarget.id).classList.contains('table_div_open')) {
                document.getElementById(event.currentTarget.id).classList.replace('table_div_open', 'table_div_collapsed')
                document.getElementById('inner_div_' + event.currentTarget.id.match(/\d{1,}$/g)).classList.replace('visible', 'hidden')
                document.getElementById('inner_div_wrap_' + event.currentTarget.id.match(/\d{1,}$/g)).classList.replace('inner_open', 'inner_closed')
            }

            else {
                document.getElementById(event.currentTarget.id).classList.replace('table_div_collapsed', 'table_div_open')
                document.getElementById('inner_div_' + event.currentTarget.id.match(/\d{1,}$/g)).classList.replace('hidden', 'visible')
                document.getElementById('inner_div_wrap_' + event.currentTarget.id.match(/\d{1,}$/g)).classList.replace('inner_closed', 'inner_open')
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

        let table_inner_div_wrap = document.createElement('div')
        table_inner_div_wrap.setAttribute('class', 'inner_div_wrap inner_open')
        table_inner_div_wrap.setAttribute('id', `inner_div_wrap_${(i + 1)}`)
        let table_inner_div = document.createElement('div')
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
                    if (k + (12 * j) == NOW - 1) {
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

function selectData(i, table_row_number, k, j) {
    switch (table_row_number) {
        case 0: return (LOCATION_ARRAY[i].wave_height[(k + (12 * j)) + 49]).toFixed(1)
        case 1: return (LOCATION_ARRAY[i].wave_period[(k + (12 * j)) + 49]).toFixed(0)
        case 2: return (LOCATION_ARRAY[i].wave_direction[(k + (12 * j)) + 49]).toFixed(0)
        case 3: return (LOCATION_ARRAY[i].cloud_cover[(k + (12 * j)) + 49]).toFixed(0)
        case 4: return (LOCATION_ARRAY[i].temperature[(k + (12 * j)) + 49]).toFixed(1)
    }
}

function closeTables(toggle) {

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



