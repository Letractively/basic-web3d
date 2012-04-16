var loaded = 0;
var toLoad = 0;

function ChangeScene(url)
{
	toLoad = 1;
	myModel = null;
	LoadScript(url, OnSceneLoaded);
}

function LoadManyScripts(scripts)
{
	toLoad = scripts.length;
	for(var i=0; i<toLoad; i++)
		LoadScript(scripts[i], OnScriptLoaded);
}

function LoadScript(url, callback)
{
    // adding the script tag to the head as suggested before
   var head = document.getElementsByTagName('head')[0];
   var script = document.createElement('script');
   script.type = 'text/javascript';
   script.src = url;

   // then bind the event to the callback function 
   // there are several events for cross browser compatibility
   script.onreadystatechange = callback;
   script.onload = callback;

   // fire the loading
   head.appendChild(script);
}

function OnScriptLoaded()
{
	loaded++;
	if(loaded == toLoad)
	{
		LoadScene();	
		loaded = 0;
	}
}

function OnSceneLoaded()
{	
	loaded = 0;
	UpdeteScene();
}