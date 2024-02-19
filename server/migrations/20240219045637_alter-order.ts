import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable("order", (table)=>{
        table.integer("quantity")
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable("order", (table)=>{
        table.dropColumn("quantity")
    })
}

