const mainRoutes = require('express').Router();
const menuRoutes = require('./menuRoutes');
const authRoutes = require('./authRoutes');

mainRoutes.use('/menu', menuRoutes);
mainRoutes.use('/auth', authRoutes);

module.exports = mainRoutes;