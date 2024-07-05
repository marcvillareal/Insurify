package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Car struct {
	Vehicle_make       *string `json:"vehicle_make"`
	Acceleration_score *string `json:"acceleration_score"`
	Braking_score      *string `json:"braking_score"`
	Average_speed      *string `json:"average_speed"`
	Miles_travelled    *string `json:"miles_travelled"`
}

type Home struct {
	Fire_incidents       *string `json:"fire_incidents"`
	Theft_incidents      *string `json:"theft_incidents"`
	Flood_incidents      *string `json:"flood_incidents"`
	Policy_premium       *string `json:"policy_premium"`
	Claimed_amount       *string `json:"claimed_amount"`
	Total_coverage_limit *string `json:"total_coverage_limit"`
}

type Life struct {
	Age                  *string   `json:"age"`
	Health_conditions    *string   `json:"health_conditions"`
	Smoker               *string   `json:"smoker"`
	Insurance_coverage   *string   `json:"insurance_coverage"`
	Total_policy_value   *string   `json:"total_policy_value"`
	Total_premium_paid   *string   `json:"total_premium_paid"`
	Last_medical_checkup time.Time `json:"last_medical_checkup"`
}

type Metrics struct {
	ID           primitive.ObjectID `bson:"_id"`
	User_id      string             `bson:"user_id"`
	Car_metrics  Car                `json:"car_metrics"`
	Home_metrics Home               `json:"home_metrics"`
	Life_metrics Life               `json:"life_metrics"`
}
