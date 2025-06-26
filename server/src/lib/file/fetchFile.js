const db=require('../../db/config')

const fetchFiles=async(fileId)=>{
    try {
        const [result]=await db.query('SELECT * FROM files where id=?', [fileId])
        return result.rows
    } catch (error) {
        throw new Error('Error fetching files from the database')
    }
}
module.exports=fetchFiles