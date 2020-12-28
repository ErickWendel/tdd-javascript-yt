const { createSandbox } = require('sinon')
const { describe, it, before, afterEach } = require('mocha')
const { expect } = require('chai')
const Calendar = require('../src/calendar')


describe('calendar', () => {
    let sandbox
    before(() => {
        sandbox = createSandbox()
    })

    afterEach(() => {
        sandbox.reset()
    })

    describe('should validate data input', () => {
        describe('#parseDate', () => {
            it.only('should parse date from string', () => {

                const data = '10/11/2020 10:10'
                const calendar = new Calendar({})
                const result = calendar.parseDate(data)

                expect(result).to.be.deep.equal(new Date(2020, 11, 10, 10, 10))
            })


        })
        describe('#isValidDate', () => {

            it('should return false when sending wrong date and time values', () => {
                const wrongValues = [
                    // dia
                    '32/01/2020 10:00',
                    // mes
                    '24/13/2020 10:00',
                    // ano
                    '31/01/1999 23:00',
                    '31/01/10000 23:30',
                    // hora
                    '31/01/2020 24:00',
                    '31/01/2020 -01:30',
                    // minuto
                    '31/01/2020 23:60',
                    '31/01/2020 23:61',

                    // caracteres adicionais
                    '31/01/2020 23:00a',
                    '31/01/2020a23:00',
                    'a31/01/2020 23:00',
                ]
                for (const value of wrongValues) {
                    const calendar = new Calendar({})
                    const result = calendar.isValidDate(value)

                    expect(result).to.be.not.ok
                }

            })

            it('should return true when sending dd/mm/yyyy MM:SS format date', () => {
                const data = '10/12/2020 10:00'
                const calendar = new Calendar({})
                const result = calendar.isValidDate(data)
                expect(result).to.be.ok
            })
        })


        it('should return false when sending past date and time on "from" and "to" properties', () => {
            const data = { from: '10/11/2020', to: '10/' }
        })
        it('should return true when sending future date and time on from and to properties', () => {


        })

        it('should return false when the "to" property is lower than the "from" property')


    })




})