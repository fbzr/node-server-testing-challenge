const router = require('express').Router();

let users = [
    {
        id: 1,
        name: "Jonny",
        department: "devlopment"
    },
    {
        id: 2,
        name: "Nathi",
        department: "HR"
    }
];

router.get('/', (req, res) => {
    res.json(users);
});

router.post('/', (req, res) => {
    const { name, department } = req.body;
    if (!name || !department) {
        return res.status(400).json({
            errorMessage: 'Required field missing'
        });
    }
    users.unshift({
        id: users.length + 1,
        ...req.body
    });
    res.status(201).json(users[0]);
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const updatedUsers = users.filter(user => user.id.toString() !== id);
    
    if (updatedUsers.length !== users.length - 1) {
        return res.status(404).json({
            errorMessage: 'Invalid Id'
        });
    }

    users = updatedUsers;

    res.json({
        message: 'User removed'
    });
});

module.exports = router;