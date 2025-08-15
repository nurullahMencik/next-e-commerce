# E-Commerce Web Uygulaması

Bu proje, modern bir e-ticaret uygulamasının temel özelliklerini içerir.
 Ürün listeleme, 
 gelişmiş filtreleme, 
 sepet yönetimi ve ödeme işlemleri gibi ana işlevleri barındırır.

## Canlı Demo

Bu projeyi canlı olarak görmek için aşağıdaki adresi ziyaret edebilirsiniz.



## Özellikler

-   **Ürün Listeleme:** FakeStoreAPI'den çekilen ürünleri şık bir arayüzle listeler.
-   **Gelişmiş Filtreleme:** Ürünleri kategoriye, fiyat aralığına ve sıralama seçeneklerine göre filtreleme imkanı sunar.
-   **Sepet Yönetimi:** Redux Toolkit ile ürün ekleme, çıkarma ve miktar güncelleme gibi sepet işlevleri.
-   **Ürün Detay Sayfası:** Dinamik yönlendirme ile her ürün için özel bir detay sayfası.
-   **Ödeme Sayfası:** Basit bir form ile sipariş özeti ve sahte ödeme işlemi simülasyonu.
-   **Çok Dilli Destek (`i18next`):** Kullanıcıların arayüz dilini Türkçe ve İngilizce arasında değiştirmesine olanak tanır.
-   **Modern Tasarım:** Tailwind CSS ile oluşturulmuş şık ve mobil uyumlu kullanıcı arayüzü.

## Kullanılan Teknolojiler

-   **Next.js (App Router):** Performanslı ve SEO dostu React tabanlı web uygulaması çatısı.
-   **TypeScript:** Statik tipleme ile daha güvenilir ve bakımı kolay kod.
-   **Redux Toolkit (RTK Query):** Durum yönetimi ve veri çekme işlemlerini kolaylaştıran kütüphane.
-   **i18next & react-i18next:** Uluslararasılaştırma ve dil yönetimi.
-   **Tailwind CSS:** Hızlı UI geliştirme için atomik CSS sınıf kütüphanesi.
-   **FakeStoreAPI:** Geliştirme sürecinde ürün verilerini sağlayan ücretsiz API.

---

## Proje Yapısı

Projenin temel dosya ve klasör yapısı aşağıda gösterilmiştir:

````
├── app/
│   ├── cart/
│   │   └── page.tsx
│   ├── checkout/
│   │   └── page.tsx
│   ├── components/
│   │   └── Navbar.tsx
│   ├── products/
│   │   ├── [id]/
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── providers.tsx   <- Yeni provider dosyası
│   ├── favicon.ico
│   ├── globals.css
│   └── layout.tsx
├── public/
│   └── locales/
│       ├── en/
│       │   └── translation.json
│       └── tr/
│           └── translation.json
├── store/
│   ├── slices/
│   │   └── cartSlice.ts
│   ├── services/
│   │   └── productsApi.ts
│   └── store.ts
├── types/
│   └── index.ts
├── .gitignore
├── next.config.mjs
├── package.json
├── README.md
├── tsconfig.json
````

## Hazırlayan
Nurullah Mencik
nurullahemncik42@gmail.com