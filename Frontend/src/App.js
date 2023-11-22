import React from "react";
import { Provider } from "react-redux";
import "./App.scss";
import "./css/auth.scss";
import { store } from "./redux/store";
import MyRouter from "./routes/MyRouter";

function App() {

  // const [socket, setSocket] = useState(null);

  // useEffect(() => {
  //   const socket = io('http://localhost:5000', {
  //     cors: {
  //       origin: 'http://localhost:5000', // Change this to your server's origin
  //     },
  //   });
  //   setSocket(socket);
  //   // Listen for incoming messages
  //   socket.on('notification', (notification) => {
  //     console.log('Received message:', notification);
  //   });

  //   socket.on('message', (data) => {
  //     console.log('Connected! with Hello World wala thingL  :', data);
  //   }
  //   );

  //   socket.on('connection', (data) => {
  //     console.log('Connected!', data);
  //   }
  //   );

  //   return () => {
  //     if (socket) {
  //       socket.disconnect();
  //     }
  //   };
  // }, []);

  return (
    <div className="app">
      <Provider store={store}>
        <MyRouter />

      </Provider>
    </div>
  );
}

export default App;
