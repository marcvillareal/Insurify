package services

import (
	"context"

	"gitlab-se.eeecs.qub.ac.uk/CSC3032-2324/CSC3032-2324-TEAM15/cmd/app/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type ClaimsServiceImpl struct {
	claimsCollection *mongo.Collection
	ctx              context.Context
}

func NewClaimsService(claimsCollection *mongo.Collection, ctx context.Context) ClaimsService {
	return &ClaimsServiceImpl{
		claimsCollection: claimsCollection,
		ctx:              ctx,
	}
}

func (m *ClaimsServiceImpl) GetClaimsByUserId(userID *string) (*models.Claims, error) {
	var claims *models.Claims
	query := bson.D{{Key: "user_id", Value: userID}}
	err := m.claimsCollection.FindOne(m.ctx, query).Decode(&claims)
	if err != nil {
		return nil, err
	}
	return claims, nil
}
