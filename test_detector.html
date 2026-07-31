<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Detector测试</title>
</head>

<body>

<h3>背包识别测试</h3>

<input type="file" id="file">

<br><br>

<canvas id="canvas"></canvas>

<pre id="out"></pre>


<script src="js/detector.js"></script>


<script>

let file=document.getElementById("file");

let canvas=document.getElementById("canvas");

let out=document.getElementById("out");


let img=new Image();


file.onchange=function(e){

    let reader=new FileReader();


    reader.onload=function(){

        img.onload=function(){

            canvas.width=img.width;
            canvas.height=img.height;


            let ctx=canvas.getContext("2d");

            ctx.drawImage(img,0,0);


            // 调用检测

            let map=
            Detector.splitCells(canvas);


            out.textContent=
            JSON.stringify(
                map,
                null,
                2
            );


        }


        img.src=reader.result;

    }


    reader.readAsDataURL(
        e.target.files[0]
    );

}

</script>


</body>
</html>
