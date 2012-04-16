var canvas;
var renderedFrames;
var scene;
var root;
var viewer;

function LoadScene()
{
	var canvasName = "canvas";
	var sceneName = CreateScene(canvasName);
	canvas = document.getElementById(canvasName);
	scene = SceneJS.scene(sceneName);
	root = scene.findNode("geometryRoot");
	root.add("node", myModel);
	viewer = new Viewer(scene);
	
	InitEvents();
	OnDeepLinkChange(null);
	
	renderedFrames = 0;
	setInterval("UpdateFPS()", 1000);
	
	scene.start({
		idleFunc: function() 
		{
			viewer.Update();
			renderedFrames++;
		}
	});
}

function Viewer(scene)
{
	this.scale = 0.05;
	this.yaw = 0;
	this.pitch = 0;
	this.x = 0;
	this.y = 1;
	this.lastX;
	this.lastY;
	
	this.move = false;
	this.rotate = false;
	
	this.cameraNode = scene.findNode("camera");
	this.pitchNode = scene.findNode("pitch");
	this.yawNode = scene.findNode("yaw");
	this.scaleNode = scene.findNode("scale");

	this.Zoom = function(zoom)
	{
		this.scale = this.scale * zoom;
	}
	
	this.Rotate = function(posX, posY)
	{
		if (this.rotate) 
		{
			this.yaw += (posX - this.lastX) * 0.5;
			this.pitch += (posY - this.lastY) * 0.5;

			this.lastX = posX;
			this.lastY = posY;
		}
	}
	
	this.Move = function(posX, posY)
	{
		if(this.move)
		{
			this.x -= (posX - this.lastX)/15;
			this.y += (posY - this.lastY)/15;
			
			this.lastX = posX;
			this.lastY = posY;
		}
	}

	this.Update = function()
	{
	//Skalowanie
		this.scaleNode.set("x", this.scale);
		this.scaleNode.set("y", this.scale);
		this.scaleNode.set("z", this.scale);
	//Obrót
		this.pitchNode.set("angle", this.pitch);
		this.yawNode.set("angle", this.yaw);
	//Przesunięcie
		
		this.cameraNode.set("eye", {x:this.x, y:this.y, z:100});
		this.cameraNode.set("look", {x:this.x, y:this.y, z:0});
	}

}

//--------------------------------STATISTICS------------------------//

function UpdateFPS()
{
	document.getElementById("fps").innerHTML = renderedFrames;
	renderedFrames = 0;
}






