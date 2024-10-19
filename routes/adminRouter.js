const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middlewares/isLoggedIn");
const { createAdmin } = require("../controllers/authControllerAdmin");
const { adminLogin } = require("../controllers/authControllerAdmin");
const { addDoctor, deleteDoctor, getAllDoctors, getDoctorById, updateDoctor } = require("../controllers/doctorsController");
const upload = require("../config/multer-config")



/**
 * @swagger
 * /admin/create:
 *   post:
 *     summary: Create a new admin user
 *     description: Registers a new admin user with a hashed password.
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the admin.
 *               email:
 *                 type: string
 *                 description: The email of the admin.
 *               password:
 *                 type: string
 *                 description: The password for the admin account.
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User registered successfully"
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: The ID of the newly created admin.
 *                     name:
 *                       type: string
 *                       description: The name of the admin.
 *                     email:
 *                       type: string
 *                       description: The email of the admin.
 *       400:
 *         description: Email already exists
 *       500:
 *         description: Internal server error
 */
router.post("/create", createAdmin);


/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Admin Login
 *     description: Logs in an admin user with email and password.
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: strongpassword123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 token:
 *                   type: string
 *                   example: jwt.token.here
 *       401:
 *         description: Invalid email or password
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Invalid email or password
 *       500:
 *         description: Server error
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Error message here
 */
router.post("/login", adminLogin);


/**
 * @swagger
 * /admin/add-doctor:
 *   post:
 *     summary: Add a New Doctor
 *     description: Adds a new doctor to the system.
 *     tags:
 *       - Doctors
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Dr. John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.doe@example.com
 *               speciality:
 *                 type: string
 *                 example: Cardiology
 *               qualification:
 *                 type: string
 *                 example: MD
 *               experience:
 *                 type: integer
 *                 example: 10
 *               phonenumber:
 *                 type: string
 *                 example: "+1234567890"
 *               address:
 *                 type: string
 *                 example: "123 Main St, City, Country"
 *               timeslots:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "09:00 AM - 11:00 AM"
 *     responses:
 *       201:
 *         description: Doctor added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Doctor added successfully
 *                 newDoctor:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60d5f4845c891f2c6c2c8b69"
 *                     name:
 *                       type: string
 *                       example: Dr. John Doe
 *                     email:
 *                       type: string
 *                       example: john.doe@example.com
 *                     speciality:
 *                       type: string
 *                       example: Cardiology
 *                     qualification:
 *                       type: string
 *                       example: MD
 *                     experience:
 *                       type: integer
 *                       example: 10
 *                     phonenumber:
 *                       type: string
 *                       example: "+1234567890"
 *                     address:
 *                       type: string
 *                       example: "123 Main St, City, Country"
 *                     timeslots:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "09:00 AM - 11:00 AM"
 *                 totalDoctors:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Doctor already exists
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Doctor already exists
 *       500:
 *         description: Server error
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Error message here
 */
router.post("/add-doctor", upload.single("profilePhoto"), isLoggedIn, addDoctor);


/**
 * @swagger
 * admin/delete-doctor/{id}:
 *   delete:
 *     summary: Delete a Doctor
 *     description: Deletes a doctor from the system by their ID.
 *     tags:
 *       - Doctors
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the doctor to delete.
 *         schema:
 *           type: string
 *           example: "60d5f4845c891f2c6c2c8b69"
 *     responses:
 *       200:
 *         description: Doctor deleted successfully
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Doctor deleted successfully
 *       404:
 *         description: Doctor not found
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Doctor not found
 *       500:
 *         description: Server error
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Error message here
 */
router.delete("/delete-doctor/:id", isLoggedIn, deleteDoctor);


/**
 * @swagger
 * admin/doctors:
 *   get:
 *     summary: Get All Doctors
 *     description: Retrieves a list of all doctors from the system.
 *     tags:
 *       - Doctors
 *     responses:
 *       200:
 *         description: A list of doctors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "60d5f4845c891f2c6c2c8b69"
 *                   name:
 *                     type: string
 *                     example: Dr. John Doe
 *                   email:
 *                     type: string
 *                     example: john.doe@example.com
 *                   speciality:
 *                     type: string
 *                     example: Cardiology
 *                   qualification:
 *                     type: string
 *                     example: MD
 *                   experience:
 *                     type: integer
 *                     example: 10
 *                   phonenumber:
 *                     type: string
 *                     example: "+1234567890"
 *                   address:
 *                     type: string
 *                     example: "123 Main St, City, Country"
 *                   timeslots:
 *                     type: array
 *                     items:
 *                       type: string
 *                       example: "09:00 AM - 11:00 AM"
 *       404:
 *         description: No doctors found
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: No doctors found
 *       500:
 *         description: Server error
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Error message here
 */
router.get("/doctors", isLoggedIn, getAllDoctors);

/**
 * @swagger
 * /admin/doctor/{_id}:
 *   get:
 *     summary: Retrieve a doctor by ID
 *     description: Fetches a doctor's details using their unique ID.
 *     tags:
 *       - Doctors
 *     parameters:
 *       - name: _id
 *         in: path
 *         required: true
 *         description: The unique ID of the doctor to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Doctor found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "60c72b2f9f1b2c001f7c0a1b"
 *                 name:
 *                   type: string
 *                   example: "Dr. John Doe"
 *                 email:
 *                   type: string
 *                   example: "johndoe@example.com"
 *                 phone:
 *                   type: string
 *                   example: "+1234567890"
 *                 specialization:
 *                   type: string
 *                   example: "Cardiology"
 *       404:
 *         description: Doctor not found
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Doctor not found"
 *       500:
 *         description: Server error
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Error message here"
 */
router.get("/doctor/:id", isLoggedIn, getDoctorById);


/**
 * @swagger
 * /admin/doctors/{id}:
 *   put:
 *     summary: Update a doctor's information
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the doctor to update
 *         schema:
 *           type: string
 *       - in: body
 *         name: doctor
 *         description: The doctor object to update
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               description: The name of the doctor
 *             email:
 *               type: string
 *               description: The email of the doctor
 *             speciality:
 *               type: string
 *               description: The doctor's speciality
 *             qualification:
 *               type: string
 *               description: The doctor's qualification
 *             experience:
 *               type: string
 *               description: The doctor's experience
 *             phonenumber:
 *               type: string
 *               description: The doctor's phone number
 *             address:
 *               type: string
 *               description: The doctor's address
 *             profilePhoto:
 *               type: string
 *               format: binary
 *               description: The profile photo of the doctor (optional)
 *             timeslots:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   day:
 *                     type: string
 *                     description: Day of the week
 *                   startTime:
 *                     type: string
 *                     description: Start time of the timeslot
 *                   endTime:
 *                     type: string
 *                     description: End time of the timeslot
 *     responses:
 *       200:
 *         description: Successfully updated the doctor
 *         schema:
 *           $ref: '#/definitions/Doctor'
 *       404:
 *         description: Doctor not found
 *       500:
 *         description: Internal server error
 */
router.put("/update-doctor/:id", isLoggedIn, upload.single("profilePhoto") , updateDoctor);



module.exports = router;
