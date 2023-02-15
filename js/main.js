import { LOCATIONS } from './components/locations.js'
import { closeTables } from './components/close_tables.js'
import { addTables } from './components/add_tables.js'

const API_URL = [
    ['https://api.open-meteo.com/v1/forecast?latitude=', '&longitude=', '&hourly=temperature_2m,apparent_temperature,precipitation,weathercode,cloudcover,windspeed_10m&models=best_match&daily=uv_index_max,uv_index_clear_sky_max&current_weather=true&timezone=auto&past_days=2'],
    ['https://marine-api.open-meteo.com/v1/marine?latitude=', '&longitude=', '&hourly=wave_height,wave_direction,wave_period&daily=wave_height_max,wave_direction_dominant,wave_period_max&timezone=auto&past_days=2']
]

class Location {
    constructor(name) {
        this.name = name
    }
}

const DATE = new Date()
export const NOW = DATE.getHours()
export const LOCATION_ARRAY = []
export const LOCATION_AMOUNT = LOCATIONS.length
export const LOCATION_HEADERS = 4
export const LOCATION_INFO_TABLES = 5
export let open_tables = []

console.log(NOW)
console.log(LOCATION_ARRAY)

createLocationObjects()
apiFetch()

function createLocationObjects() {
    for (let i = 0; i < LOCATIONS.length; i++) {
        let location = new Location(LOCATIONS[i][0])
        LOCATION_ARRAY[i] = location
    }
}

async function apiFetch() {
    for (let i = 0; i < LOCATION_AMOUNT; i++) {

        let api_land_url = API_URL[0][0] + LOCATIONS[i][2] + API_URL[0][1] + LOCATIONS[i][3] + API_URL[0][2]
        let api_marine_url = API_URL[1][0] + LOCATIONS[i][2] + API_URL[1][1] + LOCATIONS[i][3] + API_URL[1][2]

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
    }
    document.getElementById('loader').classList.add('hidden')
    document.getElementById('header_fixed').classList.remove('hidden')
    document.getElementById('footer').classList.remove('hidden')

    addTables()
    closeTables(true)
}


// Interact with module console
// import('./js/main.js').then(m => module = m)

export function test() {
    console.log('test success!')
}