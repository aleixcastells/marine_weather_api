import { LOCATION_ARRAY } from '../main.js'

export function selectData(i, table_row_number, k, j) {
    switch (table_row_number) {
        case 0: return (LOCATION_ARRAY[i].wave_height[(k + (12 * j)) + 49]).toFixed(1)
        case 1: return (LOCATION_ARRAY[i].wave_period[(k + (12 * j)) + 49]).toFixed(0)
        case 2: return (LOCATION_ARRAY[i].wave_direction[(k + (12 * j)) + 49]).toFixed(0)
        case 3: return (LOCATION_ARRAY[i].cloud_cover[(k + (12 * j)) + 49]).toFixed(0)
        case 4: return (LOCATION_ARRAY[i].temperature[(k + (12 * j)) + 49]).toFixed(1)
    }
}

