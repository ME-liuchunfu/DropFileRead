//========================================
//           可拖拽的文件上传插件
//            作者：liuchunfu
//            版本：v 1.0
//            使用方式： 引入dropfileread.js
//            new DropFileRead(option);即可
//            option配置：option是一个json对象
//            id: 自定义的节点容器id名称，默认是"spring-dialog-drop"
//            dropClass: 自定义的节点容器类名----> 可选
//            dropDomContent: 自定义的提示文字父容器类名----> 可选
//            dropDomTipClass: 自定义的提示文字容器类名----> 可选
//            callback: 读取回调函数： 参数为files文件列表， e--> event事件对象
//
//========================================

/**
	* 实例对象
	*/
	function DropFileRead(params){
		this.params = params || {};
		this.init();
	};
	
	/**
	* 初始化读取对象
	*/
	DropFileRead.prototype.init = function(){
		try{
			this.params['id'] = this.params['id'] || "spring-dialog-drop";
			this.dropDom = document.getElementById(this.params['id']);
			if(this.dropDom){
				// 存在先删除
				this.dropDom.parentNode.removeChild(this.dropDom);
			}
			this.dropDom = document.createElement("div");
			this.dropDom.id = this.params['id']
			this.dropDom.style.display = "none";
			this.dropDom.style.position = "fixed";
			this.dropDom.style.top = "0";
			this.dropDom.style.left = "0";
			this.dropDom.style.width = "100%";
			this.dropDom.style.height = "100vh";
			this.dropDom.style.minHeight = "300px";
			this.dropDom.style.zIndex = "999999";
			this.dropDom.style.backgroundColor = "rgba(0,0,0,.7)";
			if(this.params['dropClass']){
				this.dropDom.className = this.params['dropClass']
			}
			this.dropDomContent = document.createElement("div");
			this.dropDomContent.style.position = "absolute";
			this.dropDomContent.style.top = "50%";
			this.dropDomContent.style.left = "50%";
			this.dropDomContent.style.width = "500px";
			this.dropDomContent.style.height = "280px";
			this.dropDomContent.style.margin = "-140px 0 0 -250px";
			this.dropDomContent.style.borderRadius = "10px";
			this.dropDomContent.style.border = "1px solid #a99b91";
			if(this.params['dropDomContent']){
				this.dropDomContent.className = this.params['dropDomContent']
			}
			
			this.dropDomTip = document.createElement("p");
			if(this.params['dropTipClass']){
				this.dropDomTip.className = this.params['dropTipClass']
			}
			this.dropDomTip.style.fontSize = "14px";
			this.dropDomTip.style.lineHeight = "260px";
			this.dropDomTip.style.color = "#d8d8d8";
			this.dropDomTip.style.textAlign = "center";
			this.dropDomTip.style.height = "100%";
			this.dropDomTip.innerHTML = this.params['tipText'] || "请把文件放这里";
			
			this.dropDomContent.appendChild(this.dropDomTip);
			
			this.dropDomPanel = document.createElement("div");
			this.dropDomPanel.style.position = "absolute";
			this.dropDomPanel.style.zIndex = "9999999";
			this.dropDomPanel.style.top = "0";
			this.dropDomPanel.style.left = "0";
			this.dropDomPanel.style.width = "100%";
			this.dropDomPanel.style.height = "100%";
			this.dropDom.appendChild(this.dropDomContent);
			this.dropDom.appendChild(this.dropDomPanel);
			this.addEvent();
			document.body.appendChild(this.dropDom);
		}catch(e){
			this.log(e, 'e');
		}
	}
	
	/**
	* 事件监听
	*/
	DropFileRead.prototype.addEvent = function(){
		var that = this;
		document.addEventListener('dragenter', function(e){
			e = e || window.event;
			e.stopPropagation();
	      	e.preventDefault();
			that.dropDom.style.display = "block";
		},false);
		document.addEventListener('dragover', function(e){
			e = e || window.event;
			e.stopPropagation();
	      	e.preventDefault();
		},false);
		that.dropDomPanel.addEventListener('dragleave', function(e){
			e = e || window.event;
			e.stopPropagation();
	      	e.preventDefault();
			that.dropDom.style.display = "none";
		},false);
		document.addEventListener('drop', function(e){
			e = e||window.event;
			e.stopPropagation();
	      	e.preventDefault();
			that.dropDom.style.display = "none";
			that.params['callback'] && that.params['callback'].call(that, e.dataTransfer.files, e);
		},false);
	};
	
	/**
	* 日志打印
	*/
	DropFileRead.prototype.log = function(d, t){
		if(t === 'w'){
			window.console.wran(d);
		}else if(t === 'e'){
			window.console.error(d);
		}else if(t === 'd'){
			window.console.debug(d);
		}else{
			window.console.log(d);
		}
	};
