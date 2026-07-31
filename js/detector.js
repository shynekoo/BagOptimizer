// detector.js
// 背包格子检测模块


const Detector = {

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

        let ctx=canvas.getContext("2d");

        let cellW=this.bag.w/this.cols;
        let cellH=this.bag.h/this.rows;


        let cells=[];


        for(let r=0;r<this.rows;r++){

            let row=[];

            for(let c=0;c<this.cols;c++){

                let x=this.bag.x+c*cellW;
                let y=this.bag.y+r*cellH;


                let img=ctx.getImageData(
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



    // 判断格子类型
    classify(img){

        let data=img.data;


        let light=0;
        let dark=0;
        let count=0;


        for(let i=0;i<data.length;i+=4){

            let r=data[i];
            let g=data[i+1];
            let b=data[i+2];


            let avg=(r+g+b)/3;


            if(avg>150)
                light++;

            else
                dark++;


            count++;
        }


        let ratio=light/count;



        // TODO:
        // 这里后续根据真实截图调整


        // 未解锁格
        if(ratio<0.25){

            return 2;
        }


        // 空格
        if(ratio>0.65){

            return 0;
        }


        // 有物品
        return 1;
    },





    // 寻找物品连通区域
    findObjects(map){


        let visited=
        Array.from(
            {length:this.rows},
            ()=>Array(this.cols).fill(false)
        );


        let result=[];


        const dirs=[
            [1,0],
            [-1,0],
            [0,1],
            [0,-1]
        ];



        for(let r=0;r<this.rows;r++){

            for(let c=0;c<this.cols;c++){


                if(
                    map[r][c]!=1 ||
                    visited[r][c]
                )
                    continue;



                let queue=[
                    [r,c]
                ];

                visited[r][c]=true;


                let cells=[];



                while(queue.length){


                    let [x,y]=queue.shift();


                    cells.push([x,y]);



                    for(let d of dirs){


                        let nx=x+d[0];
                        let ny=y+d[1];


                        if(
                            nx>=0 &&
                            nx<this.rows &&
                            ny>=0 &&
                            ny<this.cols &&
                            map[nx][ny]==1 &&
                            !visited[nx][ny]
                        ){

                            visited[nx][ny]=true;

                            queue.push(
                                [nx,ny]
                            );
                        }
                    }
                }


                result.push(cells);
            }
        }


        return result;
    }


};
