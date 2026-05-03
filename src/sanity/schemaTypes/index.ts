// Sanity Studio'ya kayıtlı tüm içerik şemaları — buradaki sıra Studio'daki belge menüsünü etkiler.
import { accessory } from './accessory'
import { hairstyle } from './hairstyle'
import { outfit } from './outfit'
import { post } from './post'
import { trend } from './trend'

export const schemaTypes = [outfit, accessory, hairstyle, trend, post]
