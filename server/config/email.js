const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// 1. Send Booking Confirmation to CUSTOMER
const sendBookingEmail = async (userEmail, tourName, fullName) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: `Booking Confirmation: ${tourName}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd;">
        <h2 style="color: #0ea5e9;">Inquiry Received!</h2>
        <p>Dear <strong>${fullName}</strong>,</p>
        <p>Thank you for your interest in the <strong>${tourName}</strong> package.</p>
        <p>We have received your inquiry and our travel experts team will contact you shortly.</p>
      </div>
    `,
  };
  return transporter.sendMail(mailOptions);
};

// 2. Send Booking Alert to ADMIN (Updated with Travelers Count)
const sendAdminBookingAlert = async (details) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Send to Admin
    subject: `New Inquiry: ${details.tourName}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd;">
        <h2 style="color: #d97706;">New Tour Inquiry</h2>
        <table style="width: 100%; text-align: left; border-collapse: collapse;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Customer:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${details.fullName}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${details.phone}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${details.email}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Tour:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${details.tourName}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Travel Date:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${details.travelDate}</td></tr>
          
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Travelers:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${details.travelers} Person(s)</td></tr>
          
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Total Est:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">₹${details.totalPrice}</td></tr>
        </table>
      </div>
    `,
  };
  return transporter.sendMail(mailOptions);
};

// 3. Contact Email (Kept for backend safety, even if frontend form is removed)
const sendContactEmail = async (data) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `New Message: ${data.category} - ${data.name}`,
    html: `<h3>New Contact Message</h3><p>${data.message}</p>`,
  };
  return transporter.sendMail(mailOptions);
};

module.exports = { sendBookingEmail, sendAdminBookingAlert, sendContactEmail };