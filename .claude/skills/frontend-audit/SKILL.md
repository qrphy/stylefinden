---
name: frontend-audit
description: Full frontend quality audit for Stylefinden. Runs frontend-tester to detect all issues (TypeScript, design system, routes, metadata, accessibility), then runs frontend-fixer to apply fixes, then produces a final clean report. Use with /frontend-audit. Can also run in detect-only mode with /frontend-audit --detect.
---

# /frontend-audit

Stylefinden frontend kalite denetimi. Tespit → Düzelt → Raporla döngüsünü tek komutla çalıştırır.

---

## Mod

| Komut | Ne yapar |
|-------|----------|
| `/frontend-audit` | Tespit + Düzelt + Final rapor |
| `/frontend-audit --detect` | Sadece tespit, düzeltme yok |
| `/frontend-audit --fix-only` | Önceki raporu alır, sadece düzeltir |

---

## Orkestrasyon Adımları

### Adım 1 — Tespit (frontend-tester)

`frontend-tester` agent'ını çalıştır. Şunları kontrol eder:

1. TypeScript hataları (`tsc --noEmit`)
2. Build hataları/uyarıları
3. Tasarım sistemi ihlalleri (rounded, shadow, yasak renkler, raw img)
4. Eksik metadata (sayfalarda generateMetadata / export const metadata yok)
5. Hero görsellerde eksik `priority` prop
6. Component'larda `console.log` kalıntıları
7. Route sağlığı (dev server açıksa HTTP status kontrolü)
8. Kullanılmayan `src/data/` dosyaları
9. Hydration red flag'leri (Server Component'ta `Math.random`, `Date.now`)
10. Interaktif component'larda eksik `'use client'`

Rapor şu formatta gelir:
```
CRITICAL: N | HIGH: N | MEDIUM: N | LOW: N
```

### Adım 2 — Karar

`--detect` modundaysa Adım 3'ü atla, Adım 4'e geç.

Eğer CRITICAL veya HIGH issue varsa: Adım 3'e geç.
Eğer sadece MEDIUM/LOW varsa: kullanıcıya sor — otomatik düzeltsin mi?

### Adım 3 — Düzelt (frontend-fixer)

`frontend-fixer` agent'ını tester raporuyla çalıştır. Agent:

- CRITICAL → HIGH → MEDIUM → LOW sırasıyla düzeltir
- Her batch sonrası `tsc --noEmit` çalıştırır
- Otomatik düzeltilemeyen issue'ları "Manuel aksiyon gerekli" olarak işaretler
- Final build doğrulaması yapar

### Adım 4 — Final Rapor

Her iki agent'ın çıktısını birleştirerek final rapor üret:

```markdown
# 🔍 Frontend Audit — Final Report
**Tarih:** [bugün]
**Proje:** Stylefinden

---

## Özet

| | Tespit | Düzeltildi | Kalan |
|-|--------|------------|-------|
| 🔴 CRITICAL | N | N | N |
| 🟠 HIGH | N | N | N |
| 🟡 MEDIUM | N | N | N |
| 🔵 LOW | N | N | N |
| **Toplam** | **N** | **N** | **N** |

---

## Düzeltilen Sorunlar ✅

[Her fix'in kısa özeti — dosya + ne yapıldı]

---

## Kalan / Manuel Aksiyon Gerekli ⚠️

[Otomatik düzeltilemeyen issue'lar — açıklama + önerilen aksiyon]

---

## Build Durumu

- TypeScript: ✅ Temiz / ❌ N hata
- Next.js Build: ✅ Başarılı / ❌ Başarısız

---

## Sonraki Adımlar

[Kalan issue'lar için öncelikli aksiyon listesi]
```

---

## Tetiklenme Koşulları

Bu skill şu durumlarda çalıştırılmalı:

- Yeni sayfa veya component eklendikten sonra
- Büyük bir refactor'dan sonra
- Deploy öncesi kalite kontrol
- Kullanıcı `/frontend-audit` yazdığında
- Türkçe: "frontend'i test et", "hataları kontrol et", "audit yap", "sorunları tara"

---

## Notlar

- `frontend-tester` read-only'dir — hiçbir şey değiştirmez
- `frontend-fixer` minimum değişiklik yapar — refactor değil, tam fix
- Otomatik düzeltilemeyen CRITICAL issue varsa kullanıcıya bildir ve manual adımları ver
- Dev server yoksa route health check atlanır, diğer tüm kontroller çalışır
