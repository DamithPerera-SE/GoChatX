package main

import "time"

type Message struct {
	Username  string
	Content   string
	Timestamp string
}

func NewMessage(username, content string) Message {
	return Message{
		Username:  username,
		Content:   content,
		Timestamp: time.Now().Format("15:04:05"),
	}
}
