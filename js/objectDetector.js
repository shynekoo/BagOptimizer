// objectDetector.js
// 根据背景颜色分割物品


window.ObjectDetector={


    rows:6,
    cols:7,


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
                    this.getState(map[r][c])!==1
                    ||
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


                    cells.push(
                        [x,y]
                    );



                    for(let d of dirs){


                        let nx=x+d[0];
                        let ny=y+d[1];



                        if(
                            nx<0||
                            nx>=this.rows||
                            ny<0||
                            ny>=this.cols
                        )
                            continue;



                        if(
                            visited[nx][ny]
                        )
                            continue;



                        if(
                            this.getState(map[nx][ny])!==1
                        )
                            continue;




                        // 关键:
                        // 比较背景颜色

                        let distance=
                        this.colorDistance(
                            map[x][y].bgColor,
                            map[nx][ny].bgColor
                        );



                        // 阈值
                        if(distance<50){


                            visited[nx][ny]=true;


                            queue.push(
                                [nx,ny]
                            );

                        }


                    }


                }



                result.push(
                    this.normalize(cells)
                );


            }

        }


        return result;


    },




    getState(cell){

        return cell.state;

    },




    colorDistance(a,b){


        let dr=a[0]-b[0];
        let dg=a[1]-b[1];
        let db=a[2]-b[2];


        return Math.sqrt(
            dr*dr+
            dg*dg+
            db*db
        );

    },





    normalize(cells){


        let minR=Math.min(
            ...cells.map(x=>x[0])
        );


        let maxR=Math.max(
            ...cells.map(x=>x[0])
        );


        let minC=Math.min(
            ...cells.map(x=>x[1])
        );


        let maxC=Math.max(
            ...cells.map(x=>x[1])
        );



        let shape=[];



        for(
            let r=minR;
            r<=maxR;
            r++
        ){

            let row="";


            for(
                let c=minC;
                c<=maxC;
                c++
            ){


                let ok=cells.some(
                    x=>
                    x[0]===r &&
                    x[1]===c
                );


                row+=ok?"1":"0";


            }


            shape.push(row);

        }



        return {

            cells,

            size:cells.length,

            shape

        };

    }


};
