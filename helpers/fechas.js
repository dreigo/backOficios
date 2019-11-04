/**
 * Convierte la fecha string a formato fecha
 * @param {string} fecha Fecha a convertir yyyy/mm/dd
 */
function convertirStringAFecha(fecha){
    return new Date(fecha);
}

/**
 * Convierte la fecha a inte en formato epoch
 * @param {string} fecha Fecha a convertir yyyy/mm/dd
 */
function StringAEpoch(fecha){
    fecha = new Date(fecha); // convierte la fecha en Fortamto Date
    let epoch = fecha.getTime()/1000; // Obtiene la fecha en Epoch
    console.log(epoch);
    
    return epoch.toString(); // Obtiene la fecha en Epoch
    
}

/**
 * Suma o Resta dias de la fecha
 * @param {string} fecha Fecha a sumar dias resibe string yyyy/mm/dd
 * @param {number} dias dias que se van a sumar o restar para restar colocar -3, -87, -xx
 */
function SumarDias(fecha, dias){
    fecha = new Date(fecha);
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
}

/**
 * Suma o Resta Anios de la fecha
 * @param {string} fecha Fecha a sumar anios resibe string yyyy/mm/dd
 * @param {number} anios anios que se van a sumar o restar para restar colocar -3, -87, -xx
 */
function SumarAnios(fecha, anios){
    fecha = new Date(fecha);
    fecha.setDate(fecha.getDate() + anios);
    return fecha;
}

module.exports = {
    convertirStringAFecha,
    StringAEpoch,
    SumarDias,
    SumarAnios
}