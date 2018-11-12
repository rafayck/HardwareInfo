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
	logout_time : Date

});
module.exports = mongoose.model('Hardware', hwSchema);