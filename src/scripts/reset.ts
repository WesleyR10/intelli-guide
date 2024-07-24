import { db } from '@/services/database'

const main = async () => {
  try {
    console.log('Reseting the database')

    // Deletar dados de todas as tabelas
    await db.userSubscription.deleteMany({})
    await db.challengeProgress.deleteMany({})
    await db.challengeOption.deleteMany({})
    await db.challenges.deleteMany({})
    await db.lessons.deleteMany({})
    await db.units.deleteMany({})
    await db.userProgress.deleteMany({})
    await db.courses.deleteMany({})
  } catch (error) {
    console.error(error)
    throw new Error('Failed to reset database')
  }
}

main()