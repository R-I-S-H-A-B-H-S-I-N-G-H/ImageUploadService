const imageMapper = require("../mapper/imageMapper");
const Image = require("../modals/image");

exports.save = async (imageData) => {
	let image = imageMapper.fromDTO(imageData);
	const response = await image.save();
	return response;
};

exports.get = async (id) => {
	if (!id) return { error: "user not found" };

	try {
		const image = await Image.findById(id);
		return { data: image };
	} catch (error) {
		return { error: error };
	}
};

exports.getList = async (expandable = new Set()) => {
	const imageList = await Image.find();
	return imageMapper.toDTOList(imageList, expandable);
};
