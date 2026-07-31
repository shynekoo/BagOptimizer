// objectDetector.js
// 物品区域拆分模块


const ObjectDetector = {


    rows:6,
    cols:7,


    // 四方向
    dirs:[
        [1,0],
        [-1,0],
        [0,1],
        [0,-1]
    ],



    // 主入口
    detect(map){


        let objects=[];


        let visited=
        Array.from(
            {length:this.rows},
            ()=>Array(this.cols).fill(false)
        );



        for(let r=0;r<this.rows;r++){

            for(let c=0;c<this.cols;c++){


                // 不是物品
                if(
                    map[r][c]!=1 ||
                    visited[r][c]
                )
                    continue;



                let cells=
                this.bfs(
                    map,
                    r,
                    c,
                    visited
                );


                let shape=
                this.cellsToShape(
                    cells
                );



                objects.push({

                    cells:cells,

                    shape:shape

                });


            }
        }


        return objects;

    },





    // BFS寻找连通块
    bfs(map,r,c,visited){


        let queue=[
            [r,c]
        ];


        visited[r][c]=true;


        let result=[];



        while(queue.length){


            let [x,y]=queue.shift();


            result.push([
                x,
                y
            ]);



            for(let d of this.dirs){


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

                    queue.push([
                        nx,
                        ny
                    ]);

                }

            }

        }


        return result;

    },





    // 坐标转shape
    cellsToShape(cells){


        let minR=999;
        let maxR=-1;

        let minC=999;
        let maxC=-1;



        cells.forEach(([r,c])=>{


            minR=Math.min(minR,r);
            maxR=Math.max(maxR,r);

            minC=Math.min(minC,c);
            maxC=Math.max(maxC,c);


        });



        let shape=[];



        for(
            let r=minR;
            r<=maxR;
            r++
        ){

            let line="";


            for(
                let c=minC;
                c<=maxC;
                c++
            ){

                let exist=
                cells.some(
                    x=>
                    x[0]==r &&
                    x[1]==c
                );


                line+=exist?"1":"0";

            }


            shape.push(line);

        }


        return shape;

    }


};
