# pip install "python-socketio[client]"

import socketio

# Crear cliente Socket.IO
sio = socketio.Client()

@sio.event
def connect():
    print("✅ Conectado al servidor Socket.IO")

@sio.on('notifications')
def on_notifications(data):
    print(f"📩 Notificación recibida: {data}")

@sio.event
def disconnect():
    print("❌ Desconectado del servidor")

if __name__ == "__main__":
    try:
        # Conectar al servidor (mismo puerto que Adonis)
        sio.connect("http://127.0.0.1:3333", transports=['websocket'])
        sio.wait()
    except Exception as e:
        print("🚨 Error al conectar:", e)
