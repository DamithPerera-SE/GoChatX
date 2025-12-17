package main

func (c *Client) readPump() {
	defer func() {
		c.hub.unregister <- c
		c.conn.ws.Close()
	}()

	for {
		var msg Message
		if err := c.conn.ReadJSON(&msg); err != nil {
			break
		}
		c.hub.broadcast <- msg
	}
}

func (c *Client) writePump() {
	defer c.conn.ws.Close()
	for msg := range c.send {
		if err := c.conn.WriteJSON(msg); err != nil {
			break
		}
	}
}
