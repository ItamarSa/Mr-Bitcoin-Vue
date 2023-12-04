'use strict'

import { dbService } from './db.service.js'

const KEY = 'users'

export const userService = {
    query,
    get,
    remove,
    save,
    getEmptyUser,
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
        balance: 0,
        transactions: [],
    }
}

function _createDefaultUsers() {
    return [
        _createUser("Ochoa", 100, []),
        _createUser("Hallie Mclean", 100, []),
        _createUser("Parsons Norris", 100, []),
        _createUser("Rachel Lowe", 100, []),
    ]
}

function _createUser(name, balance, transactions) {
    return {
        name, balance, transactions
    }
}