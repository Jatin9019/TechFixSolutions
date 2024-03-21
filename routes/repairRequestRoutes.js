import express from 'express'
import { checkAssignedTaskController, deleteRepairRequest, postRepairRequests, showIndividualRepairRequest, showRepairRequests, technicianWork, updateRepairRequests } from '../controllers/repairRequestsController.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get("/showRepairReqests",requireSignIn,showRepairRequests)
router.get("/showRepairReqest/:userID",showIndividualRepairRequest)
router.get("/showTechnicianWork/:technicianID",technicianWork)
router.post("/postRepairRequests",requireSignIn,postRepairRequests)
router.put("/updateRepairRequest/:complaintID",requireSignIn,updateRepairRequests)
router.post("/checkAssignedTask",requireSignIn,isAdmin,checkAssignedTaskController)
router.delete("/deleteRepairRequest/:complaintID",requireSignIn,deleteRepairRequest)
export default router