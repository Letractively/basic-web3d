//Plik zawierający definicje wszystkich zmiennych globalnych

//--------------------SCENE VARIABLES---------------------//
var canvas;
var renderedFrames;
var scene;					//Scene handler
var root;					//The root node of scene
var viewer;

var renderOnRequest = true;		//on/off render on request
var renderRequest = true;		//true if new frame have to be rendered (something changed in the scene)

//--------------------STATISTICS VARIABLES---------------------//
var lastFrameRenderTime;
var verticesCount;
var trianglesCount;

//--------------------UI ELEMENTS CONSTANTS---------------------//
var div_time = "time";
var div_verticesCount = "verts";
var div_trianglesCount = "triangles";