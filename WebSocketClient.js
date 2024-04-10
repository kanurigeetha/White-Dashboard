// WebSocketClient.js
class WebSocketClient {
    constructor(url) {
      this.url = url;
      this.websocket = new WebSocket(url);
      this.websocket.onopen = this.onOpen;
      this.websocket.onmessage = this.onMessage;
      this.websocket.onclose = this.onClose;
      this.websocket.onerror = this.onError;
    }
  
    onOpen = () => {
      console.log('WebSocket connected');
    };
  
    onMessage = (message) => {
      console.log('WebSocket message received:', message.data);
      if (this.onMessageCallback) {
        this.onMessageCallback(message.data);
      }
    };
  
    onClose = () => {
      console.log('WebSocket disconnected');
    };
  
    onError = (error) => {
      console.error('WebSocket error:', error);
    };
  
    send(message) {
      if (this.websocket.readyState === WebSocket.OPEN) {
        this.websocket.send(message);
      } else {
        console.error('WebSocket is not open');
      }
    }
  }
  
  export default WebSocketClient;
  