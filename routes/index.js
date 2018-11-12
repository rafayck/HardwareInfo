var express = require('express');
var router = express.Router();
const si = require('systeminformation');
const moment = require('moment')
let Hardware = require('../models/Hardware');
const cron = require("node-cron");
// const active_clients = []
//  // schedule tasks to be run on the server   
// cron.schedule("* * * * * *", function() {
//   // console.log("running a task every second");

// });


/* GET home page. */
router.get('/', function(req, res, next) {
now = new Date();
let cpuInfo = {}
let systemInfo = {}
let memInfo = {}
let diskInfo = {}
let networkInfo = {}
let login_time = now;
// callback style
si.cpu(function(data) {
    // console.log('CPU-Information:');
    
    cpuInfo.manufacturer = data.manufacturer
    cpuInfo.brand = data.brand
    cpuInfo.speed = data.speed
    cpuInfo.speedmax = data.speedmax
    cpuInfo.cores = data.cores
    cpuInfo.vendor = data.vendor
    // console.log(cpuInfo);
    
    return cpuInfo
	
})
.then(function(cpuInfo){
	// console.log('this cpu info', cpuInfo)

	si.system(function(data){
	  // console.log('system info')
	 
	  systemInfo.uuid = data.uuid
	  systemInfo.manufacturer = data.model
	  systemInfo.model =  data.model
	  console.log('systemInfo', systemInfo)
	 
	 return systemInfo 
	})
	.then(function(systemInfo){
		si.mem(function(data){
		  // console.log('Memory info')

		  memInfo.total = data.total 
		  memInfo.used = data.used
		  memInfo.free = data.free
		  // console.log(memInfo)
		  return memInfo
	})
	.then(function(memInfo){
		si.diskLayout(function(data){
		  // console.log('Disk info (size in GBs)')
		  
		  diskInfo.size = (data[0].size/ (1000 * 1000  * 1000 ))
		  // console.log(diskInfo)
		  return diskInfo
	})
	.then(function(diskInfo){

		si.networkInterfaces(function(data){
		  // console.log('Network info')
		  networkInfo.ip4  = data[0].ip4
		  console.log(networkInfo)
		  return networkInfo
	})  
	.then(function(networkInfo){
		Hardware.create({
			uuid: systemInfo.uuid,
			cpuInfo: cpuInfo,
			systemInfo: systemInfo,
			memInfo: memInfo,
			diskInfo: diskInfo,
			networkInfo:networkInfo,
			login_time:new Date()
	  },
	  {
	  	upsert:true
	  },
	  function(err, hardware){
	   	console.log('hardware', hardware)
	  })
	  Hardware.findOneAndUpdate({uuid: systemInfo.uuid}, {login_time : now},
	  	function(err, hardware){

	  	})  
	  // res.send({
	  // 	cpuInfo,
	  // 	memInfo,
	  // 	systemInfo,
	  // 	diskInfo,
	  // 	networkInfo
	  // })
		res.render('index', {cpuInfo: cpuInfo, memInfo:memInfo, systemInfo: systemInfo, diskInfo:diskInfo, networkInfo:networkInfo, login_time:login_time})
	})
	})
	})
	})
})




// process.on('SIGINT', () => {
//  console.log("Logged out at" , moment().format('MMMM Do YYYY, h:mm:ss a'));
//   process.exit();
// });




});

//view all pcs
router.get('/clients', function(req, res, next){

	let cpuInfo = {}
	let systemInfo = {}
	let memInfo = {}
	let diskInfo = {}
	let networkInfo = {}

	Hardware.find()
	.then(function(clients){
		// res.send(hardwares)
		console.log(clients)
		res.render('clients', {clients : clients})
	})
})

module.exports = router;
