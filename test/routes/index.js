var express = require('express');
var router = express.Router();
const si = require('systeminformation');
const moment = require('moment')
let Hardware = require('../models/Hardware');
var Pusher = require('pusher');

var pusher = new Pusher({
	  appId: '646724',
	  key: 'd4b5db5c4d9231cb0fe1',
	  secret: '5ef2420b355638a19888',
	  cluster: 'ap2',
	  encrypted: true
});

router.post('/',function(req,res,next){
	Hardware.findOneAndUpdate({uuid: "4C4C4544-0056-5810-8054-C4C04F595A31"}, {lab_name : req.body.lab_name},
	  	function(err, hardware){
	  		res.redirect('/')
		
	})  
	
	// console.log(req.body.lab_name)
})

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
	  // console.log('systemInfo', systemInfo)
	 
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
		  // console.log('DATA:',data)
		  diskInfo.serialNum = data[0].serialNum
		  diskInfo.size = (data[0].size/ (1000 * 1000  * 1000 ))
		  // console.log(diskInfo)
		  console.log(diskInfo.serialNum)
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
			login_time: new Date(),
			is_on: true

	  },
	  {
	  	upsert:true
	  },
	  function(err, hardware){
	  	
	  })
		//update and send trigger

	  Hardware.findOneAndUpdate({uuid: systemInfo.uuid}, {login_time : now},
	  	function(err, hardware){

		pusher.trigger('my-hardware', 'my-cast', {
		  hardware:hardware
		});
	    
	  	})  

		res.render('index', {cpuInfo: cpuInfo, memInfo:memInfo, systemInfo: systemInfo, diskInfo:diskInfo, networkInfo:networkInfo, login_time:login_time})
	})
	})
	})
	})
})






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
