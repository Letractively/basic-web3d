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