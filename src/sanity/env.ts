// Sanity bağlantı değişkenleri — .env'den okunur; eksik olursa build anında hata fırlatır.
// Değerlerin tanımlı olup olmadığını assertValue ile zorunlu kılar.
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-05-02'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing env: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing env: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

// Çevre değişkenini doğrular — undefined ise açıklayıcı hata mesajıyla uygulamayı durdurur.
function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) throw new Error(errorMessage)
  return v
}
