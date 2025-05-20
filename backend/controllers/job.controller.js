import { Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      companyId,
      jobType,
      position,
      experience,
    } = req.body;
    const userId = req.user.id;
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !companyId ||
      !experience||
      !jobType ||
      !position 
    ) {
      return res.status(400).json({
        message: "Please fill all the fields",
        success: false,
      });
    }
    const job = await Job.create({
      title,
      description,
      requirements:requirements.split(","),
      salary:Number(salary),
      location,
      jobType,
      experience:experience,
      position,
      company:companyId,
      created_by:userId,
    });
    return res.status(200).json({
      message: "Job posted successfully",
      success: true,
      job,
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


export const getAllJobs =async (req, res) => {
    try{
        const keywords = req.query.keywords || "";
        const query = {
            $or:[
                {title: {$regex: keywords, $options: "i"}},
                {description: {$regex: keywords, $options: "i"}},
            ]
        };
        const jobs = await Job.find(query).populate("company");
        if(!jobs){
            return res.status(404).json({ message: "No jobs found" , success: false});
        }
        return res.status(200).json({ message: "Jobs fetched successfully", success: true, jobs});
    }catch(error){
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}


// export const getJobById = async (req, res) => {
//     try{
//         const job = await Job.findById(req.params.id);
//         const
//         if(!job){
//             return res.status(404).json({ message: "No job found" , success: false});
//         }
//         return res.status(200).json({ message: "Job fetched successfully", success: true, job});
//     }catch(error){
//         console.log(error);
//         res.status(500).json({ message: error.message });
//     }
// }
export const getJobById = async (req, res) => {
  try {
      const jobId = req.params.id;
      const job = await Job.findById(jobId).populate({
          path:"applications"
      });
      if (!job) {
          return res.status(404).json({
              message: "Jobs not found.",
              success: false
          })
      };
      return res.status(200).json({ job, success: true });
  } catch (error) {
      console.log(error);
  }
}


export const getAdminJobs = async (req, res) => {
    try{
        const adminId = req.user.id;
        const jobs = await Job.find({created_by: adminId}).populate({
          path:"company",
          createdAt:-1
        });
        if(!jobs){
            return res.status(404).json({jobs,  message: "No jobs found" , success: false});
        }
        return res.status(200).json({ message: "Jobs fetched successfully", success: true, jobs});
    }catch(error){
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}