const fetchFiles=require('../../../lib/file/fetchFiles')

const getFiles=async(req ,res ,next)=>{
    try {
        const filesData=await fetchFiles()
        res.status(200).json({
            message:"files fetched successfully",
            filesData
        })
    } catch (error) {
        next(error)
    }
}
module.exports=getFiles