/**
 *
 * @param dateStart
 * @type Date
 * @param dateEnd
 * @type Date
 * @return {number[]}
 */
export function getExperienceTime(dateStart, dateEnd) {
    let monthDistance = dateEnd.getMonth() - dateStart.getMonth() + 1
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

export function renderTenureTime(tenure) {
    let years = tenure[1]
    let months = tenure[0]
    return years + " year" + (years !== 1 ? "s " : " ") + months + " month" + (months !== 1 ? "s" : "")
}

/**
 *
 * @param tenureList
 * @type Date[[]]
 */
export function getContiniousTenure(...tenureList) {
    let currents = [tenureList[0]]
    console.log(tenureList)
    console.log("Currents!")
    for (const exp of tenureList) {
        let l = currents[currents.length-1]
        if (l[1] >= exp[0]) {
            console.log("Replacing last with")
            console.log([l[0], exp[1]])
            currents[currents.length-1] = [l[0], exp[1]]
        } else {
            console.log("adding")
            console.log(exp)
            currents.push(exp)
        }

    }
    console.log(currents.map(c => getExperienceTime(c[0], c[1])))
    console.log(getTotalExperience(...currents.map(c => getExperienceTime(c[0], c[1]))))

}