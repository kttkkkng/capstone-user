const express = require("express");
const axios = require("axios");
const { userCheckMiddleware } = require("../middleware");
const router = express.Router();

const survey_ip = "ip-172-31-37-162.ap-southeast-1.compute.internal:3000";

router.get("/", userCheckMiddleware, async (req, res) => {
    try {
        const response = await axios.get(survey_ip + "/survey", { params: req.query });
        return res.json(response.data);
    } catch (err) {
        return res.status(err.response.status || 404).json(err.response.data || { message: "not found" });
    }
});

router.post("/", userCheckMiddleware, async (req, res) => {
    try {
        const response = await axios.post(survey_ip + "/survey", req.body, { params: req.query });
        return res.json(response.data);
    } catch (err) {
        return res.status(err.response.status || 404).json(err.response.data || { message: "not found" });
    }
});

module.exports = router;