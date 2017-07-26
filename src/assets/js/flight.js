//********************************************************************************************
//Add cesium viewer
var viewer = new Cesium.Viewer('cesiumContainer');
viewer.imageryProvider = new Cesium.ArcGisMapServerImageryProvider({
        url : 'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer'
    });
viewer.terrainProvider = new Cesium.CesiumTerrainProvider({
        url : 'https://assets.agi.com/stk-terrain/world',
        requestVertexNormals: true,
        requestWaterMask: false
    });
viewer.baseLayerPicker = false
//********************************************************************************************
//Add a map imagery layer
// var layers = viewer.imageryLayers;
// var mapOverlay = layers.addImageryProvider(new Cesium.ArcGisMapServerImageryProvider({
// 	url : 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer'
// }));

// mapOverlay.alpha = .4;
// mapOverlay.brightness = 1.5;

//*********************************************************************************************
//Import flight PATH data, HPR data and TABLE data
var entities = [];
var hpr = [];
var data = [];
var complete = false;
function getEntities(i) {
	var ds = viewer.dataSources.get(0);
	if(i == 0)
		return ds.entities.getById('pathEntity');
	else if(i == 1)
		return ds.entities.getById('exceedance');
	else
		return ds.entities.getById('model');

}
function tableData(inAlt, inIAS, inVSI, inOilT) {
	this.altitude = inAlt;
	this.ias = inIAS;
	this.vsi = inVSI;
	this.oiltemp = inOilT;
}
var flightCzml = Cesium.CzmlDataSource.load('./assets/data/PhoenixFlight1.czml'); // CZML LOADING
viewer.dataSources.add(flightCzml).then(function(ds) {
    var modelEntity = ds.entities.getById('model');
    viewer.trackedEntity = modelEntity;
    //modelEntity.orientation = orientation;
});

Cesium.loadText('./assets/data/tableData1.csv').then(function(text) { //TABLE DATA LOADING
	var box = text.split(',');
	for(var i = 0; i < box.length; i += 4) {
		data[i/4] = new tableData(box[i], box[i+1], box[i+2], box[i+3]) 
	}
	console.log('Table Data Loaded');
}).otherwise(function(err){
	console.log(err);
});

//*********************************************************************************************
//Create a model matrix
// function loadOrientation() {
// 	var quat = new Cesium.SampledProperty(Cesium.Quaternion);
// 	Cesium.loadText('hprData1.csv').then(function(text) { //HPR DATA LOADING
// 		hpr = text.split(',');
// 		for(var i = 0; i < hpr.length; i+=4) {
// 			//console.log(i);
// 			var quaternion = Cesium.Quaternion.fromHeadingPitchRoll(parseFloat(hpr[i+1]), parseFloat(hpr[i+2]), parseFloat(hpr[i+3]), quaternion);
// 			quat.addSample(Cesium.JulianDate.fromIso8601(hpr[i]), quaternion);
// 		}
// 		//console.log(quat);
// 		complete = true;
// 		return quat;
// 	}).otherwise(function(error) {
// 		console.log('ERROR IN HPR DATA: ' + error);
// 	});
// }
//*********************************************************************************************
//Update table html with Altitude, IAS, VSI and oil temp
var alt = document.getElementById("altitude");
var ias = document.getElementById("ias");
var vsi = document.getElementById("vsi");
var oilTemp = document.getElementById("oiltemp");
// var orientation = loadOrientation();

window.setInterval(function update(orientation) {
	// //Try to set orientation of model entity
	// var theEntity = getEntities(2);
	// theEntity.orientation = orientation;
	// console.log(theEntity.oreintation);
	//console.log(theEntity);
	//Update table HTML
	var currTime = viewer.clock.currentTime;
	var startTime = viewer.clock.startTime;
	var diff = parseInt(Cesium.JulianDate.secondsDifference(currTime, startTime));
	alt.innerHTML = data[diff].altitude;
	ias.innerHTML = data[diff].ias;
	vsi.innerHTML = data[diff].vsi;
	oilTemp.innerHTML = data[diff].oiltemp;
}, 100);

//0: exceedance, 1: takeoff, 2: landings
var jumpTimes = [Cesium.JulianDate.fromIso8601('2017-01-02T19:25:37Z'), Cesium.JulianDate.fromIso8601('2017-01-02T19:19:27Z'), Cesium.JulianDate.fromIso8601('2017-01-02T20:36:14Z')];
var ds = viewer.dataSources.get(0);
function jumpTime(i) {
	var newTime = jumpTimes[i];
	viewer.clock.currentTime = newTime;
}

function changeTimeSpeed(mult) {
	if(mult > 0) {
		var newMultiplier = viewer.clock.multiplier * mult;
		viewer.clock.multiplier = newMultiplier;
	} else {
		var newMultiplier = viewer.clock.multiplier / Math.abs(mult);
		viewer.clock.multiplier = newMultiplier;
	}
}

function reverseTimeDirection() {
	var mult = viewer.clock.multiplier;
	mult *= -1;
	viewer.clock.multiplier = mult;
}

function slowTime(mult) {
	var newMultiplier = viewer.clock.multiplier / mult;
	viewer.clock.multiplier = newMultiplier;
}
function getPath(path) {
	return path;
}

function show(i) {
	var theEntity = getEntities(i);
	if(theEntity.show) {
		theEntity.show = false;
		console.log('Path hidden');
	} else {
		theEntity.show = true;
		console.log('Path shown');
	}
}

function changeLead(x) {
	var theEntity = getEntities(0);
	var lt = theEntity.path.leadTime.getValue(viewer.clock.currentTime, lt);
	if(x > 0) {
		lt += 60;
	} else if (x < 0) {
		lt -= 60;
	}
	if(lt >= 0) {
		theEntity.path.leadTime = lt;
		console.log('Lead time changed: ' + lt + ' sec');		
	} else {
		console.log('Lead time not changed.');
	}
	
}

function changeTrail(x) {
	var theEntity = getEntities(0);
	var tt = theEntity.path.trailTime.getValue(viewer.clock.currentTime, tt);
	if(x > 0) {
		tt += 60;
	} else if(x < 0) {
		tt -= 60;
	}
	if(tt >= 0){
		theEntity.path.trailTime = tt;
		console.log('Trail time changed: -' + tt + ' sec');	
	} else {
		console.log('Trail time not changed.');
	}
}

function update() {
	var currTime = viewer.clock.currentTime;
	var startTime = viewer.clock.startTime;
	console.log(parseInt(Cesium.JulianDate.secondsDifference(currTime, startTime)));
}

//********************************************************************************************
//Import position, hpr and exceedance data
// var pos = [];
// var exc = [];
// var orientation = new Cesium.SampledProperty(Cesium.HeadingPitchRoll);
// Cesium.loadText('posData1.csv').then(function(text) {
// 	pos = text.split('\n');
// 	console.log('Position data imported.');
// }).otherwise(function(error) {
// 	console.log('ERROR IN POS DATA: ' + error);
// });
// Cesium.loadText('exceedanceData1.csv').then(function(text) {
// 	exc = text.split('\n');
// 	console.log('Excedance data imported.');
// }).otherwise(function(error) {
// 	console.log('ERROR IN EXCEEDANCE DATA: ' + error)
// });