import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable("transaction", (table)=>{
        table.string("payment_status")
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable("transaction", (table)=>{
        table.dropColumn("payment_status")
    })
}

