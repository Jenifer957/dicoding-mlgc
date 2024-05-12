// const { Firestore } = require('@google-cloud/firestore');

// async function getData(id, data) {
//   const db = new Firestore();

//   var getPredictHistories = db.collection('cities').doc('627daa98-8276-4a98-af29-008a1ec2482e');
//   getPredictHistories.get().then((doc) => {
//     if (doc.exists) {
//       const response = h.response({
//         status: 'success',
//       });
//       response.code(200);
//       return response;
//     } else {
//       const response = h.respone({
//         status: 'success',
//         message: 'no such document!',
//       });
//       response.code(200);
//       return response;
//     }
//   });
// }

// module.exports = getData;
