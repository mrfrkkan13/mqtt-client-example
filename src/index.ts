import * as mqtt from "mqtt";

class MQTTClient {
  private client: mqtt.MqttClient;
  private readonly broker: string;
  private readonly topic: string;

  constructor(broker: string, topic: string) {
    this.broker = broker;
    this.topic = topic;

    this.client = mqtt.connect(this.broker, {
      clientId: `mqtt_client_${Math.random().toString(16).slice(3)}`,
    });

    this.client.on("connect", this.onConnect.bind(this));
    this.client.on("error", this.onError.bind(this));
    this.client.on("message", this.onMessage.bind(this));

    // Bağlantı kopması durumunda yeniden bağlanma
    this.client.on("close", () => {
      console.log("Bağlantı koptu, yeniden bağlanılıyor...");
    });

    this.client.on("reconnect", () => {
      console.log("Yeniden bağlanılıyor...");
    });
  }

  private onConnect(): void {
    console.log("Broker'a bağlantı başarılı!");

    this.client.subscribe(this.topic, (err) => {
      if (!err) {
        console.log(`${this.topic} topic'ine abone olundu`);
        this.publishMessage("Test bağlantı mesajı!");
      }
    });
  }

  private onError(error: Error): void {
    console.log("Bağlantı hatası:", error);
  }

  private onMessage(topic: string, message: Buffer): void {
    console.log(`Mesaj alındı:\nTopic: ${topic}\nMesaj: ${message.toString()}`);
  }

  public publishMessage(message: string): void {
    this.client.publish(
      this.topic,
      message,
      { qos: 0, retain: false },
      (err) => {
        if (err) {
          console.error("Mesaj yayınlama hatası:", err);
        } else {
          console.log(`Mesaj yayınlandı: ${message}`);
        }
      }
    );
  }

  public disconnect(): void {
    this.client.end();
    console.log("Bağlantı kapatıldı");
  }
}

// Environment variables'dan broker ve topic bilgilerini al
const broker = process.env.MQTT_BROKER || "mqtt://test.mosquitto.org:1883";
const topic = process.env.MQTT_TOPIC || "#";

const mqttClient = new MQTTClient(broker, topic);

// Her 2 saniyede bir mesaj gönder
setInterval(() => {
  mqttClient.publishMessage(`Test mesajı - ${new Date().toLocaleTimeString()}`);
}, 2000);

// Graceful shutdown için process events'leri dinle
process.on("SIGTERM", () => {
  console.log("SIGTERM sinyali alındı, uygulama kapatılıyor...");
  mqttClient.disconnect();
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("SIGINT sinyali alındı, uygulama kapatılıyor...");
  mqttClient.disconnect();
  process.exit(0);
});
