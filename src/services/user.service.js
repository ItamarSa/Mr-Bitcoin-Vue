'use strict'

import { dbService } from './db.service.js'
import { storageService } from './storage.service.js'

const KEY = 'usersDB'
const LOGGED_IN_USER = 'LOGGED_IN_USER'

export const userService = {
    query,
    get,
    remove,
    save,
    getEmptyUser,
    getLoggedInUserFromStorage,
    saveLoggedInUser
}

async function query() {
    var users = await dbService.query(KEY)
    console.log(users)
    if (!users || !users.length) {
        users = _createDefaultUsers()
        await dbService.insert(KEY, users)
    }
    return users
}

async function get(name) {
    console.log('name', name)
    return await dbService.getName(KEY, name)
}

async function remove(id) {
    return await dbService.remove(KEY, id)
}

async function save(user) {
    if (user._id) return await dbService.put(KEY, user)
    else return await dbService.post(KEY, user)
}

function getEmptyUser() {
    return {
        name: '',
        balance: 100,
        transactions: [],
    }
}

function _createDefaultUsers() {
    return [
        _createUser('123', "Ochoa", 100, []),
        _createUser('124', "Hallie Mclean", 100, []),
        _createUser('125', "Parsons Norris", 100, []),
        _createUser('126', "Rachel Lowe", 100, []),
    ]
}

function _createUser(_id, name, balance, transactions) {
    return {
       _id, name, balance, transactions
    }
}

function saveLoggedInUser(user) {
    storageService.save(LOGGED_IN_USER, user)
}

function getLoggedInUserFromStorage() {
    return storageService.load(LOGGED_IN_USER)
}