const ClientProfile = require("../models/clientProfile");

const createClientProfile = (req, res) => {
  const {
    name,
    contact,
    email,
    age,
    weight,
    height,
    goals,
    injuries,
    preferences,
    restrictions,
  } = req.body;

  const newClientProfile = new ClientProfile({
    name,
    contact,
    email,
    age,
    weight,
    height,
    goals,
    injuries,
    preferences,
    restrictions,
  });

  newClientProfile
    .save()
    .then((savedClientProfile) => {
      res.status(201).json(savedClientProfile);
    })
    .catch((error) => {
      res.status(500).json({ error: "Could not create client profile" });
    });
};

const getAllClientProfiles = (req, res) => {
  ClientProfile.find()
    .then((clientProfiles) => {
      res.status(200).json(clientProfiles);
    })
    .catch((error) => {
      res.status(500).json({ error: "Could not fetch client profiles" });
    });
};

const deleteClientProfile = (req, res) => {
  const profileId = req.params.id;
  ClientProfile.findByIdAndDelete(profileId)
    .then((deletedProfile) => {
      if (!deletedProfile) {
        return res.status(404).json({ error: "Client profile not found" });
      }
      res.status(200).json({ message: "Client profile deleted successfully" });
    })
    .catch((error) => {
      res.status(500).json({ error: "Could not delete client profile" });
    });
};

module.exports = {
  createClientProfile,
  getAllClientProfiles,
  deleteClientProfile,
};
