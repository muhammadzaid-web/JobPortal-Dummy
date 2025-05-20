// import Application from "../models/application.model.js";
// import { Job } from "../models/job.model.js";

// export const applyJob = async (req, res) => {
//   try {
//     const userId = req.id;
//     const jobId = req.params.id;
//     if (!jobId) {
//       res.status(400).json({ message: "Job id is required", success: false });
//     }

//     //check already apply or not
//     const application = await Application.findOne({
//       applicant: userId,
//       job: jobId,
//     });
//     if (application) {
//       res
//         .status(400)
//         .json({
//           message: "You have already applied for this job",
//           success: false,
//         });
//     }

//     //check if job is exist
//     const job = await Job.findById(jobId);
//     if (!job) {
//       res.status(400).json({ message: "Job not found", success: false });
//     }

//     //create new application
//     const newApplication = new Application({
//       applicant: userId,
//       job: jobId,
//     });

//     Job.application.push(newApplication);
//     await Job.save();
//     res
//       .status(200)
//       .json({ message: "Application submitted successfully", success: true });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: error.message, success: false });
//   }
// };

// export const getAppliedJobs = async (req, res) => {
//   try {
//     const userId = req.user._id; //shayad userId = req.id
//     const applications = await Application.find({ applicant: userId })
//       .sort({ createdAt: -1 })
//       .populate({
//         path: "job",
//         options: { sort: { createdAt: -1 } },
//         populate: {
//           path: "company",
//           options: { sort: { createdAt: -1 } },
//         },
//       });
//     if (!applications) {
//       res
//         .status(400)
//         .json({ message: "No applications found", success: false });
//     }
//     return res.status(200).json({ applications, success: true });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: error.message, success: false });
//   }
// };



// export const updateStatus = async (req, res) => {
//     try{
//         const {status} = req.body;
//         const applicationId = req.params.id;
//         if(!status){
//             return res.status(400).json({message:"Please provide status", success:false})
//         }
//         //find application by application id
//         const application = await Application.findOne({_id : applicationId});
//         if(!application){
//             return res.status(400).json({message:"No application found", success:false})
//         }

//         //update status
//         application.status = status.toLowerCase();
//         await application.save();

//         return res.status(200).json({message:"Application status updated", success:true}) 

//     }catch(error){
//         console.log(error);
//         res.status(500).json({message:error.message, success:false})
//     }
// }





import Application from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
    try {
        const userId = req.user.id;
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required.",
                success: false
            })
        };
        // check if the user has already applied for the job
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this jobs",
                success: false
            });
        }

        // check if the jobs exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }
        // create a new application
        const newApplication = await Application.create({
            job:jobId,
            applicant:userId,
        });

        job.applications.push(newApplication._id);
        await job.save();
        return res.status(201).json({
            message:"Job applied successfully.",
            success:true
        }) 
    } catch (error) {
        console.log(error);
    }
};
export const getAppliedJobs = async (req,res) => {
    try {
        const userId = req.user.id;
        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options:{sort:{createdAt:-1}},
            }
        });
        if(!application){
            return res.status(404).json({
                message:"No Applications",
                success:false
            })
        };
        return res.status(200).json({
            application,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
// admin dekhega kitna user ne apply kiya hai
// export const getApplicants = async (req,res) => {
//     try {
//         const jobId = req.params.id;
//         const job = await Job.findById(jobId).populate({
//             path:'application',
//             options:{sort:{createdAt:-1}},
//             populate:{
//                 path:'applicant',
//                 options:{sort:{createdAt:-1}},
                
//             }
//         });
//         if(!job){
//             return res.status(404).json({
//                 message:'Job not found.',
//                 success:false
//             })
//         };
//         return res.status(200).json({
//             success:true,
//             job, 
//         });
//     } catch (error) {
    //         console.log(error);
    //     }
    // }


    // //admin ke liye applicant dekhna
    export const getApplicants = async (req, res) => {
      try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
          path: "applications",
          options: { sort: { createdAt: -1 } },
          populate: {
            path: "applicant",
            // options: { sort: { createdAt: -1 } },
          },
        });
        if (!job) {
          res.status(400).json({ message: "No job found", success: false });
        }
        return res
          .status(200)
          .json({ job, 
            success:true });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message, success: false });
      }
    };
export const updateStatus = async (req,res) => {
    try {
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({
                message:'status is required',
                success:false
            })
        };

        // find the application by applicantion id
        const application = await Application.findOne({_id:applicationId});
        if(!application){
            return res.status(404).json({
                message:"Application not found.",
                success:false
            })
        };

        // update the status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message:"Status updated successfully.",
            success:true
        });

    } catch (error) {
        console.log(error);
    }
}