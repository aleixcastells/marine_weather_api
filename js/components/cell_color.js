
export function cellColor(intensity_value, graph_type) {

    const INTENSITY_COLOR = [
        ['wave_int_0_3', 'wave_int_0_5', 'wave_int_1', 'wave_int_1_5', 'wave_int_2', 'wave_int_2_5', 'wave_int_3', 'wave_int_3_5', 'wave_int_4', 'wave_int_5', 'wave_int_6', 'wave_int_7', 'wave_int_8', 'wave_int_9', 'wave_int_10', 'wave_int_10_plus'],
        ['period_int_1', 'period_int_2', 'period_int_3', 'period_int_4', 'period_int_5', 'period_int_6', 'period_int_7', 'period_int_8', 'period_int_9', 'period_int_10', 'period_int_12', 'period_int_14', 'period_int_16', 'period_int_18', 'period_int_18_plus'],
        ['disabled_cell', 'disabled_cell', 'disabled_cell', 'disabled_cell', 'disabled_cell', 'disabled_cell', 'disabled_cell', 'disabled_cell', 'disabled_cell', 'disabled_cell', 'disabled_cell', 'disabled_cell', 'disabled_cell', 'disabled_cell', 'disabled_cell', 'disabled_cell'],
        ['cloud_int_0_3', 'cloud_int_0_5', 'cloud_int_1', 'cloud_int_1_5', 'cloud_int_2', 'cloud_int_2_5', 'cloud_int_3', 'cloud_int_3_5', 'cloud_int_4', 'cloud_int_5', 'cloud_int_6', 'cloud_int_7', 'cloud_int_8', 'cloud_int_9', 'cloud_int_10', 'cloud_int_10_plus'],
        ['temp_int_0', 'temp_int_5', 'temp_int_7', 'temp_int_10', 'temp_int_12', 'temp_int_15', 'temp_int_17', 'temp_int_20', 'temp_int_22', 'temp_int_25', 'temp_int_27', 'temp_int_30', 'temp_int_32', 'temp_int_35', 'temp_int_35_plus']
    ]

    const INTENSITY = [
        [0.3, 0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 7, 8, 9, 10], // Waves Intensity
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18], // Waves Period
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Disable
        [1, 5, 10, 15, 20, 25, 30, 40, 50, 60, 70, 80, 90, 100], // Cloud cover
        [0, 5, 7.5, 10, 12.5, 15, 17.5, 20, 22.5, 25, 27.5, 30, 32.5, 35] // Temperature
    ]

    switch (graph_type) {

        case 'waves': graph_type = 0
            break

        case 'period': graph_type = 1
            break

        case 'disable': graph_type = 2
            break

        case 'cloudcover': graph_type = 3
            break

        case 'temperature': graph_type = 4
            break
    }

    if (intensity_value < INTENSITY[graph_type][0]) { return INTENSITY_COLOR[graph_type][0] }
    if (intensity_value < INTENSITY[graph_type][1]) { return INTENSITY_COLOR[graph_type][1] }
    if (intensity_value < INTENSITY[graph_type][2]) { return INTENSITY_COLOR[graph_type][2] }
    if (intensity_value < INTENSITY[graph_type][3]) { return INTENSITY_COLOR[graph_type][3] }
    if (intensity_value < INTENSITY[graph_type][4]) { return INTENSITY_COLOR[graph_type][4] }
    if (intensity_value < INTENSITY[graph_type][5]) { return INTENSITY_COLOR[graph_type][5] }
    if (intensity_value < INTENSITY[graph_type][6]) { return INTENSITY_COLOR[graph_type][6] }
    if (intensity_value < INTENSITY[graph_type][7]) { return INTENSITY_COLOR[graph_type][7] }
    if (intensity_value < INTENSITY[graph_type][8]) { return INTENSITY_COLOR[graph_type][8] }
    if (intensity_value < INTENSITY[graph_type][9]) { return INTENSITY_COLOR[graph_type][9] }
    if (intensity_value < INTENSITY[graph_type][10]) { return INTENSITY_COLOR[graph_type][10] }
    if (intensity_value < INTENSITY[graph_type][11]) { return INTENSITY_COLOR[graph_type][11] }
    if (intensity_value < INTENSITY[graph_type][12]) { return INTENSITY_COLOR[graph_type][12] }
    if (intensity_value <= INTENSITY[graph_type][13]) { return INTENSITY_COLOR[graph_type][13] }
    if (intensity_value > INTENSITY[graph_type][14]) { return INTENSITY_COLOR[graph_type][14] }
}

