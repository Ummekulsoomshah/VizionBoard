const db=require('../../db/config')

const fetchFiles=async()=>{
    try {
        const [rows]=await db.query('SELECT * FROM json_files')
        return rows
    } catch (error) {
        throw new Error('error',error)
    }
}
module.exports=fetchFiles