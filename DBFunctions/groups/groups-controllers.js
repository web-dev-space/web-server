import * as groupsDao from './groups-dao.js';

export const GroupsController =(app) => {
   app.get('/groups', findAllGroups);
    app.get('/groups/:id', findGroupById);
    app.post('/groups', createGroup);
    app.delete('/groups/:id', deleteGroup);
    app.put('/groups/:id', updateGroup);
}


const findAllGroups = async (req, res) => {
  const groups = await groupsDao.findAllGroups();
  res.json(groups);
}

const findGroupById = async (req, res) => {
  const idToFind = req.params.id;
  const group = await groupsDao.findGroupById(idToFind);
  res.json(group);
}

const createGroup = async (req, res) => {
  const newGroup = req.body;
  const insertedGroup = await groupsDao.createGroup(newGroup);
  res.json(insertedGroup);
}

const deleteGroup = async (req, res) => {
  const idToDelete = req.params.id;
  const status = await groupsDao.deleteGroup(idToDelete);
  res.json(status);
}

const updateGroup = async (req, res) => {
  const idToUpdate = req.params.id;
  const updatedGroup = req.body;
  const status = await groupsDao.updateGroup(idToUpdate, updatedGroup)
          .then(() => groupsDao.findGroupById(idToUpdate));
  res.json(status);
}
