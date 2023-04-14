import * as warehouseDao from './warehouse-dao.js';

export const WarehouseController = (app) => {
    app.get('/warehouse', findAllWarehouses);
    app.get('/warehouse/:id', findWarehouseById);
    app.get('/warehouse/company/:company', findWarehouseByCompany);
    app.post('/warehouse', createWarehouse)
    app.delete('/warehouse/:id', deleteWarehouse);
    app.put('/warehouse/:id', updateWarehouse);
}


const findAllWarehouses = async (req, res) => {
    const warehouses = await warehouseDao.findAllWarehouses();
    res.json(warehouses);
}

const findWarehouseById = async (req, res) => {
    try {
        const idToFind = req.params.id;
        const warehouses = await warehouseDao.findWarehouseById(idToFind);
        res.json(warehouses);
    }
    catch (error) {
        res.json(error);
    }
}

const findWarehouseByCompany = async (req, res) => {
    try {
        const companyToFind = req.params.company;
        const warehouses = await warehouseDao.findWarehouseByCompany(companyToFind);
        res.json(warehouses);
    }
    catch (error) {
        res.json(error);
    }
}

// create -- newWarehouse
const createWarehouse = async (req, res) => {
    const newWarehouse = req.body;
    const status = await warehouseDao.createWarehouse(newWarehouse);
    res.json(status);
}

// delete -- id
const deleteWarehouse = async (req, res) => {
    const idToDelete = req.params.id;
    const warehouse = await warehouseDao.findWarehouseById(idToDelete);
    if (!warehouse) {
        res.json(null);
        return;
    }
    const status = await warehouseDao.deleteWarehouse(idToDelete);
    res.json(status);
}

// update -- id + newWarehouse
const updateWarehouse = async (req, res) => {
    const idToUpdate = req.params.id;
    const newWarehouse = req.body;
    const status = await warehouseDao.updateWarehouse(idToUpdate, newWarehouse)
        .then(() => warehouseDao.findWarehouseById(idToUpdate));
    res.json(status);
}