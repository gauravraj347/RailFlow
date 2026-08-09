/**
 * Centralized Kafka topic definitions.
 * Every service imports from here so topic names stay in sync.
 */
const KAFKA_TOPICS = {
     // Notification topics (user-service -> notification-service)
     OTP_EMAIL: 'notification.otp-email',
     WELCOME_EMAIL: 'notification.welcome-email',
   
     // Dead-letter queues (per service — poison messages land here)
     DLQ_BOOKING: 'dlq.booking-service',
     DLQ_INVENTORY: 'dlq.inventory-service',
     DLQ_SEARCH: 'dlq.search-service',
     DLQ_NOTIFICATION: 'dlq.notification-service',
};

/**
 * Max retries before a consumer message is sent to the DLQ.
 * After this many failures the message is considered poison.
 */
const DLQ_MAX_RETRIES = 3;

module.exports = { KAFKA_TOPICS, DLQ_MAX_RETRIES };