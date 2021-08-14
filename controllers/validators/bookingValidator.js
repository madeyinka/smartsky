
const { body, param } = require('express-validator');

module.exports = {

    bookingValidationRule: () => [
        body('reciever.name')
            .isString()
            .withMessage('Required! please enter a valid name'),

        body('reciever.phoneNumber')
            .isAlphanumeric()
            .withMessage('Required! please enter a valid phone number'),

        body('reciever.email')
            .isEmail()
            .withMessage('Required! please enter a valid email'),

        body('origin.addressLine1')
            .isString()
            .withMessage('Required! please enter a address'),
        body('origin.city')
            .isString()
            .withMessage('Required! please enter a valid city'),
        body('origin.state')
            .isString()
            .withMessage('Required! please enter a valid state'),

        body('destination.addressLine1')
            .isString()
            .withMessage('Required! please enter a address'),
        body('destination.city')
            .isString()
            .withMessage('Required! please enter a valid city'),
        body('destination.state')
            .isString()
            .withMessage('Required! please enter a valid state'),
        body('dimensions.weight')
            .isNumeric()
            .withMessage('Required! please enter a valid weight'),
    ],

    getBookingValidationRule: () => [
        param('id').isMongoId().withMessage('Required! Invalid Identity Param'),
    ]
}