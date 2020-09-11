const Joi = require('joi');

module.exports = validate;

	function validate(input) {
		const schema = Joi.object().keys({
			url : Joi.string().required()
		});

		return schema.validate(input, { abortEarly: false });
	}
