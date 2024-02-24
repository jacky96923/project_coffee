import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable("transaction", (table)=>{
        table.timestamp("pickup_time", { useTz: false }).notNullable();
        table.timestamp("order_time", { useTz: false }).notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable("transaction", (table)=>{
        table.dropColumn("pickup_time");
        table.dropColumn("order_time");
    })
}

