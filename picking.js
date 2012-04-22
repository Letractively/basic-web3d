
function Pick(event) {

	var coords = GetCoords(event);

	var hit = scene.pick(coords.x, coords.y, { rayPick: true });

	var offset = $("#canvas").offset();
	$("#labelInfo").css("left", offset.left + hit.canvasPos[0] + 5);
    $("#labelInfo").css("top", offset.top + hit.canvasPos[1] + 5);
	
    if (hit) 
	{
        $("#labelInfo").html(hit.name);
    }
	else
	{
		$("#labelInfo").html("No selected object");
		$("#labelInfo").css("visibility", "hidden");
    }
}

function GetCoords(event) {
    var coords = { x: 0, y: 0};
    if (!event) {
        event = window.event;
        coords.x = event.x;
        coords.y = event.y;
    } else {
        var element = event.target ;
        var totalOffsetLeft = 0;
        var totalOffsetTop = 0 ;

        while (element.offsetParent)
        {
            totalOffsetLeft += element.offsetLeft;
            totalOffsetTop += element.offsetTop;
            element = element.offsetParent;
        }
        coords.x = event.pageX - totalOffsetLeft;
        coords.y = event.pageY - totalOffsetTop;
    }
    return coords;
}