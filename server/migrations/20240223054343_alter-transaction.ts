import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable("transaction", (table)=>{
        table.string("stripe_id").alter();
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable("transaction", (table)=>{
        table.integer("stripe_id").alter();
    })
}

