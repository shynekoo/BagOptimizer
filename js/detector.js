// detector.js
// 背包格子检测模块


window.Detector = {

    rows:6,
    cols:7,


    // 背包坐标
    bag:{
        x:95,
        y:1375,
        w:1090,
        h:925
    },



    // 分割格子

    splitCells(canvas){


        let ctx=canvas.getContext(
            "2d",
            {
                willReadFrequently:true
            }
        );


        let cellW=this.bag.w/this.cols;
        let cellH=this.bag.h/this.rows;


        let cells=[];



        for(let r=0;r<this.rows;r++){


            let row=[];


            for(let c=0;c<this.cols;c++){


                let x=
                this.bag.x+c*cellW;


                let y=
                this.bag.y+r*cellH;



                let img=
                ctx.getImageData(
                    x,
                    y,
                    cellW,
                    cellH
                );



                row.push(
                    this.classify(img)
                );

            }


            cells.push(row);

        }



        return cells;

    },





    /*
        返回:

        state:
        0 空格
        1 物品
        2 未解锁

    */


    classify(img){



        let data=img.data;


        let w=img.width;
        let h=img.height;



        /*
            获取背景颜色

            使用:
            左下
            右上

            避开:
            左上固定图案
            右下数字
        */


        let bgPoints=[

            [0.1,0.7],
            [0.25,0.85],

            [0.75,0.15],
            [0.9,0.3]

        ];



        let bgPixels=[];



        bgPoints.forEach(p=>{


            let x=
            Math.floor(w*p[0]);


            let y=
            Math.floor(h*p[1]);



            let index=
            (y*w+x)*4;



            bgPixels.push([

                data[index],
                data[index+1],
                data[index+2]

            ]);


        });





        let bgColor=[

            0,
            0,
            0

        ];



        bgPixels.forEach(p=>{


            bgColor[0]+=p[0];
            bgColor[1]+=p[1];
            bgColor[2]+=p[2];


        });



        bgColor=bgColor.map(
            x=>
            Math.round(
                x/bgPixels.length
            )
        );







        /*
            中心区域

            用于以后识别物品
        */


        let centerPixels=[];



        for(
            let y=Math.floor(h*0.35);
            y<h*0.65;
            y+=Math.max(
                1,
                Math.floor(h*0.1)
            )
        ){


            for(
                let x=Math.floor(w*0.35);
                x<w*0.65;
                x+=Math.max(
                    1,
                    Math.floor(w*0.1)
                )
            ){



                let index=
                (y*w+x)*4;



                centerPixels.push([

                    data[index],
                    data[index+1],
                    data[index+2]

                ]);

            }

        }






        let centerColor=[

            0,
            0,
            0

        ];



        centerPixels.forEach(p=>{


            centerColor[0]+=p[0];
            centerColor[1]+=p[1];
            centerColor[2]+=p[2];


        });



        centerColor=centerColor.map(

            x=>
            Math.round(
                x/centerPixels.length
            )

        );






        /*
            使用中心区域判断状态

        */


        let brightness=

        (
            centerColor[0]+
            centerColor[1]+
            centerColor[2]

        )/3;





        let variance=0;



        centerPixels.forEach(p=>{


            variance+=

            (p[0]-centerColor[0])**2+
            (p[1]-centerColor[1])**2+
            (p[2]-centerColor[2])**2;


        });



        variance/=centerPixels.length;





        let state;





        // 未解锁

        if(

            brightness<150 &&
            variance<800

        ){

            state=2;

        }



        // 物品

        else if(

            variance>1500

        ){

            state=1;

        }



        // 空格

        else{

            state=0;

        }






        return {


            state:state,


            // 背景颜色
            bgColor:bgColor,


            // 中心颜色
            centerColor:centerColor,


            brightness:
            Math.round(
                brightness
            ),



            variance:
            Math.round(
                variance
            )


        };


    }



};
