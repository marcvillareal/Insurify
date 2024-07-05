package integration_tests

import (
	"context"
	"encoding/json"
	"errors"
	"log"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"gitlab-se.eeecs.qub.ac.uk/CSC3032-2324/CSC3032-2324-TEAM15/cmd/app/controllers"
	"gitlab-se.eeecs.qub.ac.uk/CSC3032-2324/CSC3032-2324-TEAM15/cmd/app/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Define MetricsService interface
type MetricsService interface {
	GetAllMetrics(id *string) (*models.Metrics, error)
	GetCarMetrics(userID *string) (*models.Car, error)
	GetHomeMetrics(userID *string) (*models.Home, error)
	GetLifeMetrics(userID *string) (*models.Life, error)
	GetMetricsByUserId(userID *string) (*models.Metrics, error)
}

// Define mockMetricsService type
type mockMetricsService struct {
	mock.Mock
}

func (m *mockMetricsService) GetAllMetrics(id *string) (*models.Metrics, error) {
	args := m.Called(id)
	return args.Get(0).(*models.Metrics), args.Error(1)
}

func (m *mockMetricsService) GetCarMetrics(userID *string) (*models.Car, error) {
	args := m.Called(userID)
	return args.Get(0).(*models.Car), args.Error(1)
}

func (m *mockMetricsService) GetHomeMetrics(userID *string) (*models.Home, error) {
	args := m.Called(userID)
	return args.Get(0).(*models.Home), args.Error(1)
}

func (m *mockMetricsService) GetLifeMetrics(userID *string) (*models.Life, error) {
	args := m.Called(userID)
	return args.Get(0).(*models.Life), args.Error(1)
}

func (m *mockMetricsService) GetMetricsByUserId(userID *string) (*models.Metrics, error) {
	args := m.Called(userID)
	return args.Get(0).(*models.Metrics), args.Error(1)
}

// InitializeTestMetricsDatabase initializes the test database with test data
func InitializeTestMetricsDatabase() (*mongo.Collection, error) {
	mongoURI := os.Getenv("MONGODB_URI")
	if mongoURI == "" {
		log.Fatal("MONGODB_URI not found in environment variables")
		return nil, errors.New("MONGODB_URI not found in environment variables")
	}

	clientOptions := options.Client().ApplyURI(mongoURI)
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatal("Failed to connect to MongoDB:", err)
		return nil, err
	}
	defer func() {
		if err := client.Disconnect(ctx); err != nil {
			log.Fatal("Failed to disconnect from MongoDB:", err)
		}
	}()

	dbName := "Insurify_Test"
	collectionName := "Metrics"
	collection := client.Database(dbName).Collection(collectionName)

	count, err := collection.CountDocuments(ctx, bson.D{})
	if err != nil {
		log.Fatal("Failed to count documents in MongoDB:", err)
		return nil, err
	}

	if count == 0 {
		metricsData := []interface{}{
			models.Metrics{
				ID:      primitive.NewObjectID(),
				User_id: "1",
				Car_metrics: models.Car{
					Vehicle_make:       pointerString("Toyota"),
					Acceleration_score: pointerString("8"),
					Braking_score:      pointerString("7"),
					Average_speed:      pointerString("60"),
					Miles_travelled:    pointerString("5000"),
				},
				Home_metrics: models.Home{
					Fire_incidents:       pointerString("2"),
					Theft_incidents:      pointerString("1"),
					Flood_incidents:      pointerString("0"),
					Policy_premium:       pointerString("1000"),
					Claimed_amount:       pointerString("500"),
					Total_coverage_limit: pointerString("10000"),
				},
				Life_metrics: models.Life{
					Age:                  pointerString("35"),
					Health_conditions:    pointerString("Good"),
					Smoker:               pointerString("No"),
					Insurance_coverage:   pointerString("500000"),
					Total_policy_value:   pointerString("100000"),
					Total_premium_paid:   pointerString("5000"),
					Last_medical_checkup: time.Now(),
				},
			},
			// Add more test data as needed
		}

		_, err := collection.InsertMany(ctx, metricsData)
		if err != nil {
			log.Fatal("Failed to insert test data into MongoDB:", err)
			return nil, err
		}

		log.Println("Test data inserted into MongoDB successfully")
	} else {
		log.Println("Test data already exists in MongoDB, skipping insertion")
	}

	return collection, nil
}

func TestGetAllMetrics(t *testing.T) {
	// Initialize test MongoDB collection
	collection, err := InitializeTestMetricsDatabase()
	assert.NoError(t, err)
	defer collection.Database().Client().Disconnect(context.Background())

	// Initialize mock service
	mockService := new(mockMetricsService)

	// Set up expected behavior for the service
	expectedMetrics := &models.Metrics{
		// Define expected metrics data
	}
	mockService.On("GetAllMetrics", mock.Anything).Return(expectedMetrics, nil)

	// Initialize metrics controller with mock service (pass mockService, not &mockService)
	controller := controllers.NewMetric(mockService)

	// Set up test router
	router := gin.Default()
	router.GET("/metrics/get/:id", controller.GetAllMetrics)

	// Make HTTP request to the endpoint
	req, _ := http.NewRequest("GET", "/metrics/get/1", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	// Verify HTTP response
	assert.Equal(t, http.StatusOK, w.Code)

	// Parse response body
	var responseMetrics models.Metrics
	err = json.Unmarshal(w.Body.Bytes(), &responseMetrics)
	assert.NoError(t, err)

	// Assert response matches expected metrics
	assert.Equal(t, expectedMetrics, &responseMetrics)
}

// TestGetCarMetrics tests the GetCarMetrics handler
func TestGetCarMetrics(t *testing.T) {
	// Initialize test MongoDB collection
	collection, err := InitializeTestMetricsDatabase()
	assert.NoError(t, err)
	defer collection.Database().Client().Disconnect(context.Background())

	// Initialize mock service
	mockService := new(mockMetricsService)

	// Set up expected behavior for the service
	expectedCarMetrics := &models.Car{
		// Define expected car metrics data
	}
	mockService.On("GetCarMetrics", mock.Anything).Return(expectedCarMetrics, nil)

	// Initialize metrics controller with mock service (pass mockService, not &mockService)
	controller := controllers.NewMetric(mockService)

	// Set up test router
	router := gin.Default()
	router.GET("/metrics/get/car/:id", controller.GetCarMetrics)

	// Make HTTP request to the endpoint
	req, _ := http.NewRequest("GET", "/metrics/get/car/1", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	// Verify HTTP response
	assert.Equal(t, http.StatusOK, w.Code)

	// Parse response body
	var responseCarMetrics models.Car
	err = json.Unmarshal(w.Body.Bytes(), &responseCarMetrics)
	assert.NoError(t, err)

	// Assert response matches expected car metrics
	assert.Equal(t, expectedCarMetrics, &responseCarMetrics)
}

// TestGetHomeMetrics tests the GetHomeMetrics handler
func TestGetHomeMetrics(t *testing.T) {
	// Initialize test MongoDB collection
	collection, err := InitializeTestMetricsDatabase()
	assert.NoError(t, err)
	defer collection.Database().Client().Disconnect(context.Background())

	// Initialize mock service
	mockService := new(mockMetricsService)

	// Set up expected behavior for the service
	expectedHomeMetrics := &models.Home{
		// Define expected home metrics data
	}
	mockService.On("GetHomeMetrics", mock.Anything).Return(expectedHomeMetrics, nil)

	// Initialize metrics controller with mock service (pass mockService, not &mockService)
	controller := controllers.NewMetric(mockService)

	// Set up test router
	router := gin.Default()
	router.GET("/metrics/get/home/:id", controller.GetHomeMetrics)

	// Make HTTP request to the endpoint
	req, _ := http.NewRequest("GET", "/metrics/get/home/1", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	// Verify HTTP response
	assert.Equal(t, http.StatusOK, w.Code)

	// Parse response body
	var responseHomeMetrics models.Home
	err = json.Unmarshal(w.Body.Bytes(), &responseHomeMetrics)
	assert.NoError(t, err)

	// Assert response matches expected home metrics
	assert.Equal(t, expectedHomeMetrics, &responseHomeMetrics)
}

// TestGetLifeMetrics tests the GetLifeMetrics handler
func TestGetLifeMetrics(t *testing.T) {
	// Initialize test MongoDB collection
	collection, err := InitializeTestMetricsDatabase()
	assert.NoError(t, err)
	defer collection.Database().Client().Disconnect(context.Background())

	// Initialize mock service
	mockService := new(mockMetricsService)

	// Set up expected behavior for the service
	expectedLifeMetrics := &models.Life{
		// Define expected life metrics data
	}
	mockService.On("GetLifeMetrics", mock.Anything).Return(expectedLifeMetrics, nil)

	// Initialize metrics controller with mock service (pass mockService, not &mockService)
	controller := controllers.NewMetric(mockService)

	// Set up test router
	router := gin.Default()
	router.GET("/metrics/get/life/:id", controller.GetLifeMetrics)

	// Make HTTP request to the endpoint
	req, _ := http.NewRequest("GET", "/metrics/get/life/1", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	// Verify HTTP response
	assert.Equal(t, http.StatusOK, w.Code)

	// Parse response body
	var responseLifeMetrics models.Life
	err = json.Unmarshal(w.Body.Bytes(), &responseLifeMetrics)
	assert.NoError(t, err)

	// Assert response matches expected life metrics
	assert.Equal(t, expectedLifeMetrics, &responseLifeMetrics)
}

// TestGetMetricsByUserId tests the GetMetricsByUserId handler
func TestGetMetricsByUserId(t *testing.T) {
	// Initialize test MongoDB collection
	collection, err := InitializeTestMetricsDatabase()
	assert.NoError(t, err)
	defer collection.Database().Client().Disconnect(context.Background())

	// Initialize mock service
	mockService := new(mockMetricsService)

	// Set up expected behavior for the service
	expectedMetrics := &models.Metrics{
		// Define expected metrics data
	}
	mockService.On("GetMetricsByUserId", mock.Anything).Return(expectedMetrics, nil)

	// Initialize metrics controller with mock service (pass mockService, not &mockService)
	controller := controllers.NewMetric(mockService)

	// Set up test router
	router := gin.Default()
	router.GET("/metrics/get/user/:user_id", controller.GetMetricsByUserId)

	// Make HTTP request to the endpoint
	req, _ := http.NewRequest("GET", "/metrics/get/user/1", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	// Verify HTTP response
	assert.Equal(t, http.StatusOK, w.Code)

	// Parse response body
	var responseMetrics models.Metrics
	err = json.Unmarshal(w.Body.Bytes(), &responseMetrics)
	assert.NoError(t, err)

	// Assert response matches expected metrics
	assert.Equal(t, expectedMetrics, &responseMetrics)
}
