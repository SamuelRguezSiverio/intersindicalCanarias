const router = require('express').Router();

const {
  signup,
  login,
  getAdminsByHospital,
  updateAdmin,
  getAdminById
} = require('../controllers/authController')

const { sendEmail } = require('../controllers/emailController');

router.post('/signup', signup)
router.post('/login', login)
router.get('/adminsByHospital', getAdminsByHospital)
router.get('/adminsId/:id', getAdminById)
router.put('/admins/:id', updateAdmin);
router.post('/send', (req, res) => {
  const { to, subject, text } = req.body;
  sendEmail(to, subject, text);
  res.send('Correo enviado');
});

module.exports = router
