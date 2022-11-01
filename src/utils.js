export function getExperienceTime(dateStart, dateEnd) {
    let monthDistance = dateEnd.getMonth() - dateStart.getMonth()
    let extraYear = 1
    if (monthDistance < 0) {
        monthDistance = 12 + monthDistance
        extraYear = 0
    }

    const years = dateEnd.getFullYear() - dateStart.getFullYear() - 1 + extraYear
    const months = monthDistance
    return [months, years]
}

export function getTotalExperience(...periods) {
    let months = 0
    let years = 0
    for (const period of periods) {
        months += period[0]
        years += period[1]
    }
    years += Math.floor(months/12)
    months = months % 12
    return [months, years]
}