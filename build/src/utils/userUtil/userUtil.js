"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getUser = void 0;
const user_1 = require("../../models/user");
const userStore = new user_1.UserStore();
async function getUser() {
    try {
        return await userStore.index();
    }
    catch (error) {
        return error.message;
    }
}
exports.getUser = getUser;
async function getUserById(userId) {
    try {
        return await userStore.show(parseInt(userId));
    }
    catch (error) {
        return error.message;
    }
}
exports.getUserById = getUserById;
async function createUser(newUser) {
    try {
        const user = JSON.parse(newUser);
        const createdUser = await userStore.create(user);
        return `User created with ID: ${createdUser.id}`;
    }
    catch (error) {
        return `Error creating the user: ${error.message}`;
    }
}
exports.createUser = createUser;
async function updateUser(userId, updatedUser) {
    try {
        const user = JSON.parse(updatedUser);
        user.id = parseInt(userId);
        const result = await userStore.update(user);
        if (result) {
            return 'User updated successfully.';
        }
        else {
            return 'User not found.';
        }
    }
    catch (error) {
        return `Error updating the user: ${error.message}`;
    }
}
exports.updateUser = updateUser;
async function deleteUser(userId) {
    try {
        const result = await userStore.delete(parseInt(userId));
        if (!result) {
            return 'User deleted successfully.';
        }
        else {
            return 'User not found.';
        }
    }
    catch (error) {
        return `Error deleting the user: ${error.message}`;
    }
}
exports.deleteUser = deleteUser;
//# sourceMappingURL=userUtil.js.map