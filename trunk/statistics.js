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