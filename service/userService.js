const userMapper = require("../mapper/userMapper");
const User = require("../modals/user");

exports.save = async (userData) => {
	console.log(userData);
	let user = userMapper.fromDTO(userData);
	console.log(user);
	const response = await user.save();
	return response;
};

exports.get = async (id) => {
	if (!id) throw { error: "user not found" };
	const user = await User.findById(id);
	return user;
};

exports.getList = async () => {
	const user = await User.find();
	console.log(user);
	return user;
};
