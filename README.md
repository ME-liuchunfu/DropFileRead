# DropFileRead
html5可拖拽文件读取，上传

使用简单，只需要引入js文件夹下的dropfileread.js，然后在html实例化对象即可，
~~~javascript
  new DropFileRead({
      id: "spring-dialog-drop",
      dropClass: "a1",
      dropDomContent: "a2",
      dropTipClass: "a3",
      callback: function(files, e){
        var file = e.dataTransfer.files;//获取外部拖拽的文件
        for (var i=0;i<file.length ; i++){
          var read = new FileReader();//新建一个读取文件对象
          read.readAsDataURL(file[i]);//读取拖拽进来的文件
          console.log(file, read);
          read.onload = function(){//读取文件完成之后触发
            //alert(this.result);//弹出读取到的数据
            console.log(this.result);
            var img = document.createElement("img");//创建一个img标签
            img.src = this.result;//把读取到的数据赋值给src
            document.body.appendChild(img);
          }
        }
      }
    });
~~~

