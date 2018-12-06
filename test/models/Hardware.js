var mongoose = require('mongoose')
const hwSchema = new mongoose.Schema({
	uuid:{
		type:String,
		unique:true
	},
	cpuInfo: {},
	systemInfo:{},
	memInfo:{},
	diskInfo:{},
	networkInfo:{},
	login_time: Date,
	logout_time : Date,
	is_on : Boolean,
	lab_name: String

});
module.exports = mongoose.model('Hardware', hwSchema);