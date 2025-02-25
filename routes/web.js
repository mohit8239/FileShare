import express from 'express'
const router = express.Router()
import Main from '../controllers/main.js'

router.post('/',Main.Uploading)
router.get('/:uuid',Main.Downloading)

export default router