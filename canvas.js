const canvas = Id('canvas')
const ctx = canvas.getContext('2d')

const gerrify = Id('gerrify')
const votes = Id('votes')
const clear= Id('clear')
const apply = Id('apply')

var hovering = [null, null]

var Colors  = [
    '#c2c2c2',
    '#8a8a8a',
    '#545454',
    '#2b2b2b',
    '#dfdfdf',
    '#464646',
]

const CanvasLoop = () => {

    Resize()

    ctx.fillStyle = '#F0F0F0';
    ctx.fillRect(0,0,canvas.width, canvas.height);

    for (let i =0; i<Grid.length;i++){

        for (let j = 0; j<Grid[0].length; j++){

            if (Grid[i][j][1] == null){

                ctx.fillStyle = 'white'
            }else{
                ctx.fillStyle = Colors[Grid[i][j][1]]
            }
   
            ctx.fillRect( CX-(Grid[0].length/2-j)*Q, CY-(Grid.length/2-i)*Q, Q, Q )

            switch (Grid[i][j][0]){

                case 0:
                    ctx.fillStyle = 'red'
                    break;
                case 1:
                    ctx.fillStyle = 'royalblue'
                    break;
            }
            
            ctx.beginPath()
            ctx.arc(CX-(Grid[0].length/2-j)*Q+Q/2, CY-(Grid.length/2-i)*Q+Q/2, Q/10, 0, Math.PI*2)
            ctx.fill()
            
            if (i == hovering[0] && j == hovering[1]){

                if (!UNDERWAY){

                    if (Grid[i][j][0] == 1){
                        ctx.fillStyle = 'blue'
                    }else{
                        ctx.fillStyle = 'red'
                    }
                    
                    ctx.globalAlpha = 0.2
                    ctx.fillRect( CX-(Grid[0].length/2-j)*Q, CY-(Grid.length/2-i)*Q, Q, Q )
                    ctx.globalAlpha = 1

                }
               
            }
        }
    }
}

setInterval(CanvasLoop, 100/3)

function Resize(){

    canvas.width = window.innerWidth*0.4
    canvas.height = canvas.width;
    CX = canvas.width/2
    CY = canvas.height/2
    Q = canvas.width*0.5/Grid[0].length
}

var MX, MY

canvas.addEventListener('mousemove', e => {
    var rect = canvas.getBoundingClientRect();

    MX  = e.clientX - rect.left;
    MY = e.clientY - rect.top;

    for (let i=0;i<Grid.length;i++){
        for (let j=0;j<Grid[0].length;j++){
            if (MX > CX-(Grid[0].length/2-j)*Q &&
            MX < CX-(Grid[0].length/2-j)*Q + Q &&
            MY >CY-(Grid.length/2-i)*Q &&
            MY < CY-(Grid.length/2-i)*Q + Q){

                hovering = [i,j];


            }
        }
    }

})


canvas.addEventListener('mousedown', e =>{
    for (let i=0;i<Grid.length;i++){
        for (let j=0;j<Grid[0].length;j++){
            if (MX > CX-(Grid[0].length/2-j)*Q &&
            MX < CX-(Grid[0].length/2-j)*Q + Q &&
            MY >CY-(Grid.length/2-i)*Q &&
            MY < CY-(Grid.length/2-i)*Q + Q){
                    if (Grid[i][j][0] == 1){
                        Grid[i][j][0] = 0
                    }else{
                        Grid[i][j][0] = 1
                    }                  
            }
        }
    }
})



gerrify.onclick = () => {

    Log(`${cols.value} x ${rows.value} Grid, ${districts} Districts. Starting...`)
    
    newStart()

}

clear.onclick = () => {location.reload()}
apply.onclick = applyGrid