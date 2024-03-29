﻿
var renderOnRequest = true;	//włącza / wyłącza tryb renderingu na żądanie
var renderRequest = true;		//flaga mówiąca czy należy ponownie wyrenderować scenę

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
	totalRenderTime = 0;
	setInterval("UpdateFPS()", 10000);
	
	scene.start({
		idleFunc: function() 
		{
			var start = new Date();
			if(!renderOnRequest)
				viewer.Update();
			else if(renderRequest)
				viewer.Update();
			var stop = new Date();
			
			$("#time").html(stop - start);
		}
	});
	var x = 10;
	var y = 10;
	var z = 10;
	
	for(var i = 0; i < x; i++)
		for(var j = 0; j < y; j++)
			for(var k = 0; k < z; k++)
			{
				AddModel(i, j, k);
			}
	UpdateModelInfo();
}

function UpdateScene()
{
	root.remove("node", "myModel");
	root.add("node", myModel);
	$("#labelInfo").css("visibility", "hidden");
	SetAddress();
	UpdateModelInfo();
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
		
		renderRequest = true;
	}
	
	this.Rotate = function(posX, posY)
	{
		if (this.rotate) 
		{
			this.yaw += (posX - this.lastX) * 0.5;
			this.pitch += (posY - this.lastY) * 0.5;

			this.lastX = posX;
			this.lastY = posY;
			
			renderRequest = true;
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
			
			renderRequest = true;
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
		
		renderedFrames++;
		totalRenderedFrames++;
		renderRequest = false;
	}
	
	this.ToString = function()
	{
		var text = "<pre>";
		text += "VIEWER STATE:\n";
		text += "scale: " + this.scale +"\n";
		text += "yaw: " + this.yaw +"\n";
		text += "pitch: " + this.pitch +"\n";
		text += "x: " + this.x +"\n";
		text += "y: " + this.y +"\n";
		text += "lastX: " + this.lastX +"\n";
		text += "lastY: " + this.lastY +"\n";
		text += "</pre>";
		return text;
	}
}


