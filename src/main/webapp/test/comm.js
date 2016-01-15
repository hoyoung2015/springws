/**
 * 
 */
var secret = "123456";
function json(request){
	var arr = new Array();
	var map = {};
	for(var pro in request){
		if("data"==pro){
			var data = request["data"];
			for(var prodata in data){
				arr.push(prodata);
				map[prodata] = data[prodata];
			}
		}else{
			arr.push(pro);
			map[pro] = request[pro];
		}
	}
	arr.sort();
	/**
	 * 计算签名
	 */
	var str = "";
	for(var i=0;i<arr.length;i++){
		if(i>0){
			str +="&";
		}
		str += arr[i]+"="+map[arr[i]];
	}
	str += "&secret="+secret;
	var sign = faultylabs.MD5(str).toLowerCase();
	request["sign"] = sign;
	var json = JSON.stringify(request);
	console.log(json);
	return json;
}
var url = "ws://localhost:8081/springws/api";
//var url = "ws://112.124.3.197:8081/treasure/api";
function print(msg){
	var mapper = $("#content");
	mapper.append(msg+"<br/>");
}
function MySocket(opt){
	var wsOpen = false;
	var ws= new WebSocket(url);
	if(opt.onopen){
		ws.onopen = opt.onopen;
	}else{
		ws.onopen = function () {
	    	wsOpen = true;
	        console.log('open');
	    };
	}
	if(opt.onmessage){
		ws.onmessage = opt.onmessage;
	}else{
		ws.onmessage = function (event) {
	        console.log(event.data);
	    };
	}
	if(opt.onclose){
		ws.onclose = opt.onclose;
	}else{
		ws.onclose = function (event) {
	    	wsOpen = false;
	        console.log('Info: connection closed.');
	        console.log(event);
	    };
	}
    this.send = function(msg){
    	if(!wsOpen){
    		return ;
    	}
    	ws.send(msg);
    }
}
$(function(){
	$("#btnClean").click(function(){
		$("#content").html("");
	});
});
var base64Image = "iVBORw0KGgoAAAANSUhEUgAAAVUAAAA8CAIAAABZ4r5fAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0QzY1QUY4NDQ4NjQxMUU0QkFCQkJGODE3RUVCRTk3MyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozQTE0QkRDNDVBOTExMUU0OTcxQUEwMzNDRDM0MDgxQSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozQTE0QkRDMzVBOTExMUU0OTcxQUEwMzNDRDM0MDgxQSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjUzMjU1RThGRTU1MEU0MTFBMTY2QzAyNEI1RUE0QUVCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjRDNjVBRjg0NDg2NDExRTRCQUJCQkY4MTdFRUJFOTczIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+I0UUAAAAE9dJREFUeNrsXQl01dWZ/+5/fUsWCGELIWyigIiKrA5qEeq+QEeGaWvtqdbaU2fGqaOjThftWB1b57Q6x6mDdTwVPMVlUFo74oKDIKIoGEQCBA1CSAjZX5K3/Nd75/v/XwhJ3kvykrwV7sc7R/Pe/X//u/2+5d7vfpesvuSnwIkTpzOSBN4FnDhx/HPixInjnxMnThz/nDhxOu1J6v4Hpcw0zExVhRAiiqIgCoTkdp8auskYS7CwrEiC0LcUZmAYvblhRymqnLbm4NtNw+pVB6wz1ryfp2ybWqbVe7bJEo4wR1024h/BryjSzDmTHJuAZQY2TQ1tzfXttm2rHkUQclIMUEqnzyr15XmwPxMQefDVobpI2OirsZSxc84rw97ogh+WDAW1I4fqhLQACV+L4mbG+ZMURe5WB6EtEKyuqpckMT74LVow0lc2dWz3TsCaVx+ub28NixIXAdmHf5TWP/jnG5ffMD+DteloD1cdrNm6qXzHu/t0zcB5n1u9iXVeuPTc+391S+KPbHur/MmHXiZEirV6tLB+1arFP7xvZexTj923dueWijT0D7bo2tWLb79nRa/v0SJ4+B+f27frsOKRYyQgU1Tpnke/NfP8Kb1+2l9++Jc//oNl0RwV7qel/89s0HXWZksdU84Zm9na5Bf4Llhw9l0Prn5kzQ/OPq8sHNJyRu2DaUJHxG4pnuAb1IMlZcWuFmU9uRkGcqMtJZML4z41bkKRbafWSLPdOmi0dUxZfly3pWTSaMumPZ0VakEEH5HzjdIpY2KfKp06Fi0jRhkHXrbgH4dZg+YwHA/BcRvMLKnWWTMn/ut/3n7Z1ReGgzkgAhgwhEoYTgShVqeBQfoLLIabrUMbjghyMyHU11OpVKAEkWx01qHGoMH4dbAp6S0y9Ag0OnOJnqDUjtNR6M8wDv5swj8FC2W2DRoFPTN+fx+Exu1dD61evGx2JKxndx8SB4+gYzdS0BhYw8feyRFBbnaGJJqNFYjOisTrgEaQDeEsnEuc+rP/T07irHPJ0DC+476VaCGjt5kDRkBnH5KkSpaMizaSrqc4ZQb/WU1FxQV/c9syu6efyYkTpzMC/0hLrjh/6oySXDAB3A7lK9ucOP6TSLIsLb78PNPMAfyLolhbU8dnFadcISmRQv+95vnq6lrEYcp8Z0YIWbh4/rIrl8bVnnPmT/O4MTAke2MDsWIMK7lj+84f/919o4pH2bZ98geCwqt0Yskdd97KJxyn3MP/h9t37S2vUD1q8oHvBJhRJ86Nstc3bqqvb/j2Latji40vLR5RnN/a2C72EXCWUWKO1Q+KCCoDW5Hg048rKKUnf6POfp6un3veTI5/TjmJ/0JPSbFfS03MOTUhbEKQgYVK8qU/vnrNdVeMLBrZq1BegTe/wNdc3yZmZSeihlcgXwApulXm85wSDQaETGgXRcHj8fDZxikX8c8UKPBAkQLJxz9zaqATEAwISJIYCobqTzTE4l8QBPw1m0NHUP8roMRueuPfJnTwecYpd/FPUrCzfUpzSuBB+WJCCE0AdO9zPGqExMCfE6fspYyv/zthMwLIAoh8MDhxOtPw35fm5MSJ0xmEf06cOHH8c+LEKV2UYEgPoZQZqYrAJRZYBpgGNWjiJ8MZWJadrB0BQSBZGVnAiVMW4J9SKkrC5OnjU1QJG7QIKBYLTZ4yqaysNA7YGXPD6U6tEdg2HVdaJCvS8EUAgr+jPdLa2CHJXARw4viPwR616W13X3/NqotTdA4vCmsikL7Ce9tag4GWoJs60imgR4zlK+b/8P4VSckngaIt0BJ69O4/fHWorv+clpw4nYn4F73mrAsnOVDJUPLWvZ982dzQpnoUCiYFQ6Phcy8qE0UxWZuGRcUFU2dO+KKihuOfE8d/b9JYM81carBwSNv4wjaBCG5SqoAOgSAE9T6SUg2ZHDuCb0FyOsMoIX3uJoHKTCgbpfSZX2+s2l+rqLJzRgBCFoRsiGQqMRYnTmcc/jNI6PaXf3TIWefjY8WJ05mGf/TMV916ea4k/+HE6XTEP8mka3z5dfMmThvT6zKp/u7MGhI5Ww/cxuDE8R9LlmW3tWfsEKvP71m8dHZ3EwCFUWtLa3Lf0tEWJjx1H6czjAZe/0dNi7r38UefuOKqpanZ/yeMMUVR5i+aO3PWOXFLnL9g+mtrtzFmuXYI83jVP657uaGhUVGV4VwmI4AkQ4Eq+RrrAp9+UJlz141x4pRy/CMpsnLk8ME1v1ubggowZ3vBvRnG+6z3/p/905VXL4stNGHymMKivEBrQJBkArIo0GB7ZP3aDcNuvN8P42XIQxnn8Sp8/y9riTHneli0Q8Uh22gMZI/sXD3KhsvTpkwUBdUjd4Wr4X9Nw7YMK8Ep5FzfJAiKKqFVS+0BbkN0gtyAqNHKZwT/MozMlyeoqpIC9Ns2RCx3P0/X9Wf/6/klly7yIyp7UkGhr2Ckv7W5XYURIihOykAR8vKG+3YRPDL4CU89kN2ECLEseuHFZ8+ZNy1/hG9oTGRF2vTKR4c+r46GeHXyXDx9zryz8kcOgidCvb01cuCzr3Z/UEmAuJgkWsRcfPm5Fy+frWtmAhxIuEP7Yv+xPTu/mHXhjJlzJucVevsKY8XChmbWHm38aEtF44mAo6XSjn+mAvbQmFTk/0LmFmgaNBrQji5AS3NLzbHj58yY3huokijLIkoLCXwieJOVV4fwm2qyH/yOrqR3/vQby64f7s3Uu9+v3F/+FeI/yvNHP1m5/IYFQ2O14uZLt7+z53ePbDBNWxDBNLXJ08ctWX7BoCya1qb2EaPyE7wwYuUtX3vyoZc+2/llckWAkBhOsI5iaj7ogfsVKBRAZuCk96a23TdWO/8nSa8WOPiznGww2rX6G7+7aPjg78XzhlsWDhn8UVry9QtWff/yoN4choYQ1Pd1U2s/dkTR6ILEb4spKi74+5+vGlMyEh2WNOOfuPo2dR+CJr3QZYkklOE/Ke/llNWEXmHQqssba1254q+SydM+4U8Sz2XXLSgu9YSseg0arEHifwhUPGbE0mvnGnoyY2Gy5LgLt8M59ZgPFEwdWkNW07TSmaNHF59cCLA3vPKno0ePSVKi8xb1ClqX6DPiI4e/qGZKMGQ2Tp0wY8yY0V3+xYaXNw7I052dBHVvyYSSVX+7QnKzRRSM8E+cMu5IbaW7hn1Ko3y44+Nt733Qa70sygFf5/P5Vn1zZdHJJNehYOil9RtaW9u6H66LFnYuvAFy7Y1XnzV9SvT7s2dPlGTBWQ8kpxX+u5yi0/Z+eEZpUrmlrZtYnzusKZTYzIZI9FYISTw1RQ8e/PKJx9cwmvgli0wAjx/GK1CA8CQejclhZvXgeejgl08+/gylbIBFeOceF4qdYVts+vRp8xZ2uvpxL8Xav/fg+udfzcvzx3LAdwRDYUVVvvf9m6Pfb35761O/eRaFQs/CzC3MIpHI8dr6X/32F52vUySBkJOXTZ9m+HekGvF649+TQXNZLqDU9/q8ffiBpP8H437vzVOTK1D6kch5+Xl9OmEpxL8Re+TUNlihMhF1b+LXwLkhHn4BVOxLDUI26208Ww7PUnEgnjZoBrSjPAqHI4G2QPdlvFhx6FVGFPun+v09Rhybgxyco3SMtbediqYLB+wi75RehRm2FTpsCGPFAoG2eK9Lo/5nLLWa2ZV2LBgMXTT/gslTJsUWMHRT14x0Xv6XpMY67aKMapq+5NLFcUt0tIVN05JlOZ5+JR0d8Y85X3TxjA3PvWcaVopyFkVHRNe1kUUj5150fh81D6UuYpLFW6MRieKD0aKzGj2o90YVJkRvmovl6SUD87QgTMFAk4QkEHsuA2rz0V7w9JQgBooPHQzomUdDEf2xhaPHWzX8l4JQ98Hi34U+ZcOJtBtI2Ns2M8+bM+veB+6KC/JASzDQ3JGe7CM48R1cJSPWAicctouI8M2bb1p50/Vxy9RVN1mmrShyL+RHB/5YdU3cp86ZPem2e65f//TbkbCRihvHKdgmNUYVF911z4/Gl4yLow9tu/54aypHhMVzM1J0Fc2APHFSyoOJE4ll6FxyQU7BjfT/diwpONvtKZ/wCd3/c+dPbtLCeurUL2WWILOJZSWePoz/w5W1qCfTEJ/LmLNCs/r2ZYsuOzcZ+U6ZxQx/vmdi2YS+eu/g50cFIsTMNmdvUpKlLyqrNE2Le3fgNTddvOCSWS0N7alQwk5cFjPGlowuirmLrVNsHWuur2k5k5KmsvRySJO3m5D9XzZ1bGb7fufWCkpZ6kfYNm1j1OjCG751idenpqFdrc0dB8qP9Eo6RpzbhFFXCJIk1Ryr3btn34JF8+I+Xjx2BH4yMiLlH1YG2yNevwqccplyIP9/XU3T7u2VakpuH+5u8RoaNIegLkIaIF23EL7/dnnjiUDPuG6GyBdBcSKUiLPhtOkv72TbiBiGueWNT8XkLT2gaxkJ6ac+YT2VizK93b1B6Vrm1va0wX8OpLvcuG4b+v++FKsaCzQdWg0IGo6bl44Bbmlq/98Xd8TNOCqCih8USV6vZ+uW7Z/u2jN33gXZMyLvvr6r6kBtkkwkQm2aV+Bdfccyj1dBK0+SxPrjLa+98hcWs78hCETXDEEUhuCKOguxCgWJDIknsR31oBsQMXSjh5dKOP5TSR+9t2/znz/x+lLv+Uc3eNMYF7j2qU11NS3x5BoRQJHBb0EYJ55lWk89+cx/PP3rvOEfeEoGHfuq/qXfb05WomTH57LM0SXjvvGdpV1forh/643NHW3uwdBuYmDajNIV37n06Jf10uDXHQSRVFZV1DWf6GVHTJ0xIQGexDUPx2hWYGLZhLnz5pwyG23K8Z8qOlRR/fS/veoE/JPTLTrwpWc3b3l9ty++CkUXQJQh34SQCR2qRz24/9BjD//mwV8+EHebMJ2ENstvf/5iW3NQTcYpFHdTvUODiA55MVa2Ozsl8URdQ1tbe2FhAf6pqPJtd98w5Nc99rOnj2zaLykuz0B74QiXpzJ0nuin1B5zBIeVs+npstf/3/XBgUfufr4jEDnNruUxTeu5J/68fs07/WccEMHrHnZ2TE2/3/d/m7f9y70PNTe1ZLDmRw/XPXzXc1UHjqsDmmOkn3McXd8zCyIaNGnQgJ5XL/hHd0AlSaqtOb75zfeS1IJOnsdr6955c8vw2W1/t7zmSH1Oz0+p+0IIpVlhzNTXNW184b13XtuNilBRM2GhpMYJoIx+9knl+jWbD+6p9vo8/ds0CAAFCijYGjRT0FEE7Ni+845b/+F7t9+8/OtL0ShIZ390tAfffPWjP617P9ShO77YQP0TDXuK970bWER6+Fzuh/X0f/CfLDAcegN1/nO/XztpysR5Cy4ctq6T3GNmzOH57DrkOX/h3CFz27/nyLqn3hAl0YY4awoD1KRbSM+gwjfc4F+SfPwjW0rtF1945dvfXY0uTfqD8PF9mqbVVtfv/aRq38fVwRbTRUi6zX5RlJoam1958bUlly02dCMZKofYth1obTtcWbPnw6rDFY1AJZ/fk5i2ktAEQEGA6tECzefzYd0e/cW/r1/3PwsXz5s1e8bYsaPRI0jVYBGiazrK4oryqr07q5trQ6rHo3rkBPpQbG1pfXn9q8uv+JphGNAZzaKoirz1rfK2QEgSeyhMtJ+bGprefvNdvzefUFWW5LqaZiNEFDHfgFZRJOFQ+IF7Hrzq2uUI17w8/6Ca626mqgh71aMEW01VyGcQdHiGww/c++BV1yxfsOiiQfEkRNDDrGLX0S2vl0c0DZW/jU2QpaNHju3+cJ+hMeyi6sP1/URG4E81x45/suNzSwencFV/hVFSBIPBHVt3EabgWFcdqHGuyUueCCB/fcndYTiBfiY4+zpOjG3aUUfcFS9JoB7B9CmkwKv6hbRfNGZAexjq0CNFOGE/iKKYHAw5808RLI9g53mlAkXxDLZ3GdgWhLB6JoQomKgtTdNA2YRdhKZsygYLqy0KTCWmV2Y4IvmJLLnhLAo5fRjp2YfEzR8zHvuB2m6kY2eVGco1nHsULDQ8sUUqcYqJTqw+SgvJIiH0DrDV2ANYANUDznxhcOPCROf8T4kChS7wBCqEI8PgKYCMElmmIwWqokAhgh2CE47zQig1BcUq9kCRE7iFEs5NV9N9JjhnBxxPpxlfzWxRNkf1XdipuQYtYahnOOJUEI0CL4whOCKCkNwr6hzBrDhKRkQbTFZScMJgYPQj1mUJPKLoFRU1U6nGcaJgP6BHiu9X1CT0g5unxOlebJokeYWhZk9y1wILRPAqTqI0zUaTWLZ9MuuMkU/ViEjuHqRXkj0k4UUifESFQgsU1q0P8XF0ZGSn+TjXu3cCwT5H0YA+Dr7B6wU3E4y3K8xWAr8XMQtBG3SGysEHQ2iyi1iv6Nq5rt4cOk8cTQm8WEkRPbNoIloQ8M+oY4NtUyRsptqHC+mc2JPBB9FTgKKkiP0U7uqcESgsCGLekyeDJxXQcDwifI0CeZ3dkG70kZP5fISucxoZwr/ihVG0awuQDL9d4DZKPJllbFhNc4wIR0rmQafD3LlKlrIREdzKC4NaDsFKemL6MCoH4woRyUGmwk6tCgrdi+GDbgG1x7mdQTeZCN0WuYbBM2p1i91B6Iq2QgXyTx7HFfv3RGTIR3mRSGG3c3ySU8+unknJYEvQmd4r44Gcmc/J42QWTtVaYnKix13dKJIsHpE++pD1DSqZ9Fssmqwtucu5w+AZy0roNiJswMWIwRTGgnKChYe7/sfzYeVIJ5x+NWSZaDLLHLfsOgUkcNBz4nTG0v8LMACQYb2SD3Sn3wAAAABJRU5ErkJggg==";
//var base64Image = "iVBORw0KGgoAAAANSUhEDLLHLfsOgUkcNBz4nTG0v8LMACQYb2SD3Sn3wAAAABJRU5ErkJggg==";
