const fetchFile=require('../../../lib/file/fetchFile')

const getFile=async(req ,res ,next)=>{
    try {
        const fileId=req.params.fileId
        const fileData=await fetchFile(fileId)
        res.status(200).json({
            message:"file fetched successfully",
            fileData
        })
    } catch (error) {
        next(error)
    }
}
module.exports=getFile