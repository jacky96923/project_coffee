import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.renameTable("order", "order_entry")
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.renameTable("order_entry", "order")
}

