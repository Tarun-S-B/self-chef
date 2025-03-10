const socket = new WebSocket("wss://self-chef-igom.onrender.com/ws");

socket.onopen = () => {
    console.log("WebSocket connection established.");
};

socket.onmessage = (event) => {
    console.log("Received message: ", event.data);
};

socket.onerror = (error) => {
    console.log("WebSocket error: ", error);
};

socket.onclose = () => {
    console.log("WebSocket connection closed.");
};
