//----------------------MENU EVENTS--------------------------//
function OnDeepLinkChange(e)
{;
	switch(window.location.hash)
	{
		case "#top" : TOP(viewer); break;
		case "#bottom" : BOTTOM(viewer); break;
		case "#left" : LEFT(viewer); break;
		case "#right" : RIGHT(viewer); break;
		case "#front" : FRONT(viewer); break;
		case "#back" : BACK(viewer); break;
		default : ParseAddress(); break;
	}
	renderRequest = true;
}

//ustawia tryb renderingu na żądanie
function OnRenderModeChange(e)
{
	renderOnRequest = !renderOnRequest;
}	

//----------------------MOUSE EVENTS-------------------------//
var mouseMoved = false;

function OnMouseButtonDown(e)
{
	e = e ? e : window.event;
	mouseMoved = false;
	
	viewer.lastX = e.clientX;
    viewer.lastY = e.clientY;
	
	//kompatybilność z IE
	if (!e.which && e.button) 
	{
	    if (e.button & 1) e.which = 1     		 // Left
		else if (e.button & 4) e.which = 2		 // Middle
	    else if (e.button & 2) e.which = 3		 // Right
	}
	
	switch(e.which)
	{
		case 1: viewer.rotate = true; break;	//lewy
		case 2: viewer.move = true; break;		//środkowy
		case 3: break;							//prawy
	}
}

function OnMouseButtonUp(e)
{
	e = e ? e : window.event;
	
	//kompatybilność z IE
	if (!e.which && e.button) 
	{
	    if (e.button & 1) e.which = 1      		// Left
		else if (e.button & 4) e.which = 2 		// Middle
	    else if (e.button & 2) e.which = 3 		// Right
	}
	
	switch(e.which)
	{
		case 1: viewer.rotate = false; break;	//lewy
		case 2: viewer.move = false; break;		//środkowy
		case 3: break;							//prawy
	}
	
	if (!mouseMoved)
	{
		Pick(e);
		$("#labelInfo").css("visibility", "visible");
	}
	else
	{
		$("#labelInfo").css("visibility", "hidden");
	}
	
	SetAddress();
}

function OnMouseMove(e) 
{
	e = e ? e : window.event;
	mouseMoved = true;
    var posX = e.clientX;
    var posY = e.clientY;
    viewer.Rotate(posX,posY);
	viewer.Move(posX,posY);
}

function OnMouseWheel(e)
{
	e = e ? e : window.event;
	var delta = 0;
	
	if(e.wheelDelta)
		delta = e.wheelDelta/120;
	else if(e.detail)
		delta = -e.detail/3
		
	if(delta < 0)
		viewer.Zoom(0.9);
	else if(delta > 0)
		viewer.Zoom(1.1);
		
	SetAddress();
}

function InitEvents()
{
	canvas.addEventListener('mousedown', OnMouseButtonDown, true);
	canvas.addEventListener('mouseup', OnMouseButtonUp, true);
	canvas.addEventListener('mousemove', OnMouseMove, true);
	canvas.addEventListener('mousewheel', OnMouseWheel, true);
	canvas.addEventListener('DOMMouseScroll', OnMouseWheel, true);
	
	window.addEventListener('hashchange', OnDeepLinkChange, true);
	
	//$(window).bind('hashchange', function() {
	//	OnDeepLinkChange(null);
	//});

}
