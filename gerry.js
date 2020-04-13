// Syntax: [(party), (group #), (preferability score)]
var Grid = [[0,null, 0]]

// Initialize variables

var edges = []

for (let i=0;i<Grid.length;i++){
    for (let j=0;j<Grid[0].length;j++){
        if (i == 0 || i == Grid.length-1){
            edges.push([i,j])
        }
        if (j == 0 || j == Grid[0].length-1){
            edges.push([i,j])
        }
    }
}

var UNDERWAY = false
// Set Up Grid

var rows = Id('rows')
var cols = Id('cols')
var district = Id('district')
var favor = Id('favor')
var threshold = Id('threshold')

function applyGrid(){

    if (!UNDERWAY){

        Grid = []

        for (let i=0;i<rows.value;i++){
    
            Grid.push([])
    
            for (let j=0;j<cols.value;j++){
    
                Grid[i].push([0,null, 0])
            }
        }

        n = rows.value * cols.value
        addDist()

    }else{

        alert('The system is currently running. Please cancel it before modifying the grid.')
    }
    
}

applyGrid()


var r = edges[Math.floor(Math.random()*edges.length)]

setTimeout(()=>{
    c = [r[0], r[1]]
},100)

var group = 0
var districts = 5
var n = Grid.length * Grid[0].length
var blocks = 0
var perDistrict = n/districts
var List = [[]]
var tries = 0
var restart = false
var order = 0
var done = false
var nx = 0;
var delay = 1;
var attempts = 0
var Iterations = []

var Trials = 10



function Clear(){

    for (let i=0;i<Grid.length;i++){

        for (let j=0;j<Grid[0].length;j++){

            Grid[i][j][1] = null
            Grid[i][j][2] - 0
        }
    }
    assignScores()

    if (attempts == 0){
        blocks = 1
    }else{
        blocks = 0
    }
   
    group = 0
    order = 0
    restart = true
    List = [[]]

    //c = [ Math.random()>0.5? 0: Grid.length -1 , Math.random()>0.5? 0: Grid[0].length -1 ]
    c = [ Math.floor(Math.random()*Grid.length), Math.floor(Math.random()*Grid[0].length) ]

    console.log('try again')

}

function checkGrouped(){

    var grouped = 0

    for (let i=0;i<Grid.length;i++){

        for (let j=0;j<Grid[0].length;j++){

            if (Grid[i][j][1] != null){

                grouped ++
            }
        }
    }

    return grouped
}

// In case of "islands"
function newStart(){

    UNDERWAY = true

   Clear()
   delay += 300

    setTimeout(()=>{

        restart = false
        
        Initiate()
    }, 2000)

}

// Assigns preferability scores to all squares
function assignScores(){

    for (let i=0; i<Grid.length;i++){

        for (let j=0;j<Grid[0].length;j++){

            if (Grid[i][j][1] == null){

                var count = 0

                    // 1 neighbor = 1 point
                    if (i < Grid.length-1 && Grid[i+1][j][1] != null){
                        count ++
                    }
                    if (i > 0 && Grid[i-1][j][1] != null){
                        count ++
                    }
                    if (j < Grid[0].length-1 && Grid[i][j+1][1] != null){
                        count ++
                    }
                    if (j > 0 && Grid[i][j-1][1] != null){
                        count ++
                    }
                    // 1 edge = 1 point
                    if (i == 0){
                        count ++
                    }
                    if (i == Grid.length-1){
                        count ++
                    }
                    if (j == 0){
                        count ++
                    }
                    if (j == Grid[0].length - 1){
                        count ++
                    }

                Grid[i][j][2] = count
                
            }
        } 
    }
}

// Pick optimal next step
function evaluateNeighbors(){

    var neighbors = []
    var counts = []
    var matches = []
    var result;

    if (c){
        // Gather all legitimate neighbors
        if (c[0] < Grid.length -1 && Grid[c[0]+1][c[1]][1] == null ) {
            neighbors.push([c[0]+1, c[1]])
        }
        if (c[1] < Grid[0].length -1 && Grid[c[0]][c[1]+1][1] == null ) {
            neighbors.push([c[0], c[1]+1])
        }
        if (c[0] > 0 && Grid[c[0]-1][c[1]][1] == null ) {
            neighbors.push([c[0]-1, c[1]])
        }
        if (c[1] > 0 && Grid[c[0]][c[1]-1][1] == null ) {
            neighbors.push([c[0], c[1]-1])
        }
    }else{

        if (List[group].length > 1){

            c = List[group][blocks-2]
            tries ++

        }else{
            c = List[group-1][List[group-1].length-1]
            console.log('end group')
            tries ++
        }
    }

   
    // If there are no legitimate neighbors
    if (neighbors.length == 0){

        if (List[group].length > 1){

            c = List[group][blocks-2]
   
            tries ++

        }else{
            c = List[group-1][List[group-1].length-1]
            console.log('end group')
            tries ++
        }

        if (tries > 6){

            return null;
        }

    }else{

        tries = 0;
    }

    // Send scores for evaluation
    for (let i=0; i<neighbors.length;i++){
        counts.push(Grid[neighbors[i][0]][neighbors[i][1]][2])
    }

    // Determine highest score(s)
    var max = Math.max(...counts)

    // Identify which neighbor(s) the highest score came from
    for (let i=0; i<neighbors.length;i++){
        if (Grid[neighbors[i][0]][neighbors[i][1]][2] == max){

            matches.push([neighbors[i][0], neighbors[i][1]])
        }
    }

    result = matches[Math.floor(Math.random()*matches.length)];

    if (max != 0){

        return result;
    }else{

        return null;
    }
    
}

// The first iteration is more random
function firstIteration(){

    Grid[c[0]][c[1]][1] = group
    var adjacents = []

    // Gather all legitimate neighbors
    if (c[0] < Grid.length -1 && Grid[c[0]+1][c[1]][1] == null ) {
        adjacents.push([c[0]+1, c[1]])
    }
    if (c[1] < Grid[0].length -1 && Grid[c[0]][c[1]+1][1] == null ) {
        adjacents.push([c[0], c[1]+1])
    }
    if (c[0] > 0 && Grid[c[0]-1][c[1]][1] == null ) {
        adjacents.push([c[0]-1, c[1]])
    }
    if (c[1] > 0 && Grid[c[0]][c[1]-1][1] == null ) {
        adjacents.push([c[0], c[1]-1])
    }

    var rand = Math.floor(Math.random()*adjacents.length)

    var final = adjacents[rand]

    if (final){
        Grid[final[0]][final[1]][1] = group
        List[group].push(final)
        
        c = [final[0], final[1]]
        blocks++
        order ++

    }else{
        newStart()
    }
    

   
}

// Adding one more block to current group
function plusOne(){

    assignScores()

    if (evaluateNeighbors){

        var response = evaluateNeighbors()

        if (response){
            Grid[response[0]][response[1]][1] = group
            c = [response[0], response[1]]
            List[group].push(c)
    
        }else{

            if (nx != n){
                attempts ++
                newStart()
                Log('redirecting...')
                console.log('no neighbors')

            }else{
                if (times == 1){
                    saveIteration()
                }
              
                console.log('iteration saved')
            }

            
        } 
   }

    blocks ++
}

function Initiate(){

    done = false

    setTimeout(()=>{
        for (let v=0;v<50;v++){

            if (!restart && !done){
                (v =>{
                    setTimeout(()=>{
                        if (!done){
                            if (group == 0){
                                firstIteration()
                            }else{
                        
                                plusOne()
                            }
                        }}
                    , v*100+delay)

                })(v)
               
            }else{
                break;
            }
        }

    },200)
    

}

var Box = Id('box')


// Horizontal
if (Grid.length == districts){

    var horizontal = []
    
    for (let i=0;i<districts;i++){

        horizontal.push([])

        for (let j=0;j<Grid[0].length;j++){

            horizontal[i].push([Grid[i][j][0], i, 0])
        }
    }

    Iterations.push(horizontal)
}

// Vertical
if (Grid[0].length == districts){

    var vertical = []

    for (let i=0;i<Grid.length;i++){

        vertical.push([])

        for (let j=0;j<Grid[0].length;j++){

            vertical[i].push([Grid[i][j][0], j, 0])
        }
    }

    Iterations.push(vertical)
}

var Results=  []

// Constantly updating certain variables
const loop = () => {
    
    nx = checkGrouped();
    n = Grid.length * Grid[0].length;
    districts = district.value;
    Bias = favor.value;
    Trials = threshold.value;
    perDistrict = n/districts;
    Logger.scrollTop = Logger.scrollHeight;

    if (favor.value == 1){
        favorbox.classList.add('blue')
        for (let i=0; i<Tag('button').length;i++){
            Tag('button')[i].classList.add('blue')
        }
        Id('title').classList.add('blue')
    }else{
        favorbox.classList.remove('blue')
        for (let i=0; i<Tag('button').length;i++){
            Tag('button')[i].classList.remove('blue')
        }
        Id('title').classList.remove('blue')
    }

    if(UNDERWAY){

        favor.disabled = true
        district.disabled = true
        rows.disabled = true
        cols.disabled = true
        threshold.disabled = true
    }else{
        favor.disabled = false
        district.disabled = false
        rows.disabled = false
        cols.disabled = false
        threshold.disabled = false
    }

    for (let i=0;i<Results.length;i++){
        if (Results[i].length > districts+1){
           
            Results.splice(i, 1)
            Iterations.splice(i,1)
            Log('error terminated')
        }
    }

    if (Number.isInteger(perDistrict)){

        if (blocks > perDistrict-1){

            group++
            blocks = 0
            List.push([])

        }
    }else{

        console.log('perDistrict is not an integer.')
    }

    if (nx == n){ 
        times ++
        done = true
        if (times == 1){
            saveIteration()
         
        }else if (times == 2){
            Log('ITERATION SAVED')
            Log(`${Results.length} Successful Iterations`)
            if (Results.length < Trials){
                newStart()
                countVotes()
            }else if (Results.length == Trials){

                UNDERWAY = false
                countVotes()
                selectBest()
                Log('DONE')
                Log(`Won ${W} out of ${districts} districts.`)
            }else{
                Log('Overflow Error. Please refresh the page & try again.')
            }
         
        }
      //  console.log(`Results.length: ${Results.length}`)
//        console.log(`Trials: ${Trials}`)
      //  console.log(`Iterations.length: ${Iterations.length}`)
        done = false
    
    }else{
        times = 0
    }
}

var times = 0

function saveIteration(){
   
    let newGrid = []

    for (let i=0;i<Grid.length;i++){
        newGrid.push([])
        for (let j=0;j<Grid[0].length;j++){

            newGrid[i].push([])

            newGrid[i][j][0] = Grid[i][j][0]
            newGrid[i][j][1] = Grid[i][j][1]
        }
    }
    Iterations.push(newGrid)
}

var Bias = 1

function countVotes(){

    Box.innerHTML = ''
    Results = []

    var texts = []

    for (let u=0;u<Iterations.length;u++){

        var entry =  Iterations[u]
        var dists = []
        var results = []

        for (let r=0;r<districts;r++){

            dists.push([])
        }

        for (i=0;i<entry.length;i++){

            for (let j=0;j<entry[0].length;j++){

                dists[entry[i][j][1]].push(entry[i][j][0])
              
            }
        }

        for (let y=0;y<dists.length;y++){

            var zero = 0
            var one = 0

            var dist = dists[y]

            for (let z=0;z<dist.length;z++){

                switch (dist[z]){

                    case 0:
                        zero++
                        break;
                    case 1:
                        one++
                        break;
                }
            }

            if (zero > one){
                results.push(0)
            }
            if (one>zero){
                results.push(1)
            }
            if (zero == one){

                results.push('tie')
            }    
            
            if (dist.length != perDistrict){

                results.push('X')
            }
        }


        if(results.length == districts){
            texts.push(results)
            Results.push([...results, entry])
        }
        

    }

    for (let i=0;i<texts.length;i++){

        var text = document.createTextNode(texts[i])
        var space = document.createElement('h3')
        space.appendChild(text)
        space.classList.add('result')
        Box.appendChild(space)
    }
}

var W;

function selectBest(){

    var numbers = []
    var votes = []
    var finals = []

    for (let i=0;i<Results.length;i++){
        if (Results[i].length-1 == districts){
            let wins = 0
            for (let j=0;j<Results[i].length;j++){
                if (Results[i][j] == Bias){
                    wins ++
                }
            }
            numbers.push([wins, i])
            votes.push(wins)
        }
    }

    var winner = Math.max(...votes)
    W = winner

    for (let i=0;i<numbers.length;i++){
        if (numbers[i][0] == winner){
            finals.push(Results[i])
        }
    }

    var result = finals[Math.floor(Math.random()*finals.length)]
    var champion = result[result.length-1]

    console.log(`Winner: ${winner}`)

    for (let i=0;i<Grid.length;i++){
        for (let j=0;j<Grid[0].length;j++){
            Grid[i][j][1] = champion[i][j][1]
        }
    }

}

// Call the loop 30 times per second
setInterval(loop, 10)

// Main "gateway" function, decides who to call
function Gerrify(){

    if (!done){
        if (group == 0){

            firstIteration()

        }else{
    
            plusOne()

        }
    }else{
        console.log('done, got it')
    }
}