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
										clearColor: { r: 0.3, g: 0.3, b: 0.6 },
										clear: {
											depth : true,
											color : true
										},

								nodes: [
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
									},
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
																type: "geometry",
																id: "geometryRoot"
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