import { PrismaClient } from '@prisma/client'

console.log('Connecting to database')
const prisma: PrismaClient = new PrismaClient()

prisma.$connect()
// console.log('Connected to database')

export default prisma