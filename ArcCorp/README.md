# ArcCorp – React Native CLI Task

Bu uygulama **React Native CLI (Expo değil)** ile geliştirilmiştir.

## Backend

- Swagger referans: `https://api-task-0e2m.onrender.com/docs`
- Kritik kural: Backend Login/Register için **her zaman HTTP 200** döner. Başarı/hata ayrımı **response body içindeki `message`** alanına göre yapılır.

## Çalıştırma (Android)

> Bu proje **React Native CLI** projesidir. Expo kullanılmaz.
> Aşağıdaki komutlar Windows (PowerShell) için de aynıdır.

### 1) Kurulum

```bash
cd ArcCorp
npm install
```

### 2) Metro’yu başlat (Terminal 1)

```bash
cd ArcCorp
npm start
```

### 3) Android’i çalıştır (Terminal 2)

```bash
cd ArcCorp
npm run android
```

> Not: Android emulator açık olmalı veya telefon USB debugging ile bağlı olmalı.

### (Opsiyonel) Backend’i hızlı test et (curl)

```bash
curl -X 'POST' ^
  'https://api-task-0e2m.onrender.com/register' ^
  -H 'accept: application/json' ^
  -H 'Content-Type: application/json' ^
  -d "{\"email\":\"test@example.com\",\"password\":\"123\",\"password_repeat\":\"123\"}"
```

```bash
curl -X 'POST' ^
  'https://api-task-0e2m.onrender.com/login' ^
  -H 'accept: application/json' ^
  -H 'Content-Type: application/json' ^
  -d "{\"email\":\"test@example.com\",\"password\":\"123\"}"
```

## Android hata: `SDK location not found`

Eğer build sırasında şu hatayı görürsen:
`SDK location not found. Define a valid SDK location with an ANDROID_HOME environment variable or by setting the sdk.dir path in your project's local properties file`

Bu, Android SDK yolunun makinede tanımlı olmadığı anlamına gelir.

- Android Studio → **Settings** → **Android SDK** ekranından SDK’nın bulunduğu dizini öğren (çoğunlukla):
  - `C:\Users\<YOU>\AppData\Local\Android\Sdk`
- `ArcCorp/android/local.properties.example` dosyasını `ArcCorp/android/local.properties` olarak kopyala ve `sdk.dir` satırını kendi yolunla güncelle.
  - Windows’ta ters slash **çift** yazılır: `C:\\Users\\...\\Android\\Sdk`

Alternatif (çevre değişkeni):
- `ANDROID_HOME` veya `ANDROID_SDK_ROOT` = SDK klasörü
- `PATH` içine şunları ekle:
  - `%ANDROID_HOME%\platform-tools`
  - `%ANDROID_HOME%\emulator`

## Android hata: NDK indirilemiyor / Disk dolu

Eğer şu tip bir hata görürsen:
- `Failed to install the following SDK components: ndk;27.1.12297006`
- `java.io.IOException: There is not enough space on the disk`

Çözüm:

- **C:** sürücünde yeterli boş alan aç (öneri: **en az 10–15 GB**).
- Android Studio → **SDK Manager** → **SDK Tools**:
  - **NDK (Side by side)** kur (projede beklenen: `27.1.12297006`)
- Sonra tekrar:

```bash
cd ArcCorp
npm run android
```

## Android hata: `[CXX1101] NDK ... did not have a source.properties file`

Eğer şu hatayı görürsen:
`[CXX1101] NDK at ... did not have a source.properties file`

Bu, ilgili NDK sürümünün **bozuk / yarım kurulmuş** olduğu anlamına gelir.

Çözüm (önerilen):
- Android Studio → **SDK Manager** → **SDK Tools** → **NDK (Side by side)** → (Show Package Details) → gereken sürümü kur/yeniden kur.

Geçici çözüm:
- Projenin `android/build.gradle` içindeki `ndkVersion` değerini, SDK altında **sağlam** olan bir NDK sürümüne ayarla (klasörde `source.properties` olan).

## Sık hata: `react-native-cli` (global) deprecated

Eğer Metro’yu şu şekilde başlatmaya çalışıyorsan:

```bash
react-native-cli start
```

Şu hatayı alırsın:
`react-native/cli is deprecated, please use @react-native-community/cli instead`

Çözüm:

- Global `react-native-cli`’yi kaldır:

```bash
npm uninstall -g react-native-cli
```

- Projeyi **ArcCorp klasörü içinde** şu şekilde çalıştır:

```bash
cd ArcCorp
npm start
```

Alternatif olarak:

```bash
npx react-native start
```

## Not: Node sürümü

Bu projede `react-native@0.83.1` kullanılıyor. Bazı paketler **Node >= 20.19.4** beklediği için Node `v20.14.0` ile `npm` sadece uyarı verir; metro/build sırasında hata alırsan Node’u **20.19.4+** yapman gerekir.

## Akış

- **Login** (`POST /login`): Backend her zaman 200 döndüğü için başarı, response body’deki `message` alanından anlaşılır. `message === "OK"` ise Home’a gider ve `message` Home’da gösterilir.
- **Register** (`POST /register`): Başarı, `user_id` varlığı veya `message === "Kayıt başarılı"` ile anlaşılır. Başarılıysa Home’a gider ve `message` Home’da gösterilir.
- **Home**: message + “Hoş geldiniz” + Logout (Login’e reset)
