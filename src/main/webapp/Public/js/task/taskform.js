var BASE_URL = "Public/webuploader";
var $list = $('#fileList'),
// 优化retina, 在retina下这个值是2
ratio = window.devicePixelRatio || 1,
// 缩略图大小
thumbnailWidth = 100 * ratio,
thumbnailHeight = 100 * ratio;
var uploader = WebUploader.create({

    // 选完文件后，是否自动上传。
    auto: true,
    //fileNumLimit : 1,
    // swf文件路径
    swf: BASE_URL + '/js/Uploader.swf',

    // 文件接收服务端。
    server: 'upload',

    // 选择文件的按钮。可选。
    // 内部根据当前运行是创建，可能是input元素，也可能是flash.
    pick: '#filePicker',

    // 只允许选择图片文件。
    accept: {
        title: 'Images',
        extensions: 'gif,jpg,jpeg,bmp,png',
        mimeTypes: 'image/*'
    }
});
//当有文件添加进来的时候
uploader.on( 'fileQueued', function( file ) {
	$list.html("");
	var $li = $(
            '<div id="' + file.id + '" class="file-item thumbnail">' +
                '<img>' +                
            '</div>'
            ),
        $img = $li.find('img');

    $list.append( $li );

    // 创建缩略图
    uploader.makeThumb( file, function( error, src ) {
        if ( error ) {
            $img.replaceWith('<span>不能预览</span>');
            return;
        }
        $img.attr( 'src', src );
    }, thumbnailWidth, thumbnailHeight );
    
	if(uploader.getFiles().length<=1){
		
	}else{
		/*var thefile = uploader.getFiles()[0];
		console.log(uploader.getFiles()[0])
		$('#'+thefile.id).find('img').attr("src",)*/
	}
});

// 文件上传过程中创建进度条实时显示。
uploader.on( 'uploadProgress', function( file, percentage ) {
    var $li = $( '#'+file.id ),
        $percent = $li.find('.progress span');

    // 避免重复创建
    if ( !$percent.length ) {
        $percent = $('<p class="progress"><span></span></p>')
                .appendTo( $li )
                .find('span');
    }

    $percent.css( 'width', percentage * 100 + '%' );
});

// 文件上传成功，给item添加成功class, 用样式标记上传成功。
uploader.on( 'uploadSuccess', function( file,response) {
    $( '#'+file.id ).addClass('upload-state-done');
    $('#taskForm').find("input[name='photo']").val(response.filename);
});

// 文件上传失败，现实上传出错。
uploader.on( 'uploadError', function( file ) {
    var $li = $( '#'+file.id ),
        $error = $li.find('div.error');

    // 避免重复创建
    if ( !$error.length ) {
        $error = $('<div class="error"></div>').appendTo( $li );
    }

    $error.text('上传失败');
});

// 完成上传完了，成功或者失败，先删除进度条。
uploader.on( 'uploadComplete', function( file ) {
    $( '#'+file.id ).find('.progress').remove();
});
String.prototype.sprintf=function()  
	{  
	  if(arguments.length==0) return this;  
	  for(var s=this, i=0; i<arguments.length; i++)  
	    s=s.replace(new RegExp("\\{"+i+"\\}","g"), arguments[i]);  
	  return s;  
	};  
	var ruleList = $("#ruleList");
	var select = $("#selectTabItem > select");
	var selectTabs = $("#myTab .selectTab");
	selectTabs.find("a.barcode").click(function(){
		$.post("task/barcode",{},function(data){
			console.log(data);
		});
	});
	select.change(function() {
		var type = $(this).val();
		selectTabs.hide();
		selectTabs.find("input.clear").val("");
		positiveFeedbackInput.val("");
		negativeFeedbackInput.val("");
		selectTabs.filter("." + type).show();
	});
	var positiveFeedbackSelect= $("#ruleFeedback").find("select.positiveFeedback");
	var negativeFeedbackSelect= $("#ruleFeedback").find("select.negativeFeedback");
	
	var positiveFeedbackInput = $("#ruleFeedback").find("input[name='positiveFeedback']");
	var negativeFeedbackInput = $("#ruleFeedback").find("input[name='negativeFeedback']");
	var normalIndex = 4;
	var ruleHandler = {
			getTypeNo:{
				prop:function(){
					return 1;
				},
				gps:function(){
					return 2;
				},
				scan:function(){
					return 4;
				},
				normal:function(){
					normalIndex <<= 1;
					return normalIndex;
				},
				finality:function(){
					return 2147483640;
				}
			},
			desc:{
				prop:"【前置】道具ID:",
				gps:"【前置】GPS坐标:",
				scan:"【前置】扫码",
				normal:"关键字:",
				finality:"【结束】关键字:"
			}
		}
	$("#btnAddRule").click(function() {
		var type = select.val();
		var meta;
		if("prop"==type){
			meta = $("#selectProp").data("selectProp");
		}else if("gps"==type){
			var gps = selectTabs.filter("."+type);
			meta = " ";
		}else if("scan"==type){
			var scan = selectTabs.filter("."+type);
			meta = " ";
		}else if("normal"==type){
			var normal = selectTabs.filter("."+type);
			var keyword = normal.find("input").val();
			meta = keyword;
		}else if("finality"==type){
			var finality = selectTabs.filter("."+type);
			var keyword = finality.find("input").val();
			meta = keyword;
		}else{
			return;
		}
		if(!meta){
			alertMsg.warn("请填写规则内容！");
			return;
		}
		
		var typeNum = ruleHandler.getTypeNo[type].apply(this);
		/**
		 * 在添加结束规则之前必须添加普通规则，否则结束规则没有存在意义
		 */
		var positiveFeedback = $("#poFb").data("poFb");
		if(!positiveFeedback){
			alertMsg.warn("请填写正反馈！");
			return;
		}
		var negativeFeedback = $("#neFb").data("neFb");
		if(!negativeFeedback){
			alertMsg.warn("请填写负反馈！");
			return;
		}
		var rule = {
				"type" : typeNum,
				"meta" : meta,
				"negativeFeedback" : negativeFeedback,
				"positiveFeedback" : positiveFeedback,
		};
		var isRepeat = false;
		//判断是否已经添加
		var haveNormalRule = false;
		ruleList.find("li").each(function(){
			var data = $(this).data("rule");
			if(data){
				if(data.type < 8 && data.type==rule.type){//前置，对比类型
					alertMsg.warn("不能重复添加前置规则！");
					isRepeat = true;
					return;
				}else if(data.type >= 8 && data.type!=2147483640){//关键字，对比关键字
					haveNormalRule = true;
					if(data.meta==rule.meta){//校验普通规则是否相等
						alertMsg.warn("不能添加重复的关键字！");
						isRepeat = true;
						return;
					}
				}
			}
		});
		if(!haveNormalRule && typeNum==2147483640){//结束规则
			alertMsg.warn("在添加结束规则之前必须添加普通规则！");
			return;
		}
		if(isRepeat){
			return;
		}

		var str = "<li type='{0}'><p>{1}</p><p>正反馈:{2}</p><p>负反馈:{3}</p><button onclick='return false'>删除</button></li>";
		var liNode = $(str.sprintf(type,ruleHandler.desc[type]+meta,rule.positiveFeedback,rule.negativeFeedback));		
		liNode.data("rule",rule);//绑定数据
		liNode.find("button").click(function(){
			liNode.remove();
			resetNormalRule();//重排普通规则类型
		});
		ruleList.append(liNode);
	});
	
	function taskFormValidateCallback(form, callback, confirmMsg) {
   		var $form = $(form);
   		if (!$form.valid()) {
   			return false;
   		}
   		/**
   		 * 检查是否选择规则
   		 */
   		var $ruleListLi = $("#ruleList").find("li");
   		if($ruleListLi.length<=0){
   			alertMsg.warn("必须制定规则！");
   			return false;
   		}
   		var title = $form.find("input[name='title']").val();
   		var difficulty = parseInt($form.find("select[name='difficulty']").val());
   		var score = parseInt($form.find("input[name='score']").val());
   		var info = $form.find("textarea[name='info']").val();
   		var photo = $form.find("input[name='photo']").val();
   		var clues = $form.find("textarea[name='clues']").val();
   		var chainId = parseInt($form.find("input[name='chainId']").val());
   		var taskType = parseInt($form.find("input[name=taskType]").val());
   		var pointGroupId = parseInt($form.find("input[name='pointGroupId']").val());
   		//构造json
   		var task  = {
   				taskType : taskType,
   				title : title,
   				difficulty : difficulty,
   				score : score,
   				info : info,
   				photo : photo,
   				clues : clues,
   				pointGroup : {id : pointGroupId},
   				taskChain : { id : chainId },
   				supers : [],
   				rules : []
   		}; 
   		//如果绑定了地点
   		if(pointGroupId){
   			task.pointGroup = {id:pointGroupId};
   		}
		
		$("input:checkbox[name=supers]:checked").each(function(){
			task.supers.push({
				id : parseInt($(this).val())
			});
		});
		$ruleListLi.each(function(){
			var data = $(this).data("rule");
			task.rules.push(data);
		});
		console.log(task);
//		return false;
   		var _submitFn = function(){
   			$.ajax({
   				type: form.method || 'POST',
   				url:$form.attr("action"),
   				data:{taskData : JSON.stringify(task)},
   				dataType:"json",
   				cache: false,
   				success: callback || DWZ.ajaxDone,
   				error: DWZ.ajaxError
   			});
   		}
   		
   		if (confirmMsg) {
   			alertMsg.confirm(confirmMsg, {okCall: _submitFn});
   		} else {
   			_submitFn();
   		}
   		return false;
   	}
	function navTabAjaxDone(json){
		DWZ.ajaxDone(json);
		if (json.statusCode == DWZ.statusCode.ok){
			if (json.navTabId){ //把指定navTab页面标记为需要“重新载入”。注意navTabId不能是当前navTab页面的
				navTab.reloadFlag(json.navTabId);
			} else { //重新载入当前navTab页面
				var $pagerForm = $("#pagerForm", navTab.getCurrentPanel());
				var args = $pagerForm.size()>0 ? $pagerForm.serializeArray() : {}
				navTabPageBreak(args, json.rel);
			}
			
			if ("closeCurrent" == json.callbackType) {
				setTimeout(function(){navTab.closeCurrentTab(json.navTabId);}, 100);
			} else if ("forward" == json.callbackType) {
				navTab.reload(json.forwardUrl);
			} else if ("forwardConfirm" == json.callbackType) {
				alertMsg.confirm(json.confirmMsg || DWZ.msg("forwardConfirmMsg"), {
					okCall: function(){
						navTab.reload(json.forwardUrl);
					},
					cancelCall: function(){
						navTab.closeCurrentTab(json.navTabId);
					}
				});
			} else {
				navTab.getCurrentPanel().find(":input[initValue]").each(function(){
					var initVal = $(this).attr("initValue");
					$(this).val(initVal);
				});
			}
		}
	}
	function resetNormalRule(){
		var $ruleListLi = $("#ruleList").find("li[type=normal]");
		normalIndex = 4;
		if($ruleListLi.length>0){
			$.each($ruleListLi,function(){
				normalIndex <<= 1;
				var trule = $(this).data("rule");
				trule.type = normalIndex;
				$(this).data("rule",trule);
			});
		}
	}