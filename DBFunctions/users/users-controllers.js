import * as usersDao from './users-dao.js';

// --------------------All users--------------------
// a. Find - all / by id / by email
export const UsersController = (app) => {
    app.get('/users', findAllUsers);
    app.get('/users/:id', findUserById);
    app.get('/users/email/:email', findUserByEmail);
    app.delete('/users/:id', deleteUser);
    app.put('/users/:id', updateUser);
}

const findAllUsers = async (req, res) => {
    const users = await usersDao.findAllUsers();
    res.json(users);
}

const findUserById = async (req, res) => {
    try {
        const idToFind = req.params.id;
        const users = await usersDao.findUserById(idToFind);
        res.json(users);
    }
    catch (error) {
        res.json(error);
    }
}

const findUserByEmail = async (req, res, next) => {
    try {
        const emailToFind = req.params.email;
        const users = await usersDao.findUserByEmail(emailToFind);
        res.json(users[0]);
    } catch (error) {
        next(error);
    }
}
// b. Delete -- return null when unsuccessful
const deleteUser = async (req, res) => {
    const idToDelete = req.params.id;
    const user = await usersDao.findUserById(idToDelete);
    if (!user) {
        res.json(null);
        return;
    }
    const role = user.role;
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
const updateUser = async (req, res) => {
    const idToUpdate = req.params.id;
    const updatedUser = req.body;
    const user = await usersDao.findUserById(idToUpdate);
    if (!user) {
        res.json(null);
        return;
    }

    const role = user.role;
    let status = null;
    if (role === 'buyer') {
        status = await usersDao.updateBuyer(idToUpdate, updatedUser)
            .then(() => usersDao.findBuyerById(idToUpdate));
    }
    else if (role === 'merchant') {
        status = await usersDao.updateMerchant(idToUpdate, updatedUser)
            .then(() => usersDao.findMerchantById(idToUpdate));
    }
    else if (role === 'admin') {
        status = await usersDao.updateAdmin(idToUpdate, updatedUser)
            .then(() => usersDao.findAdminById(idToUpdate));
    }
    res.json(status);
}