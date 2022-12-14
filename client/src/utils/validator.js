export function validator(data, config) {
    const errors = {}
    function validate(validateMethod, data, config) {
        let statusValidate
        switch (validateMethod) {
            case 'isRequired':
                if (typeof data === 'boolean') {
                    statusValidate = !data
                } else {
                    statusValidate = String(data).trim() === ''
                }
                break
            case 'isEmail': {
                const emailReqExp = /^\S+@\S+\.\S+$/g
                statusValidate = !emailReqExp.test(data)
                break
            }
            case 'isCapitalSymbol': {
                const capitalRegExp = /[A-Z]+/g
                statusValidate = !capitalRegExp.test(data)
                break
            }
            case 'isContainDigit': {
                const digitRegExp = /\d+/g
                statusValidate = !digitRegExp.test(data)
                break
            }
            case 'min': {
                statusValidate = data.length < config.value
                break
            }
            case 'isNegative': {
                statusValidate = data < 0
                break
            }
            default:
                break
        }
        return statusValidate ? config.message : ''
    }
    for (const fieldName in data) {
        for (const validateMethod in config[fieldName]) {
            const error = validate(
                validateMethod,
                data[fieldName],
                config[fieldName][validateMethod]
            )
            if (!errors[fieldName]) {
                errors[fieldName] = error
            }
        }
    }
    return errors
}

export default validator
