const express = require('express');
const router = express.Router();
const Task = require('../models/task');
//constante que tiene el esquema de los datos(funciona como una especie de clase)
//el modelo "Task" permite usar los metodos de la BDs de mongo

//////////READ ALL TASKS
router.get('/', async (req, res) => {
    const tasks = await Task.find();//devuelve un arreglo de objetos(ducuments)
    res.render('index', {
        tasks
    });
});
//////////SAVE A TASK
router.post('/add', async (req, res) => {
    const task = new Task(req.body);
    //se instancia el esquema Task(funciona como una clase)
    //el req.body trae los valores a traves de los atributos "names" de los inputs
    await task.save();
    res.redirect('/');
});
////////////ACTION BTN DONE
router.get('/turn/:id', async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    task.status = !task.status;
    await task.save();
    res.redirect('/');
});
///////////BTN EDIT
router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    res.render('edit', {
        task
    })
});
/////////BTN UPDATE
router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    await Task.update({ _id: id }, req.body);
    res.redirect('/');
});

/////////BTN DELETE
router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await Task.deleteOne({ _id: id });
    res.redirect('/');
});


module.exports = router;