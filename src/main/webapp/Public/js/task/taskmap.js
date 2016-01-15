function G(id) {
			return document.getElementById(id);
		}
		// 百度地图API功能
		var map = new BMap.Map("allmap");
		//定位中心
		map.centerAndZoom(new BMap.Point(108.123456, 34.123456), 16);
		map.enableScrollWheelZoom();
		map.setDefaultCursor("pointer");  
		var ac = new BMap.Autocomplete({
			"input" : "suggestId",
			"location" : map
		});
		ac.addEventListener("onhighlight", function(e) { //鼠标放在下拉列表上的事件
			var str = "";
			var _value = e.fromitem.value;
			var value = "";
			if (e.fromitem.index > -1) {
				value = _value.province + _value.city + _value.district
						+ _value.street + _value.business;
			}
			str = "FromItem<br />index = " + e.fromitem.index
					+ "<br />value = " + value;

			value = "";
			if (e.toitem.index > -1) {
				_value = e.toitem.value;
				value = _value.province + _value.city + _value.district
						+ _value.street + _value.business;
			}
			str += "<br />ToItem<br />index = " + e.toitem.index
					+ "<br />value = " + value;
			G("searchResultPanel").innerHTML = str;
		});

		var myValue;
		ac.addEventListener("onconfirm", function(e) { //鼠标点击下拉列表后的事件
			var _value = e.item.value;
			myValue = _value.province + _value.city + _value.district
					+ _value.street + _value.business;
			G("searchResultPanel").innerHTML = "onconfirm<br />index = "
					+ e.item.index + "<br />myValue = " + myValue;
			setPlace();
		});
		ac.addEventListener("onconfirm", function(e) { //鼠标点击下拉列表后的事件
			var _value = e.item.value;
			myValue = _value.province + _value.city + _value.district
					+ _value.street + _value.business;
			G("searchResultPanel").innerHTML = "onconfirm<br />index = "
					+ e.item.index + "<br />myValue = " + myValue;
			setPlace();
		});
		function setPlace() {
			map.clearOverlays(); //清除地图上所有覆盖物
			function myFun() {
				var pp = local.getResults().getPoi(0).point; //获取第一个智能搜索的结果
				map.centerAndZoom(pp, 16);
				map.addOverlay(new BMap.Marker(pp)); //添加标注
			}
			var local = new BMap.LocalSearch(map, { //智能搜索
				onSearchComplete : myFun
			});
			local.search(myValue);
		}
		//没有发布的任务可以右键创建
		if(!isPublish){
			var menu = new BMap.ContextMenu();                  //  右键菜单  
	        var txtMenuItem = [
	          {  
	           text:'创建线下任务',  
	           callback:function(p){  
	            navTab.openTab("taskForm","task/taskForm?taskType=0&chainId="+chainId+"&lng="+p.lng+"&lat="+p.lat,{
	            	title:"添加任务"
	            });
	           }
	          },
	          {  
		           text:'创建线上任务',  
		           callback:function(p){  
		            navTab.openTab("taskForm","task/taskForm?taskType=1&chainId="+chainId+"&lng="+p.lng+"&lat="+p.lat,{
		            	title:"添加任务"
		            });
		           }
		          }
	         ];  
	         for(var i=0; i < txtMenuItem.length; i++){  
	          menu.addItem(new BMap.MenuItem(txtMenuItem[i].text,txtMenuItem[i].callback,100));  
	         };  
	         map.addContextMenu(menu);  
		}
         $(function(){
        	$.post("task/listChainAjax",{chainId:chainId},function(chain){
        		var centerPoint = getCenter(chain.tasks);
        		if(!centerPoint){
        			centerPoint = new BMap.Point(116.399669,39.928437);
        		}
        		map.centerAndZoom(centerPoint, 16);
        		var markers = new Array();
        		$.each(chain.tasks,function(){
        			var task = this;
        			var point = new BMap.Point(this.lng,this.lat);
        			var marker = new BMap.Marker(point);
        			marker.task = this;
        			markers.push(marker);
        			marker.setTitle(this.title);
        			var markerMenu = new BMap.ContextMenu(); //  右键菜单
        			var txtMenuItem = [{  
        			                    text:"查看",  
        			                    callback:function(p){
        			                    	$.pdialog.open("task/detail/"+task.id,"taskDetail",task.title,{
        			                        	height:500
        			                        });
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
        			map.addOverlay(marker);
        			var taskTile = "";
        			if(this.childs.length==0){
        				taskTile = "【起始】";
        			}
        			if(this.taskType==0){
        				taskTile += "【线下】";
        			}else{
        				taskTile += "【线上】";
        			}
        			taskTile += this.title;
        			marker.setLabel(new BMap.Label(taskTile,{offset:new BMap.Size(0, -20)}));
        		});
        		$.each(markers,function(){
        			//查找上级
        			//this.supers = new Array();
        			this.childs = new Array();
        			var marker = this;
        			for(var i=0;i<markers.length;i++){
        				if(marker.task.id==markers[i].task.id){
        					continue;
        				}
        				//自己是别人的上级，即找孩子
        				var osupers = markers[i].task.childs;
        				for(var j=0;j<osupers.length;j++){
        					if(marker.task.id==osupers[j].id){
        						marker.childs.push(markers[i]);
        						if(!markers[i].supers){
        							markers[i].supers = new Array();
        						}
        						markers[i].supers.push(marker);
        					}
        				}
        			}
        			marker.addEventListener("mouseover",function(event){
        				if(this.supers){
        					for(var i=0;i<this.supers.length;i++){
            					this.supers[i].setAnimation(BMAP_ANIMATION_BOUNCE);
            				}
        				}
					});
        			marker.addEventListener("mouseout",function(event){
        				if(this.supers){
        					for(var i=0;i<this.supers.length;i++){
            					this.supers[i].setAnimation(null);
            				}
        				}
					});
        			marker.addEventListener("dragend",function(event){
        				//console.log(marker.childlines);
        				$.post("task/transloc",{id:this.task.id,lng:event.point.lng,lat:event.point.lat},function(msg){
        					
        				});
        				this.disableDragging();
					});
        			marker.addEventListener("dragging",function(event){
        				//遍历连接上级的线段
        				if(this.superlines){
        					for(var i=0;i<this.superlines.length;i++){
        						var superPoint = this.superlines[i].getPath()[0];
        						this.superlines[i].setPath([
        				            					      superPoint,
        				            					      new BMap.Point(event.point.lng,event.point.lat)                        
        				            					]);
        					}
        				}
        				//遍历连接下级的线段
        				if(this.childlines){
        					for(var i=0;i<this.childlines.length;i++){
        						var childPoint = this.childlines[i].getPath()[1];
        						this.childlines[i].setPath([
        				            					      new BMap.Point(event.point.lng,event.point.lat),
        				            					      childPoint                        
        				            					]);
        					}
        				}
					});
        		});
        		//画线
        		$.each(markers,function(){
        			if(this.supers){
        				this.superlines = new Array();
    					for(var i=0;i<this.supers.length;i++){
    						var polyline = new BMap.Polyline([
    						                              this.supers[i].point,
    						                              this.point
    						          					],{strokeColor:"gray", strokeWeight:2, strokeOpacity:0.8});
    						map.addOverlay(polyline);
    						this.superlines.push(polyline);
    						//上级将他视为孩子
    						if(!this.supers[i].childlines){
    							this.supers[i].childlines = new Array();
    						}
    						this.supers[i].childlines.push(polyline);
        				}
    				}
        		});
        	}) 
         });
         function getCenter(tasks){
        	 if(!tasks || tasks.length==0){
        		 return;
        	 }
        	 var too = {
     				minLat:1000,
     				minLng:1000,
     				maxLat:0,
     				maxLng:0
     			};
        	 $.each(tasks,function(){
     			if(too.minLat>this.lat){
     				too.minLat=this.lat;
     			}
     			if(too.minLng>this.lng){
     				too.minLng=this.lng;
     			}
     			if(too.maxLat<this.lat){
     				too.maxLat=this.lat;
     			}
     			if(too.maxLng<this.lng){
     				too.maxLng=this.lng;
     			}
        	 });
        	 return new BMap.Point((too.minLng+too.maxLng)/2,(too.maxLat+too.minLat)/2);
         }
//         console.log(0x7fffffff^0x07);
         function addArrow(polyline,length,angleValue){ //绘制箭头的函数  
        	 var linePoint=polyline.getPath();//线的坐标串  
        	 var arrowCount=linePoint.length;  
        	 for(var i =1;i<arrowCount;i++){ //在拐点处绘制箭头  
        	 var pixelStart=map.pointToPixel(linePoint[i-1]);  
        	 var pixelEnd=map.pointToPixel(linePoint[i]);  
        	 var angle=angleValue;//箭头和主线的夹角  
        	 var r=length; // r/Math.sin(angle)代表箭头长度  
        	 var delta=0; //主线斜率，垂直时无斜率  
        	 var param=0; //代码简洁考虑  
        	 var pixelTemX,pixelTemY;//临时点坐标  
        	 var pixelX,pixelY,pixelX1,pixelY1;//箭头两个点  
        	 if(pixelEnd.x-pixelStart.x==0){ //斜率不存在是时  
        	     pixelTemX=pixelEnd.x;  
        	     if(pixelEnd.y>pixelStart.y)  
        	     {  
        	     pixelTemY=pixelEnd.y-r;  
        	     }  
        	     else  
        	     {  
        	     pixelTemY=pixelEnd.y+r;  
        	     }     
        	     //已知直角三角形两个点坐标及其中一个角，求另外一个点坐标算法  
        	     pixelX=pixelTemX-r*Math.tan(angle);   
        	     pixelX1=pixelTemX+r*Math.tan(angle);  
        	     pixelY=pixelY1=pixelTemY;  
        	 }  
        	 else  //斜率存在时  
        	 {  
        	     delta=(pixelEnd.y-pixelStart.y)/(pixelEnd.x-pixelStart.x);  
        	     param=Math.sqrt(delta*delta+1);  
        	   
        	     if((pixelEnd.x-pixelStart.x)<0) //第二、三象限  
        	     {  
        	     pixelTemX=pixelEnd.x+ r/param;  
        	     pixelTemY=pixelEnd.y+delta*r/param;  
        	     }  
        	     else//第一、四象限  
        	     {  
        	     pixelTemX=pixelEnd.x- r/param;  
        	     pixelTemY=pixelEnd.y-delta*r/param;  
        	     }  
        	     //已知直角三角形两个点坐标及其中一个角，求另外一个点坐标算法  
        	     pixelX=pixelTemX+ Math.tan(angle)*r*delta/param;  
        	     pixelY=pixelTemY-Math.tan(angle)*r/param;  
        	   
        	     pixelX1=pixelTemX- Math.tan(angle)*r*delta/param;  
        	     pixelY1=pixelTemY+Math.tan(angle)*r/param;  
        	 }  
        	   
        	 var pointArrow=map.pixelToPoint(new BMap.Pixel(pixelX,pixelY));  
        	 var pointArrow1=map.pixelToPoint(new BMap.Pixel(pixelX1,pixelY1));  
        	 var Arrow = new BMap.Polyline([  
        	     pointArrow,  
        	  linePoint[i],  
        	     pointArrow1  
        	 ], {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.5});  
        	 map.addOverlay(Arrow);  
        	 }  
        	 }  