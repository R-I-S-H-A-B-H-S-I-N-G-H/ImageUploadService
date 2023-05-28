const User = require("../modals/user");

exports.fromDTO = (dto) => {
	const user = User();
	user.name = dto.name;
	user.images = dto.images || [];
	return user;
};
