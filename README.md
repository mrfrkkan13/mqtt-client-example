# MQTT Client Application

Bu uygulama, MQTT protokolü üzerinden mesaj alışverişi yapabilen bir Node.js client uygulamasıdır. Docker ve Docker Compose kullanılarak containerize edilmiştir.

## Özellikler

- MQTT broker'a bağlanma ve mesaj alışverişi
- Otomatik yeniden bağlanma
- Configurable broker ve topic ayarları
- Docker desteği
- Graceful shutdown
- TypeScript desteği
- Hot-reload ile geliştirme modu

## Gereksinimler

- Docker
- Docker Compose
- Node.js (geliştirme için)
- npm (geliştirme için)

## Kurulum ve Çalıştırma

1. Projeyi klonlayın:

   ```bash
   git clone https://github.com/kullanıcı-adı/proje-adı.git
   cd proje-adı
   ```

2. Environment değişkenlerini ayarlayın:

   `.env` dosyası oluşturun:

   ```env
   MQTT_BROKER=mqtt://test.mosquitto.org:1883
   MQTT_TOPIC=your/topic/name
   ```

3. Docker ile uygulamayı başlatın:

   ```bash
   docker-compose up -d
   ```

## Environment Variables

| Değişken    | Açıklama             | Varsayılan Değer                |
| ----------- | -------------------- | ------------------------------- |
| MQTT_BROKER | MQTT broker adresi   | mqtt://test.mosquitto.org:1883  |
| MQTT_TOPIC  | Abone olunacak topic | eteration/ekmek_arasi/mqtt/test |

## Kullanım Örnekleri

1. Varsayılan ayarlarla çalıştırma:

   ```bash
   docker-compose up
   ```

2. Özel broker ve topic ile çalıştırma:

   ```bash
   MQTT_BROKER=mqtt://example.com:1883 MQTT_TOPIC=custom/topic docker-compose up
   ```

3. Arka planda çalıştırma:

   ```bash
   docker-compose up -d
   ```

4. Logları görüntüleme:

   ```bash
   docker-compose logs -f
   ```

5. Uygulamayı durdurma:

   ```bash
   docker-compose down
   ```

## Geliştirme

1. Bağımlılıkları yükleyin:

   ```bash
   npm install
   ```

2. Geliştirme modunda çalıştırın:

   ```bash
   npm run dev
   ```

3. Production build almak için:

   ```bash
   npm run build
   ```

4. Production build'i çalıştırmak için:

   ```bash
   npm start
   ```

## Proje Yapısı
