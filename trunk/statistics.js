function UpdateModelInfo()
{
	CountVertices();
	CountTriangles();
	$("#"+div_verticesCount).html(verticesCount);
	$("#"+div_trianglesCount).html(trianglesCount);
}

function CountVertices()
{
	verticesCount = 0;
	//root is a global variable
	root.eachNode(
		function()
		{
			if(this.get("type") == "geometry")
			{
				if(this.parent().get("type") != "library")
					verticesCount += (this.get("positions").length/3);
			}
		},
		{
			andSelf: false,		//don't visit self node
			depthFirst: true	//visit also subnodes
		}
	);
}

function CountTriangles()
{
	trianglesCount = 0;
	//root is a global variable
	root.eachNode(
		function()
		{
			if(this.get("type") == "geometry")
			{
				trianglesCount += this.get("indices").length/3;
			}
		},
		{
			andSelf: false,		//don't visit self node
			depthFirst: true	//visit also subnodes
		}
	);
}


function TestPerformance(seconds)
{
	var tmpROR = renderOnRequest;
	renderOnRequest = false;
	totalRenderedFrames = 0;
	var start = new Date();
	setTimeout(
	function()
	{
		var frames = totalRenderedFrames;
		var stop = new Date();
		renderOnRequest = tmpROR;
		var miliseconds = stop - start;
		var fps = frames / miliseconds * 1000;
		fps = fps.toFixed(2);
		alert(frames+" frames"+"  "+miliseconds+" miliseconds" + " /  fps = "+fps);
		$("#"+div_fps).html(frames);
	}
	, seconds*1000);

	
}



function UpdateFPS()
{
	document.getElementById("fps").innerHTML = renderedFrames/10;
	$("#"+div_time).html(lastFrameRenderTime);
	renderedFrames = 0;
}