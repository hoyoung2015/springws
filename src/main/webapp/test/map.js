function G(id) {
	return document.getElementById(id);
}
// 百度地图API功能
var map = new BMap.Map("allmap");
// 定位中心
var lng_center = 108.970274;
var lat_center = 34.185903;
map.centerAndZoom(new BMap.Point(lng_center,lat_center), 16);
map.enableScrollWheelZoom();
map.setDefaultCursor("pointer");
var ac = new BMap.Autocomplete({
	"input" : "suggestId",
	"location" : map
});
ac.addEventListener("onhighlight", function(e) { // 鼠标放在下拉列表上的事件
	var str = "";
	var _value = e.fromitem.value;
	var value = "";
	if (e.fromitem.index > -1) {
		value = _value.province + _value.city + _value.district + _value.street
				+ _value.business;
	}
	str = "FromItem<br />index = " + e.fromitem.index + "<br />value = "
			+ value;

	value = "";
	if (e.toitem.index > -1) {
		_value = e.toitem.value;
		value = _value.province + _value.city + _value.district + _value.street
				+ _value.business;
	}
	str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = "
			+ value;
	G("searchResultPanel").innerHTML = str;
});

var myValue;
ac.addEventListener("onconfirm", function(e) { // 鼠标点击下拉列表后的事件
	var _value = e.item.value;
	myValue = _value.province + _value.city + _value.district + _value.street
			+ _value.business;
	G("searchResultPanel").innerHTML = "onconfirm<br />index = " + e.item.index
			+ "<br />myValue = " + myValue;
	setPlace();
});
ac.addEventListener("onconfirm", function(e) { // 鼠标点击下拉列表后的事件
	var _value = e.item.value;
	myValue = _value.province + _value.city + _value.district + _value.street
			+ _value.business;
	G("searchResultPanel").innerHTML = "onconfirm<br />index = " + e.item.index
			+ "<br />myValue = " + myValue;
	setPlace();
});
function setPlace() {
	map.clearOverlays(); // 清除地图上所有覆盖物
	function myFun() {
		var pp = local.getResults().getPoi(0).point; // 获取第一个智能搜索的结果
		map.centerAndZoom(pp, 16);
		map.addOverlay(new BMap.Marker(pp)); // 添加标注
	}
	var local = new BMap.LocalSearch(map, { // 智能搜索
		onSearchComplete : myFun
	});
	local.search(myValue);
}
var menu = new BMap.ContextMenu();                  //  右键菜单  
var txtMenuItem = [
  {  
   text:'刷新位置',  
   callback:function(p){  
	   freshLocation(p.lng,p.lat);
   }
  },
  {  
       text:'定位放大',  
       callback:function(p){  
    	   map.centerAndZoom(p, 16);
       }
        
      }
 ];  
 for(var i=0; i < txtMenuItem.length; i++){  
  menu.addItem(new BMap.MenuItem(txtMenuItem[i].text,txtMenuItem[i].callback,100));  
 };  
 map.addContextMenu(menu);  