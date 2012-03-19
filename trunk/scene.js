var canvasName = "canvas";
var canvas = document.getElementById(canvasName );
var aspect = canvas.width/canvas.height;
InitEvents(canvas);

SceneJS.createScene({
    id: "myScene",			//identyfikator sceny
    canvasId: canvasName ,	//podpięcie się do kontekstu
    nodes: [
		//widok
        {
            type: "lookAt",
            id: "camera",
            eye : { x: 0.0, y: 0.0, z: 15 },
            look : { z:-1.0 },
            up : { y: 1.0 },

            nodes: [
				//kamera
                {
                    type: "camera",
                    optics: {
                        type: "perspective",
                        fovy : 30.0,
                        aspect : aspect,
                        near : 0.01,
                        far : 1000.0
                    },

                    nodes: [

                        /* Renderer node to set BG colour
                         */
                        {
                            type: "renderer",
                            clearColor: { r: 0.3, g: 0.3, b: 0.6 },
                            clear: {
                                depth : true,
                                color : true
                            },

                            nodes: [

                                /* Point lights
                                 */
                                {
                                    type: "light",
                                    mode: "dir",
                                    color: { r: 1.0, g: 1.0, b: 1.0 },
                                    diffuse: true,
                                    specular: true,
                                    dir: { x: 1.0, y: -0.5, z: -1.0 }
                                },

                                /* Ambient, diffuse and specular surface properties
                                 */
                                {
                                    type: "material",
                                    emit: 0,
                                    baseColor:      { r: 0.5, g: 0.5, b: 0.6 },
                                    specularColor:  { r: 0.9, g: 0.9, b: 0.9 },
                                    specular:       1.0,
                                    shine:          70.0,

                                    nodes: [

                                        /* Teapot geometry - a built-in teapot type
                                         */
                                        {
                                            type : "teapot"
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

var scene = SceneJS.scene("myScene");

var camera = scene.findNode("camera");
var viewer = new Viewer(camera);

scene.start({
    idleFunc: function() {
    	viewer.Update();
            }
});


function Viewer(camera)
{
	//pozycja
	this.x = 0;
	this.y = 0;
	this.z = 15;
	
	this.roll = 0;
	this.yaw = 0;
	
	this.speed_move = 0;	
	this.speed_roll = 0;
	this.speed_yaw = 0;
	
	this.dir_x = 0;
	this.dir_y = 0;
	this.dir_z = -1;
	
	//uchwyt do kamery
	this.camera = camera;
	//aktualizacja parametrów (powinno być wywoływane przy każdym renderingu sceny)
	this.Update = function()
	{

		this.roll += this.speed_roll;
		this.yaw += this.speed_yaw;
		//*
		this.dir_x = Math.sin(this.yaw);
		this.dir_y = Math.cos(this.yaw) * Math.sin(this.roll);
		this.dir_z = -Math.cos(this.yaw) * Math.cos(this.roll);
		//*/
		this.x += this.speed_move * this.dir_x;
		this.y += this.speed_move * this.dir_y;
		this.z += this.speed_move * this.dir_z;
		//*/
		camera.set("eye", {x:this.x, y:this.y, z:this.z});
		camera.set("look", {x:this.x + this.dir_x, y:this.y + this.dir_y, z:this.z + this.dir_z});
		//camera.set("look", {x:this.dir_x, y:this.dir_y, z:this.dir_z});
	}
	this.ToString = function()
	{
		var txt = "<pre>look direction: [" + this.dir_x + ", " + this.dir_y + ", " + this.dir_z + "]<br>";
		txt += "position: [" + this.x + ", " + this.y + ", " + this.z + "]</pre>";
		return txt;
	}
}





//-----------------------------OBSŁUGA ZDARZEŃ--------------------------------------//

function InitEvents(canvas)
{
	window.addEventListener('keydown', OnKeyDown, true);
	window.addEventListener('keyup', OnKeyUp, true);
	//canvas.addEventListener('mousemove', OnMouseMove, true);
	//canvas.addEventListener('mousedown', OnMouseButtonDown, true);
	//canvas.addEventListener('mouseup', OnMouseButtonUp, true);
}

function OnKeyDown(e)
{
	tester.innerHTML = viewer.ToString();
	switch(e.keyCode)
	{
	case 38:
		viewer.speed_roll = 0.01;
		break;
	case 40:
		viewer.speed_roll = -0.01;
		break;
	case 37:
		viewer.speed_yaw = -0.01;
		break;
	case 39:
		viewer.speed_yaw = 0.01;
		break;
	case 87://w
		viewer.speed_move = 0.2;
		break;
	case 83://s
		viewer.speed_move = -0.2;
		break;
	}
	
}

function OnKeyUp(e)
{	
	switch(e.keyCode)
	{
	case 38:
		viewer.speed_roll = 0;
		break;
	case 40:
		viewer.speed_roll = 0;
		break;
	case 37:
		viewer.speed_yaw = 0;
		break;
	case 39:
		viewer.speed_yaw = 0;
		break;
	case 87://w
		viewer.speed_move = 0;
		break;
	case 83://s
		viewer.speed_move = 0;
		break;
	}
	
}

//-----------------------------MOUSE EVENTS---------------------------//

//Klasa opisująca stan myszy
function MouseState() 
{
	//PROPERTIES
	this.L_down = false,	//wciśnięty lewy przycisk myszy
	this.M_down = false,	//wciśnięty środkowy przycisk myszy
	this.R_down = false,	//wciśnięty prawy przycisk myszy
	this.X = 0, 			//obecna współrzędna X kursora
	this.Y = 0, 			//obecna współrzędna Y kursora 
	this.X_prev = 0, 		//poprzednia współrzędna X kursora
	this.Y_prev = 0			//poprzednia współrzędna Y kursora
	//METHODS
	this.GetStateAsHTML = function()
	{
		var text = "<pre>"+
			"L_down: " + mouseState.L_down + "<br>" +
			"M_down: " + mouseState.M_down + "<br>" +
			"R_down: " + mouseState.R_down + "<br>" +
			"X: " + mouseState.X + "<br>" +
			"Y: " + mouseState.Y + "<br>" +
			"X_prev: " + mouseState.X_prev + "<br>" +
			"Y_prev: " + mouseState.Y_prev + "<br>"
			+ "</pre>";
			
		return text;
	}
	this.SetPosition = function(x, y)
	{
		this.X_prev = this.X;
		this.Y_prev = this.Y;
		this.X = x;
		this.Y = y;
	}
};


var mouseState = new MouseState();

function OnMouseButtonDown(e)
{
	//kompatybilność z IE
	if (!e.which && e.button) 
	{
	    if (e.button & 1) e.which = 1      // Left
		else if (e.button & 4) e.which = 2 // Middle
	    else if (e.button & 2) e.which = 3 // Right
	}
	
	switch(e.which)
	{
		case 1: mouseState.L_down = true; break;
		case 2: mouseState.M_down = true; break;
		case 3: mouseState.R_down = true; break;
	}
	
	tester.innerHTML = "state:<br>" + mouseState.GetStateAsHTML();
}


function OnMouseButtonUp(e)
{
	//kompatybilność z IE
	if (!e.which && e.button) 
	{
	    if (e.button & 1) e.which = 1      // Left
		else if (e.button & 4) e.which = 2 // Middle
	    else if (e.button & 2) e.which = 3 // Right
	}
	
	switch(e.which)
	{
		case 1: mouseState.L_down = false; break;
		case 2: mouseState.M_down = false; break;
		case 3: mouseState.R_down = false; break;
	}
	
	tester.innerHTML = "state:<br>" + mouseState.GetStateAsHTML();
}


function OnMouseMove(e)
{
	mouseState.SetPosition(e.pageX, e.pageY);
	
	
	tester.innerHTML = "state:<br>" + mouseState.GetStateAsHTML();
}
