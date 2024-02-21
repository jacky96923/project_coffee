import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable("transaction", (table)=>{
        table.dropColumn("pickup_time");
        table.dropColumn("order_time");
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable("transaction", (table)=>{
        table.time("order_time").notNullable();
        table.time("pickup_time").notNullable();
    })
}

