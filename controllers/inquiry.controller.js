const {InquiryService} = require("../services");
const {Product} = require("../models");


const createInquiry = async (req, res) => {
  const {email, image, inquiryType, inquiryDescription} = req.body;
  if (!email || !image || !inquiryType ){
      return res.status(401).send("some fields are missing");
  }
  const date = new Date();
  const data = await InquiryService.createInquiry({email, image, inquiryType, inquiryDescription, date: date.toLocaleTimeString()})
  if (!data) return res.status(501).send("Error with server");
  return res.json(data);
}

const deleteInquiry = async (req, res) => {
    const {id} = req.body;
    if (!id) return res.sendStatus(404);
    const deletedItem = InquiryService.deleteInquiry(id);
    if (!deletedItem) return res.status(404).send("Some errors. Could not delete this enquiry.")
    return res.status(200).send('this inquiry has been deleted.')
}

const getInquiryById = async (req,res) => {
    const {id} = req.query
    if (!id) return req.status(501).send("Some data is missing");
    const found = await InquiryService.getInquiryById(id)
    if (!found) return req.sendStatus(404)
    return res.json(found);
}

const getAllInquiries = async (req, res) => {
    const inquiries = await InquiryService.getAllInquiries();
    return res.json(inquiries);
}

const updateInquiry = async (req, res) => {
    const {id} = req.body
    const updatedInquiry = InquiryService.updateInquiry(id, req.body);
    if (!updatedInquiry) return res.status(501).send("error when update inquiry");
    return res.json(updatedInquiry);
}

module.exports = {
    createInquiry,
    deleteInquiry,
    getInquiryById,
    getAllInquiries,
    updateInquiry,

}
