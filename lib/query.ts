import pool from "./db";

// this is the query function that will be used to execute all the queries
export async function queryDatabase(sql:any , params :any[] = []) {
    try{
        const [rows] = await pool.query(sql, params);
        return rows;
    }catch(e:any){
        throw new Error(e.message)
    }
    
}