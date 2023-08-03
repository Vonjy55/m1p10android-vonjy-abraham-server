const admin = require('firebase-admin');
const serviceAccount = require('../../serviceAccountKey.json'); // Remplacez par le chemin vers votre fichier de clé privée généré par Firebase.

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Exportez l'instance Firebase Admin initialisée pour l'utiliser dans d'autres parties de votre application.
module.exports = admin;