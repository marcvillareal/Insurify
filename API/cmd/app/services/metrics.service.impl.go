package services

import (
	"context"

	"gitlab-se.eeecs.qub.ac.uk/CSC3032-2324/CSC3032-2324-TEAM15/cmd/app/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type MetricServiceImpl struct {
	metricsCollection *mongo.Collection
	ctx               context.Context
}

func NewMetricService(metricsCollection *mongo.Collection, ctx context.Context) MetricsService {
	return &MetricServiceImpl{
		metricsCollection: metricsCollection,
		ctx:               ctx,
	}
}

func (m *MetricServiceImpl) GetAllMetrics(id *string) (*models.Metrics, error) {
	var user *models.Metrics
	// Convert the string ID to ObjectID
	objID, err := primitive.ObjectIDFromHex(*id)
	if err != nil {
		return nil, err
	}
	// Construct the query to find the user by _id
	query := bson.M{"_id": objID}
	// Execute the query and decode the result into the user variable
	err = m.metricsCollection.FindOne(m.ctx, query).Decode(&user)
	// Handle any errors that occurred during the query
	if err != nil {
		return nil, err
	}
	return user, nil
}

func (m *MetricServiceImpl) GetCarMetrics(userID *string) (*models.Car, error) {
	var metrics models.Metrics
	query := bson.D{{Key: "user_id", Value: userID}}
	err := m.metricsCollection.FindOne(m.ctx, query).Decode(&metrics)
	if err != nil {
		return nil, err
	}
	return &metrics.Car_metrics, nil
}

func (m *MetricServiceImpl) GetHomeMetrics(userID *string) (*models.Home, error) {
	var metrics models.Metrics
	query := bson.D{{Key: "user_id", Value: userID}}
	err := m.metricsCollection.FindOne(m.ctx, query).Decode(&metrics)
	if err != nil {
		return nil, err
	}
	return &metrics.Home_metrics, nil
}

func (m *MetricServiceImpl) GetLifeMetrics(userID *string) (*models.Life, error) {
	var metrics models.Metrics
	query := bson.D{{Key: "user_id", Value: userID}}
	err := m.metricsCollection.FindOne(m.ctx, query).Decode(&metrics)
	if err != nil {
		return nil, err
	}
	return &metrics.Life_metrics, nil
}

func (m *MetricServiceImpl) GetMetricsByUserId(userID *string) (*models.Metrics, error) {
	var metrics *models.Metrics
	query := bson.D{{Key: "user_id", Value: userID}}
	err := m.metricsCollection.FindOne(m.ctx, query).Decode(&metrics)
	if err != nil {
		return nil, err
	}
	return metrics, nil
}
