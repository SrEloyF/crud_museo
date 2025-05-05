const express = require('express');
const router = express.Router();
const { Museo, ObraDeArte } = require('../models');

//listar
router.get('/', async (_req, res) => {
  const museos = await Museo.findAll({ include: ObraDeArte });
  res.render('museos-list', { museos });
});

//formulario crear
router.get('/new', (_req, res) => {
  res.render('museo-form', { museo: {}, action: '/museos', method: 'POST' });
});

//crear
router.post('/', async (req, res) => {
  await Museo.create({ nombre: req.body.nombre });
  res.redirect('/museos');
});

//listar obras del museo
router.get('/:id/obras', async (req, res) => {
  const museo = await Museo.findByPk(req.params.id);
  const obras = await museo.getObraDeArtes();
  res.render('museos-obras', { museo, obras });
});

//editar
router.get('/:id/edit', async (req, res) => {
  const museo = await Museo.findByPk(req.params.id);
  res.render('museo-form', {
    museo,
    action: `/museos/${museo.id}`,
    method: 'PUT'
  });
});

//actualizar
router.put('/:id', async (req, res) => {
  await Museo.update(
    { nombre: req.body.nombre },
    { where: { id: req.params.id } }
  );
  res.redirect('/museos');
});

//eliminar con validación
router.delete('/:id', async (req, res) => {
  const museo = await Museo.findByPk(req.params.id);
  const count = await museo.countObraDeArtes();
  if (count > 0) {
    //no permitir borrado si tiene obras
    return res.send(`
      <h3>No puedes eliminar este museo</h3>
      <p>Tiene ${count} obra(s) asociada(s).</p>
      <a href="/museos">Volver a Museos</a>
    `);
  }
  await museo.destroy();
  res.redirect('/museos');
});

module.exports = router;