const inquiryController = require("../../controllers/inquiry.controller");

const router = require("express").Router();
const { authenticateAdmin, authenticateToken} = require("../../middlewares/auth");

// add category
router.post("/", inquiryController.createInquiry);
router.get("/inquiries", authenticateAdmin ,inquiryController.getAllInquiries);
router.get('/', authenticateToken, inquiryController.getInquiryById);
router.put('/', authenticateToken, inquiryController.updateInquiry);
router.delete('/', authenticateToken, inquiryController.deleteInquiry);

module.exports = router;
