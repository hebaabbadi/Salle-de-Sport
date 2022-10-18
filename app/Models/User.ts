import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import Profile from './Profile'
import { column, beforeSave, BaseModel,hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {

  @hasOne(() => Profile)
  public profile: HasOne<typeof Profile>

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string 
  
  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string
  
  @column()
  public role: number

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (User: User) {
    if (User.$dirty.password) {
      User.password = await Hash.make(User.password)
    }
  }
}
