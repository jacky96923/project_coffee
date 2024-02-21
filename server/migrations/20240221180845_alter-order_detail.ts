import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable("order_detail", (table)=>{
        table.renameColumn("order_id", "order_entry_id")
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable("order_detail", (table)=>{
        table.renameColumn("order_entry_id", "order_id")
    })
}

