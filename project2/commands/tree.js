const fs=require('fs')
const path=require('path')

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

        let children=fs.readdirSync(targetPath)

        for(let i=0;i<children.length;i++)
        {
            let childPath=path.join(targetPath,children[i])
            treeHelper(childPath,indent+'\t')
        }
    }
}

module.exports={
    treeModule:tree
}