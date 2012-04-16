var loaded = 0;

function SetScene(url)
{
	scripts.push(url);
}

function LoadManyScripts(scripts)
{
	for(var i=0; i<scripts.length; i++)
		LoadScript(scripts[i]);
}

function LoadScript(url)
{
    // adding the script tag to the head as suggested before
   var head = document.getElementsByTagName('head')[0];
   var script = document.createElement('script');
   script.type = 'text/javascript';
   script.src = url;

   // then bind the event to the callback function 
   // there are several events for cross browser compatibility
   script.onreadystatechange = OnLoaded;
   script.onload = OnLoaded;

   // fire the loading
   head.appendChild(script);
}

function OnLoaded()
{
	loaded++;
	if(loaded == scripts.length)
	{
		LoadScene();	
		loaded = 0;
	}
}