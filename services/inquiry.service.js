const {Inquiry} = require('../models/index')

const createInquiry = async (inquiry) => {
    if (!inquiry) return false;
    const inquiryEntity = await new Inquiry(inquiry).save();
    if (!inquiryEntity) return false;
    return inquiryEntity;
}

const deleteInquiry = async (id) => {
    const inquiry = await Inquiry.findOneAndDelete({'_id': id});
    return inquiry;
}

const getAllInquiries = async () => {
    const inquiries = await Inquiry.find();
    console.log(inquiries)
    return inquiries;
}

const getInquiryById = async (id) => {
    const inquiry = await Inquiry.findById(id);
    if (!inquiry) return false;
    return inquiry
}

const updateInquiry = async (id, data) => {
    console.log(id, data)
    const inquiry = await Inquiry.findOneAndUpdate({'_id': id}, {$set: data})
    if (!inquiry) return false;
    return inquiry;
}

module.exports = {
    createInquiry,
    deleteInquiry,
    getAllInquiries,
    getInquiryById,
    updateInquiry
}
