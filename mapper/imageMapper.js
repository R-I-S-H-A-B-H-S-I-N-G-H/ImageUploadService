const image = require("../modals/image");
const fields = new Set(["data"]);

const IMAGE_TYPE = {
	name: "name",
	data: "data",
	contentType: "contentType",
	user: "user",
};

exports.fromDTO = (dto) => {
	return new image({
		name: dto.name,
		data: dto.data,
		contentType: dto.contentType,
		user: dto.user,
	});
};

exports.toDTO = (image, expandable = new Set()) => {
	return {
		id: image._id,
		createdAt: image.createdAt,
		updatedAt: image.updatedAt,
		name: image.name,
		contentType: image.contentType,
		user: image.user,
		data: expandable.has(IMAGE_TYPE.data) ? image.data : null,
	};
};
exports.toDTOList = (imageList = [], expandable = new Set()) => {
	let dtos = [];
	imageList.map((ele) => {
		dtos.push(this.toDTO(ele, expandable));
	});

	return dtos;
};
