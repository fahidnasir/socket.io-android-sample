package com.github.nkzawa.socketio.androidchat;

import android.app.Application;
import io.socket.client.IO;
import io.socket.client.Socket;

import java.net.URISyntaxException;

public class ChatApplication extends Application {

    private Socket mSocket;
    {
        try {
            mSocket = IO.socket("http://10.0.2.78:3355/");
        } catch (URISyntaxException e) {
            throw new RuntimeException(e);
        }
    }

    public Socket getSocket() {
        return mSocket;
    }
}
