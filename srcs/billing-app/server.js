// crud-master/srcs/billing-app/server.js

require("dotenv").config();

const express = require("express");
const { Pool } = require("pg");
const amqp = require("amqplib");

const app = express();
app.use(express.json());

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  // host: "localhost",
  host: "billing-db",
  database: process.env.POSTGRES_DB_ORDERS,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
});
  
  

const RABBIT_CONFIG = {
  url: `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}`,
  queue: process.env.RABBITMQ_QUEUE
};

// Consumer RabbitMQ
const startConsumer = async () => {
  let conn, channel;

  try {
    conn = await amqp.connect(RABBIT_CONFIG.url);
    channel = await conn.createChannel();
    
    await channel.assertQueue(RABBIT_CONFIG.queue, { durable: true });
    channel.prefetch(1);

    console.log("🔄 Billing worker ready. Waiting for messages...");

    channel.consume(RABBIT_CONFIG.queue, async (msg) => {
      if (!msg) return;

      try {
        const order = JSON.parse(msg.content.toString());
        console.log("Processing order:", order.user_id);

        await pool.query(
          "INSERT INTO orders(user_id, number_of_items, total_amount, created_at) VALUES($1, $2, $3, $4)",
          [order.user_id, order.number_of_items || 1, order.total_amount, order.timestamp || new Date()]
        );

        channel.ack(msg);
        console.log(`✅ Order ${order.user_id} processed`);
      } catch (err) {
        console.error("❌ Processing failed:", err);
        channel.nack(msg, false, true); // Réessayer plus tard
      }
    });

    conn.on("close", () => {
      console.log("RabbitMQ connection closed, reconnecting...");
      setTimeout(startConsumer, 5000);
    });

  } catch (err) {
    console.error("Consumer setup failed:", err);
    if (channel) await channel.close();
    if (conn) await conn.close();
    setTimeout(startConsumer, 5000);
  }
};

// Démarrer le consumer
startConsumer();

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "running" });
});

const PORT = process.env.BILLING_PORT || 7070;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`💰 Billing service running on port ${PORT}`);
});
