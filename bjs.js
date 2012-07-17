$(function(){
	BJS = {};

	BJS.get = function(url, params, callback) {
		$.each(params,function(i,val){
			params[i]=params[i].toUpperCase();
		});
		jQuery.ajax({
			url : url,
			type : "GET",
			cache : false,
			data : params,
			success : callback
		});
	}

	BJS.post = function(url, params, callback) {
		$.each(params,function(i,val){
			params[i]=params[i].toUpperCase();
		});
		jQuery.ajax({
			url : url,
			type : "POST",
			cache : false,
			data : params,
			success : callback
		});
	}

	BJS.JSON = function(url, params, callback) {
		$.each(params,function(i,val){
			params[i]=params[i].toUpperCase();
		});
		jQuery.ajax({
			url : url,
			type : "GET",
			cache : false,
			dataType : "json",
			data : params,
			success : callback
		});
	}

	BJS.JSONP = function(url, params, callback) {
		$.each(params,function(i,val){
			params[i]=params[i].toUpperCase();
		});
		jQuery.ajax({
			url : url,
			type : "POST",
			cache : false,
			dataType : "json",
			data : params,
			success : callback
		});
	}
	BJS.setParam = function(param, value,withUrl) {
		/* añande o modifica un parametro de la forma param:value */
		var url = (typeof(withUrl) == 'undefined' || typeof(withUrl) == null )? document.URL : withUrl;
		var params = url.substring(url.indexOf("/", 0));
		if (params.substring(0, 2) == "//") {
			params = params.substring(params.indexOf("/", 2));
		}
		if (params.slice(-1) != "/") {
			params += "/";
		}
		paramInUrl = params.indexOf(param + ":");// desde donde esta el
		// parametro
		if (paramInUrl >= 0) {
			var indexValue = paramInUrl + param.length + 1/*
															 * incluyo los dos
															 * puntos
															 */;
			var urlTillValue = params.substring(0, indexValue);
			var newValue = params.substring(indexValue, params.indexOf("/",
					paramInUrl));
			var urlAfterValue = params.substring(indexValue + newValue.length);
			return urlTillValue + value + urlAfterValue;
		} else {
			return params + param + ":" + value+'/';
		}
	}
	BJS.removeParam = function(param, withUrl) {
		/* añande o modifica un parametro de la forma param:value */
		var url = (typeof(withUrl) == 'undefined' || typeof(withUrl) == null )? document.URL : withUrl;
		var params = url.substring(url.indexOf("/", 0));
		if (params.substring(0, 2) == "//") {
			params = params.substring(params.indexOf("/", 2));
		}
		
		var initParamInString = params.indexOf(param,0);
		if(initParamInString < 0){
			return params;
		}
		var endParamInString = params.indexOf('/',initParamInString);
		if( endParamInString < 0){
			cosole.log('al final');
			endParamInString = params.length;
		}
		var paramsWithouParam = params.substring(0,initParamInString)+params.substring(endParamInString + 1);
	
		return paramsWithouParam;
	}
	BJS.updateSelect = function($select, $address, $callback){
		$select.html('');
		firstArguments = arguments;
		var selected= $select.attr('val')?$select.attr('val'):false;
		BJS.JSON($address,{},function(options){
			var count=0;
			var objectSize= BJS.objectSize(options);
			$select.append('<option value="">Seleccione..</option>');
			if(objectSize){
				
				$.each(options,function(i,val){
					if(selected && i==selected){
						$select.append('<option value="'+i+'" selected="selected">'+val+'</option>');
					}else{
						$select.append('<option value="'+i+'">'+val+'</option>');
					}
					
					count += 1;
					if(firstArguments.length == 3 && count ==  objectSize){
							if($callback) $callback();
					}
					
				});	
			}else{
				$select.html('');
				$select.append('<option value="">Seleccione..</option>');
				if($callback){
					$callback()
				};
			}
		});	
	}
	BJS.updateSelect2 = function($select, $address, $callback){
		$select.html('');
		firstArguments = arguments;
		var selected= $select.attr('val')?$select.attr('val'):false;
		BJS.JSON($address,{},function(options){
			var count=0;
			var objectSize= BJS.objectSize(options);
			if(objectSize){
				
				$.each(options,function(i,val){
					if(selected && i==selected){
						$select.append('<option value="'+i+'" selected="selected">'+val+'</option>');
					}else{
						$select.append('<option value="'+i+'">'+val+'</option>');
					}
					
					count += 1;
					if(firstArguments.length == 3 && count ==  objectSize){
							if($callback) $callback();
					}
					
				});	
			}else{
				$select.html('');
				$select.append('<option value="">Seleccione..</option>');
				if($callback){
					$callback()
				};

			}
		});	
	}
	BJS.objectSize = function(obj) {
	    var size = 0, key;
	    for (key in obj) {
	        if (obj.hasOwnProperty(key)) size++;
	    }
	    return size;
	};
	BJS.formatNumber = function(num){
		if(!isNaN(num)){
		num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
		num = num.split('').reverse().join('').replace(/^[\.]/,'');
		return num;
		}
		
	};
	BJS.formatComma = function(num){
		var posLastPoint=num.lastIndexOf('.');
		if(posLastPoint > 0 && (num.length - posLastPoint) < 4){
			var devolver=num.substring(0,posLastPoint)+","+num.substring(posLastPoint+1,num.length);
			if((num.length - posLastPoint)== 2 ){
				devolver+='0';
			}
			return devolver;
		}else{
			return num+',00';
		}
		
	}
	
	BJS.verificarFechaMayorOIgual= function(fecha, fecha2){
		var xMes=fecha.substring(5, 7);
		var xDia=fecha.substring(8, 10);
		var xAnio=fecha.substring(0,4);
		var yMes=fecha2.substring(5, 7);
		var yDia=fecha2.substring(8, 10);
		var yAnio=fecha2.substring(0,4);
		if (xAnio > yAnio){
			return(true);
		}else{
			if (xAnio == yAnio){
				if (xMes > yMes){
		      		return(true);
				}
		 		if (xMes == yMes){
					if (xDia > (yDia-1)){
						return(true);
					}else{
						return(false);
					}
				}else{
					return(false);
				}
			}else{
				return(false);
			}
		}
	}
});
