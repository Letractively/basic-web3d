function CreateScene(canvasName)
{
	var canvas = document.getElementById(canvasName);
	var aspect = canvas.width/canvas.height;
	var sceneName = "the-scene";

	SceneJS.createScene({
		type: "scene",
		id: sceneName,
		canvasId: canvasName,
		flags: {
			backfaces: false
		},
		nodes: [
			{
				type: "lookAt",
				id: "camera",
				eye : { x: 0.0, y: 0.0, z: 100.0 },
				look : { x:0.0, y:0.0, z:0.0},
				up : { y: 1.0 },

				nodes: [
					{
						type: "camera",
						optics: {
							type: "perspective",
							fovy : 25.0,
							aspect : aspect,
							near : 0.10,
							far : 10000.0
						},
						nodes: [
							{
								type: "renderer",
										clearColor: { r: 0.9, g: 0.9, b: 0.9 },
										clear: {
											depth : true,
											color : true
										},

								nodes: [/*
									{
										type: "light",
										mode:                   "dir",
										color:                  { r: 0.8, g: 0.8, b: 0.8 },
										dir:                    { x: 1.0, y: -0.5, z: -1.0 }
									},
									{
										type: "light",
										mode:                   "dir",
										color:                  { r: 0.8, g: 0.8, b: 0.8 },
										dir:                    { x: 1.0, y: -1.0, z: -1.0 }
									},*/
									{
										type: "rotate",
										id: "pitch",
										angle: 0.0,
										x : 1.0,

										nodes: [
											{
												type: "rotate",
												id: "yaw",
												angle: 0.0,
												y : 1.0,

												nodes: [
													{
														type: "scale",
														id: "scale",
														x: 1,
														y: 1,
														z: 1,
														nodes: [
															{
																type : 'node',
																/*
																type : 'shader',
																id : 'myShader',
																shaders : [
																	//Vertex Shader
																	{
																		stage : 'fragment',
																		code : [
																			"uniform vec3 lightPosition;",
																			"uniform vec3 skyColor;",
																			"uniform vec3 groundColor;",
																			
																			"vec3 worldNormalPos;",
																			"vec3 up = normalize(vec3(0.0, 1.0, 0.0));",
																			
																			"void worldNormal_fun(vec3 pos){",
																			"	worldNormalPos = normalize(pos);",
																			"}",
																			
																			"vec4 myPixelColorFunc(vec4 color) {",
																			"	up = normalize(lightPosition);",
																			"	float a = 0.5 * (1.0 + dot(up, worldNormalPos));",
																			"	vec3 tmp = normalize(skyColor * a + (1.0 - a) * groundColor);",
																			"	color.r *= tmp.x;",
																			"	color.g *= tmp.y;",
																			"	color.b *= tmp.z;",
																			"   return color;",
																			"}"
																		],
																		hooks : {
																			worldNormal : "worldNormal_fun",
																			pixelColor : "myPixelColorFunc",
																		}
																	}
																],
																params :{
																	lightPosition : [0.0, 1.0, 0.0],
																	skyColor : [0.6797, 0.7148, 0.7422],
																	//groundColor : [0.4750, 0.5004, 0.5195],
																	//skyColor : [1,0,0],
																	groundColor : [0.2,0.2,0.2],
																},*/
																nodes : [	
																	{
																		type: "geometry",
																		id: "geometryRoot",
																		/*
																		nodes: [
																			{
																				type: 'sphere'
																			}
																		]
																		*/
																	}
																]
															}
														]
													}
												]
											}
										]
									}
								]
							}
						]
					}
				]
			}
		]
	});

	return sceneName;
}