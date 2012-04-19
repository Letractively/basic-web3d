var separator = "|";
var paramCount = 7;

function SetAddress()
{
	var link = "";
	link += viewer.scale.toFixed(4)+separator;
	link += viewer.yaw.toFixed(2)+separator;
	link += viewer.pitch.toFixed(2)+separator;
	link += viewer.x.toFixed(2)+separator;
	link += viewer.y.toFixed(2)+separator;
	link += viewer.lastX.toFixed(2)+separator;
	link += viewer.lastY.toFixed(2);
	
	window.location.hash = link;
}

function ParseAddress()
{
	var hash = window.location.hash;
	hash = hash.replace("#","");
	
	var params = hash.split(separator);
	if(params.length != paramCount)
		return;
		
	viewer.scale = parseFloat(params[0]);
	viewer.yaw = parseFloat(params[1]);
	viewer.pitch = parseFloat(params[2]);
	viewer.x = parseFloat(params[3]);
	viewer.y = parseFloat(params[4]);
	viewer.lastX = parseFloat(params[5]);
	viewer.lastY = parseFloat(params[6]);
	
	$("#testConsole").html(viewer.ToString());
}

function TOP(viewer)
{
	viewer.scale = 0.25;
	viewer.yaw = 0;
	viewer.pitch = 90;
	viewer.x = 0;
	viewer.y = 0;
	viewer.lastX = 0;
	viewer.lastY = 0;
}

function BOTTOM(viewer)
{
	viewer.scale = 0.25;
	viewer.yaw = 0;
	viewer.pitch = -90;
	viewer.x = 0;
	viewer.y = 0;
	viewer.lastX = 0;
	viewer.lastY = 0;
}

function LEFT(viewer)
{
	viewer.scale = 0.25;
	viewer.yaw = -90;
	viewer.pitch = 0;
	viewer.x = 0;
	viewer.y = 1;
	viewer.lastX = 0;
	viewer.lastY = 0;
}

function RIGHT(viewer)
{
	viewer.scale = 0.25;
	viewer.yaw = 90;
	viewer.pitch = 0;
	viewer.x = 0;
	viewer.y = 1;
	viewer.lastX = 0;
	viewer.lastY = 0;
}

function FRONT(viewer)
{
	viewer.scale = 0.25;
	viewer.yaw = 0;
	viewer.pitch = 0;
	viewer.x = 0;
	viewer.y = 1;
	viewer.lastX = 0;
	viewer.lastY = 0;
}

function BACK(viewer)
{
	viewer.scale = 0.25;
	viewer.yaw = 180;
	viewer.pitch = 0;
	viewer.x = 0;
	viewer.y = 0;
	viewer.lastX = 0;
	viewer.lastY = 0;
}