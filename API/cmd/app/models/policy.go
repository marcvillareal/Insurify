package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Product struct {
	Description *string `json:"description"`
	Type        *string `json:"type"`
	Discount    *string `json:"discount"`
}
type Policy struct {
	ID         primitive.ObjectID `bson:"_id"`
	User_id    string             `json:"user_id"`
	Product    Product            `json:"product"`
	First_name *string            `json:"first_name" validate:"required,min=2,max=100"`
	Last_name  *string            `json:"last_name" validate:"required,min=2,max=100"`
	Premium    *string            `json:"premium"`
	Start_date time.Time          `json:"start_date"`
	End_date   time.Time          `json:"end_date"`
}
