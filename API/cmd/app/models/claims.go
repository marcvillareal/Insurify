package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Claims struct {
	ID               primitive.ObjectID `bson:"_id"`
	User_id          string             `json:"user_id"`
	Accident_date    time.Time          `json:"accident_date"`
	Parties_involved *string            `json:"parties_involved"`
	Liability        *string            `json:"liability"`
	Claims_made      bool               `json:"claims_made"`
	No_claims_bonus  *string            `json:"no_claims_bonus"`
}
