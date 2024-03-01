import { Kafka, Producer } from "kafkajs";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import prismaClient from "./prisma";

dotenv.config({ path: path.resolve("./.env") });

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

export async function consumeMessage() {
  const consumer = await kafka.consumer({ groupId: "chatwithme" });
  await consumer.connect();
  await consumer.subscribe({ topic: "MESSAGES", fromBeginning: true });
  await consumer.run({
    autoCommit: true,
    autoCommitInterval: 10,
    eachMessage: async ({ message, pause }) => {
      if (!message) return;
      console.log("Message received from kafka");
      try {
        await prismaClient.message.create({
          data: { text: message.value?.toString() || "" },
        });
      } catch (error) {
        console.log("Error saving message to database", error);
        await pause();
        setTimeout(() => {
          console.log("Resuming consumer");
          consumer.resume([{ topic: "MESSAGES" }]);
        }, 60 * 1000);
      }
    },
  });
}

export default kafka;
