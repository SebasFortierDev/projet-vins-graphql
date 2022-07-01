const query = require("../database/mariadb");

class Vin {
    constructor(id, { name, year, grade}) {
        this.id = id
        this.name = name
        this.year = year
        this.grade = grade
    }
}

async function getVins() {
    return await query('SELECT * FROM vins')
}

async function getVin(id) {
    const res = await query('SELECT * FROM vins WHERE id = ?', [id])

    if (!res[0]) {
        return null
    }

    const name = res[0].name
    const year = res[0].year
    const grade = res[0].grade

    return new Vin(id, {name, year, grade})
}

async function createVin({ name, year, grade }) {
    const id = require('crypto').randomBytes(10).toString('hex')
    const res = await query('INSERT INTO vins value (?, ?, ?, ?)', [id, name, year, grade])

    if (!res.affectedRows) {
        return null
    }

    return new Vin(id, { name, year, grade })
}

async function updateVin(id, { name, year, grade }) {
    const res = await query('UPDATE vins SET name = ?, year = ?, grade = ? WHERE id = ?',
        [name, year, grade, id])

    if (!res.affectedRows) {
        return null
    }

    return new Vin(id, { name, year, grade }) // Ou par la BD ?
}

/**
 * Permet de vérifier si l'année du vin est valide

 * @param year l'année du vin

 * @return {boolean} True si l'année du vin est entre 1900 et 2022 inclusivement
 */
function validateYear(year) {
    return year >= 1900 && year <= 2022
}

/**
 * Permet de vérifier si la note du vin est valide

 * @param grade La note du vin

 * @return {boolean} True si la note est entre 1 et 5 inclusivement
 */
function validateGrade(grade) {
    return grade >= 1 && grade <= 5
}


module.exports = {Vin, getVins, getVin, createVin, updateVin, validateYear, validateGrade}
