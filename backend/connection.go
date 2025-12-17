package main

import "github.com/gorilla/websocket"

type Connection struct {
	ws *websocket.Conn
}

func (c *Connection) WriteJSON(v interface{}) error {
	return c.ws.WriteJSON(v)
}

func (c *Connection) ReadJSON(v interface{}) error {
	return c.ws.ReadJSON(v)
}
