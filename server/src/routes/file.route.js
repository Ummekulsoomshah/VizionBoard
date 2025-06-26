const router=require('express').Router()
const submittFile=require('../api/v1/file/submittFile')
const getFiles=require('../api/v1/file/getFiles')
const getFile=require('../api/v1/file/getFile')

router.post('/uploadFile',submittFile)
router.get('/get-all-files',getFiles)
router.get('/get-all-files/:fileId',getFile)

module.exports=router