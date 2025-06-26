const createFile=require('../../../lib/file/createFile')

const submittFile=async(req ,res ,next)=>{
    const {fileName,data}=req.body
    const filedata={
        fileName,data
    }
    try {
        const response=await createFile(filedata)
        res.status(201).json({
            message:"file stored in db"
        })
    } catch (error) {
       next(error)
    }
}
module.exports=submittFile