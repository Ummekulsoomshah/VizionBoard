const db=require('../../db/config')

const createFile=async(fileData)=>{
    const {fileName,data}=fileData
     const jsonData = JSON.stringify(data);
    console.log('filedata',fileData)
    try {
        const [result]=await db.query('insert into json_files(file_name,data) values(?,?)',[fileName,jsonData])
        return {id:result.insertId}
    } catch (error) {
        throw new Error(error)
    }
}
module.exports=createFile