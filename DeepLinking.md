# Deep Linking #

This page describes simple way of creating deep links inside javascript code.


## Hooking up event ##

First we have to add the EventListener to our code. It can be done using two different methods: Javascript function or jQuery. The code responsible for this is in InitEvents method in events.js

### JavaScript ###

```
window.addEventListener('hashchange', OnDeepLinkChange, true);
```

where OnDeepLinkChange is our callback function (described below)

### jQuery ###

```
$(window).bind('hashchange', function() {
  OnDeepLinkChange(null);
});
```



## Handling Event ##

In callback function we use
```
window.location.hash
```
to get the "hash" part of address. Following actions depend on value of this statement. In this case we invoke appropriate functions to set camera parameters in scene graph.

```
function OnDeepLinkChange(e)
{
  switch(window.location.hash)
  {
    case "#top" : TOP(viewer); break;
    case "#bottom" : BOTTOM(viewer); break;
    ...
    default : break;
  }
}
```