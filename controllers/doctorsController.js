const doctorModel = require("../models/adminModels/doctors-model");


module.exports.addDoctor = async (req, res) => {
    try {
        let existingDoctor = await doctorModel.findOne({ email: req.body.email });
        if (existingDoctor)
            return res.status(400).send("Doctor already exists");

        const { name, email, speciality, qualification, experience, phonenumber, address, timeslots } = req.body;
        const imageBuffer = req.file.buffer; 
        const imageMimetype = req.file.mimetype;
        const newDoctor = await doctorModel.create({
            name,
            email,
            speciality,
            qualification,
            experience,
            phonenumber,
            address,
            timeslots,
            profilePhoto :{
                data: imageBuffer,    
                contentType: imageMimetype 
            }
        });

        const totalDoctors = await doctorModel.countDocuments();

        res.status(201).send({
            message: "Doctor added successfully",
            newDoctor,
            totalDoctors
        });

    } catch (err) {
        return res.status(500).send(err.message);
    }
}

module.exports.deleteDoctor = async (req, res) => {
    try {

        let doctor = await doctorModel.findOneAndDelete(req.params._id);

        if (!doctor) {
            return res.status(404).send('Doctor not found');
        }

        return res.status(200).send('Doctor deleted successfully');
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

module.exports.getAllDoctors = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;

        // Get the search name from the query parameters
        const searchName = req.query.name;

        // Build the query object
        let query = {};

        // If a search name is provided, use a regex for case-insensitive searching
        if (searchName) {
            const regex = new RegExp(searchName, 'i'); // 'i' for case-insensitive
            query.name = { $regex: regex }; // Update the query to include the name search
        }

        // Count documents matching the query first
        let count = await doctorModel.countDocuments(query); // Count documents matching the query
        const totalPages = Math.ceil(count / limit); // Calculate total pages

        // Check if the requested page is valid
        if (page > totalPages) {
            return res.status(200).json({ doctors: [], totalPages }); // Return empty array if page is out of range
        }

        // Find doctors with the constructed query, applying pagination
        let doctors = await doctorModel.find(query)
            .skip(startIndex)
            .limit(limit);

        res.status(200).send({
            doctors,
            totalDoctors: count,
            currentPage: page,
            totalPages: totalPages
        });

    } catch (err) {
        return res.status(500).send(err.message);
    }
}

module.exports.getDoctorById = async (req, res) => {
    try {
        let doctor = await doctorModel.findOne({
            id: req.params._id
        });
        if (!doctor)
            return res.status(404).send('Doctor not found');
        res.send(doctor);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

module.exports.updateDoctor = async (req, res) => {
    try {
        const updateFields = {};
        let profilePhoto = req.file ? req.file.buffer : null;

        if (req.body.name) updateFields.name = req.body.name;
        if (req.body.email) updateFields.email = req.body.email;
        if (req.body.speciality) updateFields.speciality = req.body.speciality;
        if (req.body.qualification) updateFields.qualification = req.body.qualification;
        if (req.body.experience) updateFields.experience = req.body.experience;
        if (req.body.phonenumber) updateFields.phonenumber = req.body.phonenumber;
        if (req.body.address) updateFields.address = req.body.address;
        if (profilePhoto) updateFields.profilePhoto = profilePhoto;
        if (req.body.timeslots) updateFields.timeslots = req.body.timeslots;

        let updatedDoctor = await doctorModel.findOneAndUpdate(
            { id: req.params._id },
            updateFields,
            { new: true }
        );

        if (!updatedDoctor) {
            return res.status(404).send("Doctor not found");
        }

        return res.status(200).send(updatedDoctor);
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

