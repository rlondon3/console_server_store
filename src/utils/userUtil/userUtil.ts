import { User, UserStore } from "../../models/user";

const userStore = new UserStore();

export async function getUser(): Promise<User[]> {
  try {
    return await userStore.index()
  } catch (error) {
    return error.message;
  }
}

export async function getUserById(userId: string): Promise<User> {
  try {
    return await userStore.show(parseInt(userId));
  } catch (error) {
    return error.message;  
  }
}

export async function createUser(newUser: string): Promise<string> {
  try {
    const user = JSON.parse(newUser);
    const createdUser = await userStore.create(user);
    return `User created with ID: ${createdUser.id}`;
  } catch (error) {
    return `Error creating the user: ${error.message}`;
  }
}

export async function updateUser(userId: string, updatedUser: string): Promise<string> {
  try {
    const user = JSON.parse(updatedUser);
    user.id = parseInt(userId);
    const result = await userStore.update(user);
    
    if (result) {
      return 'User updated successfully.';
    } else {
      return 'User not found.';
    }
  } catch (error) {
    return `Error updating the user: ${error.message}`;
  }
}

export async function deleteUser(userId: string): Promise<string> {
  try {
    const result = await userStore.delete(parseInt(userId));
    
    if (!result) {
      return 'User deleted successfully.';
    } else {
      return 'User not found.';
    }
  } catch (error) {
    return `Error deleting the user: ${error.message}`;
  }
}
