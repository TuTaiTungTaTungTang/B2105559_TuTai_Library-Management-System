const { Schema, model, Types } = require("mongoose");

const SACH = new Schema(
	{
		TENSACH: {
			type: String,
			required: true,
		},
        DONGIA: {
			type: Number,
			required: true,
		},
		SOQUYEN: {
			type: Number,
			required: true,
		},
		NAMXUATBAN: {
			type: Number,
			required: true,
		},
		NHAXUATBAN: {
			type: Types.ObjectId,
			required: true,
			ref: "NHAXUATBAN"
		},
		TACGIA: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = model("SACH", SACH);