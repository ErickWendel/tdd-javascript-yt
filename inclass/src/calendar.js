
class Calendar {
    constructor({ from, to, text }) {
        this.from = from
        this.to = to
        this.text = text
    }
    parseDate(value) {
        const emptySpace = /\s/
        const nonDigits = /\D/
        const [date, time] = value.split(emptySpace)
        
        const [day, month, year] = date.split(nonDigits)
        const [hours, minutes] = time.split(nonDigits)

        return new Date(year, month, day, hours, minutes)
    }
    isValidDate(value) {
        const dayExp = '(0?[1-9]|[1-3][01])'
        const monthExp = '\/(0?[1-9]|1[012])'
        const yearExp = '\/[2-9][0-9]{3}'
        const hourExp = '\\s([0-1][0-9]|2[0-3])'
        const minutesExp = ':([0-5][0:9])'

        const dateExp = `^(${dayExp}${monthExp}${yearExp})(${hourExp}${minutesExp})$`
        const regex = new RegExp(dateExp)

        return regex.test(value)
    }

    isValid() {
        const [from, to] = [
            this.isValidDate(this.from),
            this.isValidDate(this.to)
        ]
        const isFormatOk = from && to

        return isFormatOk
    }
}

module.exports = Calendar