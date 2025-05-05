const express = require('express');
const router = express.Router();
const { ObraDeArte, Museo } = require('../models');

//listar
router.get('/', async (_req, res) => {
  const obras = await ObraDeArte.findAll({ include: Museo });
  res.render('obras-list', { obras });
});

//form crear
router.get('/new', async (_req, res) => {
  const museos = await Museo.findAll();
  res.render('obra-form', {
    obra: {},
    museos,
    action: '/obras',
    method: 'POST'
  });
});

// POST /obras
router.post('/', async (req, res) => {
  try {
    //crear la obra con todo menos la asociación
    const obra = await ObraDeArte.create({
      titulo: req.body.titulo,
      artista: req.body.artista,
      anio: req.body.anio,
      imagen: req.file.filename
    });
    if (req.body.museo_id) {
      await obra.setMuseos([req.body.museo_id]);
    }
    res.redirect('/obras');
  } catch (err) {
    res.status(400).send('Error creando obra: ' + err.message);
  }
});
//formulario Editar
router.get('/:id/edit', async (req, res) => {
  const obra = await ObraDeArte.findByPk(req.params.id, { include: Museo });
  const museos = await Museo.findAll();
  res.render('obra-form', {
    obra,
    museos,
    action: `/obras/${obra.id}`,
    method: 'PUT'
  });
});

//actualizar
router.put('/:id', async (req, res) => {
  const payload = {
    titulo: req.body.titulo,
    artista: req.body.artista,
    anio: req.body.anio
  };
  if (req.file) payload.imagen = req.file.filename;

  const [ , [obra] ] = await ObraDeArte.update(payload, {
    where: { id: req.params.id },
    returning: true
  });
  //reasociar museo si cambió
  if (req.body.museo_id) {
    await obra.setMuseos([req.body.museo_id]);
  }
  res.redirect('/obras');
});

//eliminar obra
router.delete('/:id', async (req, res) => {
  await ObraDeArte.destroy({ where: { id: req.params.id } });
  res.redirect('/obras');
});

module.exports = router;