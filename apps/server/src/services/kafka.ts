import { Kafka, Producer } from "kafkajs";
import fs from "fs";
import path from "path";

const kafka = new Kafka({
  brokers: [process.env.KAFKA_HOST as string],
  ssl: { ca: fs.readFileSync(path.resolve("./ca.pem")) },
  sasl: {
    username: process.env.KAFKA_USERNAME || "",
    password: process.env.KAFKA_PASSWORD || "",
    mechanism: "plain",
  },
});

let producer: Producer | null = null;

export async function createProducer() {
  if (producer) return producer;
  const _producer = kafka.producer();
  await _producer.connect();
  producer = _producer;
  return producer;
}

export async function produceMessage(message: string) {
  const _producer = await createProducer();
  await _producer.send({
    messages: [{ key: `message-${Date.now()}`, value: message }],
    topic: "MESSAGES",
  });
  console.log("Message sent to kafka");
  return true;
}

export default kafka;
