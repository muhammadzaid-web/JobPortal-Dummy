import Company from "../models/company.model.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName)
      return res.status(400).json({ message: "Company name is required" });
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({ message: "Company already exists" });
    }
    company = await Company.create({
      name: companyName,
      userId: req.user.id,
    });

    return res.status(201).json({
      message: "Company created successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.user.id;
    const companies = await Company.find({ userId });
    if (!companies) {
      return res
        .status(404)
        .json({ message: "Company not found", success: false });
    }
    return res.status(200).json({ companies, success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findById(id);
    if (!company) {
      return res
        .status(404)
        .json({ message: "Company not found", success: false });
    }
    return res.status(200).json({ company, success: true });
}catch(error){
  console.log(error);
  res.status(500).json({ message: error.message });
}
}

export const updateCompany = async (req, res) => {
    try{
        const {name, description, location, website} = req.body;
        const logo = req.file;  
        
        const updateData = {
            name,
            description,
            location,
            website
        }
        
        if(req.file){
          console.log("logo received",logo)       
          updateData.logo=req.file.filename;   
        }

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, {new: true});
        if(!company){
            return res.status(404).json({message: "Company not found", success: false});
        }

        return res.status(200).json({message: "Company updated successfully", success: true, company});

    }catch(error){
      console.log(error);
      res.status(500).json({ message: error.message });
    }
}