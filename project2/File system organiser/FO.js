const fs=require('fs')
const path=require('path')

let types = {media: ["mp4", "mkv", "mp3","jpeg","png"],
archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
documents: ["docx","doc","pdf","xlsx","xls","odt","ods","odp","odg","odf","txt","ps","tex",],
app: ["exe", "dmg", "pkg", "deb"],};

let input=process.argv.slice(2)

let inputArr=input // consist of command and file path

let command=inputArr[0]

switch(command){
    case 'tree':
        console.log('Tree Implemented')
        tree(inputArr[1])
        break
    case 'organize':
        organizefn(inputArr[1])// always pass path in inside ('') this 
        console.log('Organize Implemented')
        break
    case 'help':
        console.log('Help Implemented')
        helpfn();
        break
    default:
        console.log('Invalid Command')
}

function helpfn()
{
    console.log(`List of all the commands->
                                 1)Tree - node FO.js tree <dirPath>
                                 2) organize - node FO.js organize <dirPath>
                                 3)help - node FO.js help`);

}

function organizefn(dirpath)
{
    let destPath;
    //console.log(path)
    if(dirpath==undefined)
    {
        console.log("Please enter a valid Directory path")
        return
    }

    let doesExsist=fs.existsSync(dirpath)

    if(doesExsist==true)
    {
        destPath=path.join(dirpath,'organizes_files')
        if(fs.existsSync(destPath)==false)
        {
            fs.mkdirSync(destPath)
        }
        else
        {
            console.log("Folder Exsists")
        }
    }
    else
    {
        console.log("Enter Valid Path")
        return;
    }

    organizeHelper(dirpath,destPath);

}

function organizeHelper(src,dest)
{
    let childName=fs.readdirSync(src);
    //console.log(childName);

    for(let i=0;i<childName.length;i++)
    {
        // getting path of the each files present in the folder
        let childAddress=path.join(src,childName[i])

        // from above command we get all files and directory but we want only files
        // so first we check each item of array wether it is file and directory
        let isFile=fs.lstatSync(childAddress).isFile()

        if(isFile==true)
        {
            let fileCategory=getCategory(childName[i]);
            console.log('file belongs to '+fileCategory);
            sendFile(childAddress,dest,fileCategory);
        }
    }
}

function getCategory(fileName)
{
    let ext=path.extname(fileName);
    // to remove dot
    ext=ext.slice(1);
    
    // matching the extension and returning the type
    for(let key in types)
    {
        let typeArr=types[key]
        for(let i=0;i<typeArr.length;i++)
        {
            if(ext==typeArr[i])
            {
                return key;
            }
        }
    }
    return 'others'
}

function sendFile(src,dest,category)
{
    let catPath=path.join(dest,category);

    // check whether directory exsist or not
    // if not then create it
    if(fs.existsSync(catPath)==false)
    {
        fs.mkdirSync(catPath)
    }

    // now adding file to category wise folder
    let fileName=path.basename(src)
    let destFilePath=path.join(catPath,fileName)
    fs.copyFileSync(src,destFilePath);
    fs.unlinkSync(src)
}

// implementation of tree functionality
function tree(dirPath)
{
    if(dirPath==undefined)
    {
        console.log("Enter valid path")
        return
    }
    else if(fs.existsSync(dirPath)==false)
    {
        console.log("Path does not exsist")
        return
    }
    else if(fs.existsSync(dirPath)==true)
    {
        treeHelper(dirPath,' ')
    }
}

function treeHelper(targetPath , indent)
{
    let isFile=fs.lstatSync(targetPath).isFile()

    if(isFile==true)
    {
        let fileName=path.basename(targetPath)
        console.log(indent+'├──'+ fileName)
    }
    else
    {
        let dirName=path.basename(targetPath)
        console.log(indent+"└──"+dirName)

        let children=fs.readFileSync(targetPath)

        for(let i=0;i<children.length;i++)
        {
            let childPath=path.join(targetPath,children[i])
            treeHelper(childPath,indent+'\t')
        }
    }
}