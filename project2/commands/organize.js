const fs=require('fs')
const path=require('path')

let types = {media: ["mp4", "mkv", "mp3","jpeg","png"],
archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
documents: ["docx","doc","pdf","xlsx","xls","odt","ods","odp","odg","odf","txt","ps","tex",],
app: ["exe", "dmg", "pkg", "deb"],};

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

module.exports={
    organizefnModule:organizefn
}