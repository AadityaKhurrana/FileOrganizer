const tree=require('../commands/tree')
const organize=require('../commands/organize')
const help=require('../commands/help')


let inputArr=process.argv.slice(2)
//let inputArr=input // consist of command and file path
let command=inputArr[0]

switch(command){
    case 'tree':
        console.log('Tree Implemented')
        tree.treeModule(inputArr[1])
        break
    case 'organize':
       // always pass path in inside ('') this 
        organize.organizefnModule(inputArr[1])
        console.log('Organize Implemented')
        break
    case 'help':
        console.log('Help Implemented')
        help.helpFnKey();
        break
    default:
        console.log('Invalid Command')
}
