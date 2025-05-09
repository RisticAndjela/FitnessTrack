const express = require('express');

class UserController {
    constructor(userService) {
        this.userService = userService;
        this.create = this.create.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.login = this.login.bind(this);
    }

    async create(req, res) {
        try {
            const user = await this.userService.createUser(req.body);
            res.status(201).json(user);
        } catch (err) {
            if (err.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({ error: 'Username already exists' });
            }
            res.status(500).json({ error: err.message });
        }
    }

    async getAll(req, res) {
        try {
            const users = await this.userService.getAllUsers();
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getById(req, res) {
        try {
            const user = await this.userService.getUserById(req.params.id);
            if (!user) return res.status(404).json({ message: 'User not found' });
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async update(req, res) {
        try {
            const updated = await this.userService.updateUser(req.params.id, req.body);
            if (!updated) return res.status(404).json({ message: 'User not found' });
            res.status(200).json(updated);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async delete(req, res) {
        try {
            const deleted = await this.userService.deleteUser(req.params.id);
            if (deleted === 0) return res.status(404).json({ message: 'User not found' });
            res.status(204).send();
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async login(req, res) {
        const { username, password } = req.body;
        try {
            const user = await this.userService.loginUser(username, password);
            if (!user) {
                return res.status(401).json({ error: 'Invalid username or password' });
            }
            res.status(200).json(user);
        } catch (err) {
            console.error('Login failed:', err);
            res.status(500).json({ error: err.message });
        }
    }
}

// wraping the controller for direct aproach
const userRouter = (userService) => {
    const controller = new UserController(userService);
    const router = express.Router();

    router.post('/', controller.create);
    router.get('/', controller.getAll);
    router.get('/:id', controller.getById);
    router.put('/:id', controller.update);
    router.delete('/:id', controller.delete);
    router.post('/login', controller.login);

    return router;
};

module.exports = userRouter;
