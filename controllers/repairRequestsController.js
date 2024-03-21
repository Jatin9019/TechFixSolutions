import repairRequests from "../models/repairRequests.js"

export const postRepairRequests = async(req,res) => {
    try{
        const {UserDetails,ServiceDetails,ProblemProductDetails,Comment,TypeOfServiceNeeded} = req.body;
        switch(true){
            case !UserDetails : return res.status(500).send({error: "User Details is Required"})
            case !ServiceDetails : return res.status(500).send({error: "Service Details is Required"})
            case !ProblemProductDetails : return res.status(500).send({error: "Problem product details is Required"})
            case !Comment : return res.status(500).send({error: "Comment is Required"})
            case !TypeOfServiceNeeded : return res.status(500).send({error: "Type of service needed is Required"})
        }
        
        const repair = await new repairRequests({UserDetails,ServiceDetails,ProblemProductDetails,Comment,TypeOfServiceNeeded}).save()
        
        await repair.save()
        res.status(201).send({
            success:true,
            message:"repair request is posted successfully",
            repair
        })
    }
    catch(error){
        res.status(500).send({
            success: false,
            message: "Error in posting repair request",
            error
        })
    }
}

export const showRepairRequests = async(req,res) => {
    try{
        const repairRequestsData = await repairRequests.find({}).populate("UserDetails").populate("TechnicianDetails").populate("ServiceDetails").populate("ProblemProductDetails");
        res.status(200).send({
            success: true,
            message: "All user complaints",
            repairRequestsData
        })
    }
    catch(error){
        res.status(500).send({
            success: false,
            message: "Error in posting repair request",
            error
        })
    }
}

export const updateRepairRequests = async(req,res) => {
    try{
        const {TechnicianID,TypeOfService,Status,commentOfTechnician,priceCharged} = req.body;
        const complaintID = req.params.complaintID;
        const complaintRequest = await repairRequests.findById(complaintID)
        const updatedModel = await repairRequests.findByIdAndUpdate(complaintID,{
            TechnicianDetails: TechnicianID || complaintRequest.TechnicianDetails,
            TypeOfServiceNeeded: TypeOfService || complaintRequest.TypeOfServiceNeeded,
            Status: Status || complaintRequest.Status,
            //TechnicianComment: "comment",
            //TotalPriceCharged: 40
            TechnicianComment: commentOfTechnician || complaintRequest.TechnicianComment,
            TotalPriceCharged: priceCharged || complaintRequest.TotalPriceCharged
        },{new:true})
        console.log(updatedModel)
        res.status(200).send({
            success: true,
            message: "Repair Request Updated successfully",
            updatedModel
        })
    }
    catch(error){
        res.status(500).send({
            success: false,
            message: "Update repair request failed"
        })
    }
}

export const deleteRepairRequest = async(req,res) => {
    try{
        const complaintID = req.params.complaintID;
        await repairRequests.findByIdAndDelete(complaintID)
        res.status(200).send({
            success: true,
            message: "Repair Request deleted successfully"
        })
    }
    catch(error){
        res.status(500).send({
            success: false,
            message: "Delete repair request failed"
        })
    }
}

export const showIndividualRepairRequest = async(req,res) => {
    try{
        const userID = req.params.userID;
        const individualRepairRequest = await repairRequests.find({UserDetails:userID}).populate("ServiceDetails").populate("ProblemProductDetails").populate("TechnicianDetails")
        res.status(200).send({
            success: true,
            message: "Individual Repair Request",
            individualRepairRequest
        })
    }
    catch(error){
        res.status(500).send({
            success: false,
            message: "Individual Repair Request failed"
        })
    }
}

export const technicianWork = async(req,res) => {
    try{
        const technicianID = req.params.technicianID;
        const individualRepairRequest = await repairRequests.find({TechnicianDetails:technicianID}).populate("UserDetails").populate("ServiceDetails").populate("ProblemProductDetails").populate("TechnicianDetails")
        res.status(200).send({
            success: true,
            message: "Individual Repair Request",
            individualRepairRequest
        })
    }
    catch(error){
        res.status(500).send({
            success: false,
            message: "Individual Repair Request failed"
        })
    }
}

export const checkAssignedTaskController = async(req,res) => {
    try{
        const {TechnicianDetails, Status} = req.body;
        const checkAssignedTask = await repairRequests.find({TechnicianDetails,Status}).populate("UserDetails").populate("ServiceDetails").populate("ProblemProductDetails").populate("TechnicianDetails")
        res.status(200).send({
            success: true,
            message: "Assigned individual assigned Tasks",
            checkAssignedTask
        })
    }
    catch(error){
        res.status(500).send({
            success: false,
            message: "Check Assigned Task failed"
        })
    }
}