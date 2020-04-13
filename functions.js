var CX, CY, Q

function Id(arg){
    return document.getElementById(arg)
}

function Class(arg){
    return document.getElementsByClassName(arg)
}

function Tag(arg){
    return document.getElementsByTagName(arg)
}

var Logger = Id('log')
var Select = Id("district");

function Log(arg){
    var textNode = document.createTextNode('>> ' + arg)
    var text = document.createElement('p')
    text.appendChild(textNode)
    text.classList.add('logitem')
    Logger.appendChild(text)
}

function addDist(){

    Select.innerHTML = ''

    for (let i=0;i<10;i++){
        if (Number.isInteger(n/i) && i > 2){
            var option = document.createElement("option");
            option.text = i;
            option.value = i;
            Select.appendChild(option);
        }
    }
}