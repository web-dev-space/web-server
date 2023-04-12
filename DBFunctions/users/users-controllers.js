import * as usersDao from './users-dao.js';

// --------------------All users--------------------
// a. Find - all / by id / by email
export const UsersController = (app) => {
    app.get('/user', findAllUsers);
    app.get('/user/:id', findUserById);
    app.get('/user/email/:email', findUserByEmail);
}

const findAllUsers = async (req, res) => {
    const users = await usersDao.findAllUsers();
    res.json(users);
}

const findUserById = async (req, res) => {
    const idToFind = req.params.id;
    const users = await usersDao.findUserById(idToFind);
    res.json(users);
}

const findUserByEmail = async (req, res) => {
    const emailToFind = req.params.email;
    const users = await usersDao.findUserByEmail(emailToFind);
    res.json(users);
}
// b. Delete -- return null when unsuccessful
const deleteUser = async (req, res) => {
    const idToDelete = req.params.id;
    const role =  await usersDao.findUserById(idToDelete).role;
    let status = null;
    if (role === 'buyer') {
        status = await usersDao.deleteBuyer(idToDelete);
    }
    else if (role === 'merchant') {
        status = await usersDao.deleteMerchant(idToDelete);
    }
    else if (role === 'admin') {
        status = await usersDao.deleteAdmin(idToDelete);
    }
    res.json(status);
}

// c. Update -- return null when unsuccessful
const updateBuyer = async (req, res) => {
    const idToUpdate = req.params.id;
    const updatedBuyer = req.body;
    const role =  await usersDao.findUserById(updateBuyer).role;
    let status = null;
    if (role === 'buyer') {
        status = await usersDao.updateBuyer(idToUpdate, updatedBuyer)
            .then(() => usersDao.findBuyerById(idToUpdate));
    }
    else if (role === 'merchant') {
        status = await usersDao.updateMerchant(idToUpdate, updatedBuyer)
            .then(() => usersDao.findMerchantById(idToUpdate));
    }
    else if (role === 'admin') {
        status = await usersDao.updateAdmin(idToUpdate, updatedBuyer)
            .then(() => usersDao.findAdminById(idToUpdate));
    }
    res.json(status);
}