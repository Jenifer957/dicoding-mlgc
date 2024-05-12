const predictClassification = require('../services/inferenceService');
const crypto = require('crypto');
const storeData = require('../services/storeData');

const { Firestore } = require('@google-cloud/firestore');

async function postPredictHandler(request, h) {
  const { image } = request.payload;
  const { model } = request.server.app;

  const { confidenceScore, label, suggestion } = await predictClassification(model, image);
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const data = {
    id,
    result: label,
    suggestion,
    createdAt,
  };

  await storeData(id, data);

  const response = h.response({
    status: 'success',
    message: 'Model is predicted successfully',
    data,
  });
  response.code(201);
  return response;
}

async function getPredictHistories(request, h) {
  const db = new Firestore();

  const getPredictHistories = db.collection('prediction');
  const snapshot = await getPredictHistories.get();

  const data = snapshot.docs.map((doc) => {
    const { result, createdAt, suggestion } = doc.data();
    return {
      id: doc.id,
      history: {
        result,
        createdAt,
        suggestion,
        id: doc.id,
      },
    };
  });

  return { status: 'success', data };
}
module.exports = { postPredictHandler, getPredictHistories };
