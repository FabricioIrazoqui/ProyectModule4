import { registerAs } from '@nestjs/config'
import { config as dotenvConfig } from 'dotenv'
import { DataSource, DataSourceOptions } from 'typeorm'
dotenvConfig({ path: '.env' })

const config = {
    type: 'postgres',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_HOST),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    entities: ['dist/**/*.entity.{.ts,.js}'],
    migrations: [],
    autoLoadEntities: true,
    logging: true,
    synchronize: true,
    dropSchema: true
}

export const typeOrmConfig = registerAs('typeorm', () => config)
export const connectionSource = new DataSource(config as DataSourceOptions)