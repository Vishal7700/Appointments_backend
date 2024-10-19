const doctorModel = require("../models/adminModels/doctors-model");


module.exports.addDoctor = async (req, res) => {
    try {
        let existingDoctor = await doctorModel.findOne({ email: req.body.email });
        if (existingDoctor)
            return res.status(400).send("Doctor already exists");

        let { name, email, speciality, qualification, experience, phonenumber, address, timeslots } = req.body;
        let profilePhoto = req.file ? req.file.buffer : null;
        let newDoctor = await doctorModel.create({
            name,
            email,
            speciality,
            qualification,
            experience,
            phonenumber,
            address,
            timeslots,
            profilePhoto
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
        let doctors = await doctorModel.find();

        if (!doctors || doctors.length === 0) {
            return res.status(404).send('No doctors found');
        }

        let count = await doctorModel.countDocuments();

        res.send({
            doctors,
            totalDoctors: count
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
            { new: true}
        );

        if (!updatedDoctor) {
            return res.status(404).send("Doctor not found");
        }

        return res.status(200).send(updatedDoctor);
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

