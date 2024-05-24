<h1 align="center" id="title">Not Simple Chat App</h1>

<h2>🧐 Features</h2>

Here're some of the project's best features:

- Scalable Messaging: Utilizes Kafka for message handling and Redis Streams for inter-server communication ensuring optimal throughput even under heavy loads. The system dynamically scales to accommodate increasing message traffic.
- Efficient Load Balancing: Employs Redis Streams for inter-server communication enabling load balancing and seamless message routing across horizontally scaled server instances.
- Microservices Architecture: Containerized backend services including Kafka Redis Zookeeper and PostgreSQL using Docker for enhanced modularity and scalability. Each service operates independently facilitating easier management and deployment.
- Responsive Frontend: Developed a React.js UI with WebSocket connections for efficient communication with the backend ensuring a smooth user experience. The frontend is designed to be responsive and intuitive providing users with a seamless chat interface across devices.

<h2>🛠️ Installation Steps:</h2>

<p>1. Clone this repository:</p>

```
git clone https://github.com/tejasvi541/Not-Simple-ChatApp
```

<p>2. Navigate to the project directory:</p>

```
cd Not-Simple-ChatApp
```

<p>3. Start the services using Docker Compose:</p>

```
docker compose up
```

<p>4. This project uses npm workspaces for dependency management. Ensure you have npm installed then run 'npm install' to install dependencies for both backend and frontend.</p>

```
npm install
```

<p>5. Once the services are running start the project:</p>

```
npm run dev
```

<h2>💻 Built with</h2>

Technologies used in the project:

- Typescript
- React
- Socket.io
- Kafka
- Redis
- PostgreSQL
- Docker
