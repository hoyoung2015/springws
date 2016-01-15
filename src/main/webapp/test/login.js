//31bd804344541b77
var request_login = {
		method:"login",
		time:1423125642,
		sn:"sn",
		data:{
			userId:11
		}
}
var userId = 0;
var taskMarkers = new Array();
var mySocket = new MySocket({
	onmessage:function(event){
		var response = JSON.parse(event.data);
		if("login"==response.method){
			console.log(event.data);
			if(response.status==200){
				userId = request_login.data.userId;
				print("登陆成功");
				$(this).attr("disabled","disabled");
			}
		}else if("getEnergyPoints"==response.method){
			var res = eval("("+event.data+")");
			//console.log(res);
			$.each(res.data.points,function(){
				var cir = new BMap.Circle(new BMap.Point(this.lng,this.lat),10);
				map.addOverlay(cir);
			});
		}else if("getTaskView"==response.method){
//			console.log(typeof event.data)
			var res = eval("("+event.data+")");
			//console.log(res)
			if("VIEW"==res.data.type){
				console.log("VIEW")
				disptask(res);
			}else if("ACCEPT"==res.data.type){
				$.each(res.data.tasks,function(){
					var $ul = $("#ulAccepted");
					$ul.html("");
					$li = $("<li>"+this.taskId+"."+this.title+"</li>");
					$ul.append($li);
				});
			}else if("FINISHED"==res.data.type){
				$.each(res.data.tasks,function(){
					var $ul = $("#ulFinished");
					$ul.html("");
					$li = $("<li>"+this.taskId+"."+this.title+"</li>");
					$ul.append($li);
				});
			}
			
		}else if("listProperty"==response.method){
			console.log(event.data);
		}else{
			console.log(event.data);
		}
	}
});
function disptask(res){
	//清空原来的
	$.each(taskMarkers,function(){
		map.removeOverlay(this);
	});
	taskMarkers.length=0;
	var tasks = res.data.tasks;
	$.each(tasks,function(){
		var task = this;
		var point = new BMap.Point(this.lng,this.lat);
		var marker = new BMap.Marker(point);
		marker.setLabel(new BMap.Label(this.title,{offset:new BMap.Size(0, -20)}));
		taskMarkers.push(marker);
		map.addOverlay(marker);
//		console.log(marker)
		var markerMenu = new BMap.ContextMenu(); //  右键菜单
		var txtMenuItem = [{  
		                    text:"接受",  
		                    callback:function(p){
		                    	acceptTask(task.taskId);
		                    }
		                   },
		                   {  
			                    text:"修改",  
			                    callback:function(p){
			                    	navTab.openTab("taskForm","task/edit/"+task.id,{
			                        	title:"修改任务"
			                        });
			                    }
			                   },
   			                {  
   			                    text:"移动位置",  
   			                    callback:function(p){
   			                    	//marker.setIcon(iconPink);
   			                    	marker.enableDragging();
   			                    }
   			                 },
		                   {  
			                    text:"删除",  
			                    callback:function(p){
			                    	alertMsg.confirm("确定要删除吗？删除后无法恢复！", {
			                         okCall: function(e){
			                               // console.log(e);
			                         }
			                   });
			                    }
			                   } 
		                  ];  
		for(var i=0; i < txtMenuItem.length; i++){  
			markerMenu.addItem(new BMap.MenuItem(txtMenuItem[i].text,txtMenuItem[i].callback,50));  
		};  
		marker.addContextMenu(markerMenu);  
		
	});
}
var user = {
		lng : 108.845914,
		lat : 4.133658
}
$("#btnLogin").click(function(){
	request_login.data.userId = parseInt($("#userId").val());
	mySocket.send(json(request_login));
});
$("#btnAddEnergy").click(function(){
	if(!userId){
		console.log("尚未登录");
		return;
	}
	var request_energy = {
			method:"addEnergy",
			time:1423125642,
			sn:"sn",
			data:{
				userId:userId,
				energy:parseInt($("#energy").val())
			}
	}
	mySocket.send(json(request_energy));
});
/**
 * 更新头像
 */
$("#btnUpdateAvatar").click(function(){
	if(!userId){
		console.log("尚未登录");
		return;
	}
	var request_updateAvatar = {
			method:"updateAvatar",
			time:1423125642,
			sn:"sn",
			data:{
				userId:userId,
				photoBase64:base64Image
			}
	}
	mySocket.send(json(request_updateAvatar));
});
function freshLocation(lng,lat){
	if(!userId){
		console.log("尚未登录");
		return;
	};
	user.lng = lng;
	user.lat = lat;
	var request = {
			method:"freshLocation",
			time:1423125642,
			sn:"sn",
			data:{
				userId:userId,
				lng:lng,
				lat:lat
			}
	}
	mySocket.send(json(request));
}
/**
 * btnGetEnergyPoints获得附近能量点可能位置
 */
$("#btnGetEnergyPoints").click(function(){
	if(!userId){
		console.log("尚未登录");
		return;
	}
	var request_GetEnergyPoints = {
			method:"getEnergyPoints",
			time:1423125642,
			sn:"sn",
			data:{
				userId:userId,
				lng : user.lng,
				lat : user.lat
			}
	}
	mySocket.send(json(request_GetEnergyPoints));
	
});
/**
 * btnGetEnergyPoints获得附近能量点可能位置
 */
$("#btnGetTaskView").click(function(){
	if(!userId){
		console.log("尚未登录");
		return;
	}
	var request = {
			method:"getTaskView",
			time:1423125642,
			sn:"sn",
			data:{
				userId:userId,
				type:"VIEW",
				lng:108.967093,
				lat:34.180483
			}
	}
	mySocket.send(json(request));
	
});
$("#btnAcceptTask").click(function(){
	if(!userId){
		console.log("尚未登录");
		return;
	}
	var taskId = parseInt($("input[for='btnAcceptTask']").val());
	if(!taskId){
		alert("输入任务id");
		return;
	};
	acceptTask(taskId);
});
function acceptTask(taskId){
	var request = {
			method:"acceptTask",
			time:1423125642,
			sn:"sn",
			data:{
				userId:userId,
				taskId:taskId
			}
	}
	mySocket.send(json(request));
}
$("#btnAbortTask").click(function(){
	if(!userId){
		console.log("尚未登录");
		return;
	}
	var taskId = parseInt($("input[for='btnAbortTask']").val());
	if(!taskId){
		alert("输入任务id");
		return;
	}
	var request = {
			method:"abortTask",
			time:1423125642,
			sn:"sn",
			data:{
				userId:userId,
				taskId:taskId
			}
	}
	mySocket.send(json(request));
	
});
$("#btnListProperty").click(function(){
	if(!userId){
		console.log("尚未登录");
		return;
	}
	var request = {
			method:"listProperty",
			time:1423125642,
			sn:"sn",
			data:{
				userId:userId
			}
	}
	mySocket.send(json(request));
	
});
$("#btnEquipProperty").click(function(){
	if(!userId){
		console.log("尚未登录");
		return;
	}
	var targetId = parseInt($("input[for='btnEquipProperty1']").val());
	var replaceId = parseInt($("input[for='btnEquipProperty2']").val());
	if(!targetId || !replaceId){
		alert("输入道具");
		return;
	}
	
	var request = {
			method:"equipProperty",
			time:1423125642,
			sn:"sn",
			data:{
				userId : userId,
				targetId : targetId,
				replaceId : replaceId
			}
	}
	mySocket.send(json(request));
	
});
$("#btnGetTaskAccept").click(function(){
	if(!userId){
		console.log("尚未登录");
		return;
	}
	var request = {
			method:"getTaskView",
			time:1423125642,
			sn:"sn",
			data:{
				userId : userId,
				type : "ACCEPT"
			}
	}
	mySocket.send(json(request));
	
});
$("#btnGetTaskFinished").click(function(){
	if(!userId){
		console.log("尚未登录");
		return;
	}
	var request = {
			method:"getTaskView",
			time:1423125642,
			sn:"sn",
			data:{
				userId : userId,
				type : "FINISHED"
			}
	}
	mySocket.send(json(request));
});
$("#btnAnswerTask").click(function(){
	if(!userId){
		console.log("尚未登录");
		return;
	}
	var taskId = parseInt($("input[for='btnAnswerTask1']").val());
	var content = $("input[for='btnAnswerTask2']").val();
	if(!taskId || !content){
		alert("输入内容");
		return;
	}
	console.log(taskId+"|"+content);
	var request = {
			method:"answerTask",
			time:1423125642,
			sn:"sn",
			data:{
				userId : userId,
				taskId : taskId,
				content : encodeURIComponent(content)
			}
	}
	//return;
	mySocket.send(json(request));
	
});
$("#scanBarcode").click(function(){
	if(!userId){
		console.log("尚未登录");
		return;
	}
	var barcode = $("input[for='scanBarcode']").val();
	if(!barcode){
		alert("输入内容");
		return;
	}
	var request = {
			method:"scanPrevRule",
			time:1423125642,
			sn:"sn",
			data:{
				userId : userId,
				barCode : barcode
			}
	}
	mySocket.send(json(request));
});
$("#userAdvice").click(function(){
	if(!userId){
		console.log("尚未登录");
		return;
	}
	var content = $("input[for=userAdvice]").val();
	if(!content){
		alert("输入内容");
		return;
	}
	var request = {
			method:"userAdvice",
			time:1423125642,
			sn:"sn",
			data:{
				userId : userId,
				content : encodeURIComponent(content)
			}
	}
	mySocket.send(json(request));
});