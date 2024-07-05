package services_tests

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"gitlab-se.eeecs.qub.ac.uk/CSC3032-2324/CSC3032-2324-TEAM15/cmd/app/controllers"
	"gitlab-se.eeecs.qub.ac.uk/CSC3032-2324/CSC3032-2324-TEAM15/cmd/app/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type mockMetricsService struct {
	mock.Mock
}

func (m *mockMetricsService) GetAllMetrics(id *string) (*models.Metrics, error) {
	args := m.Called(id)
	return args.Get(0).(*models.Metrics), args.Error(1)
}

func (m *mockMetricsService) GetCarMetrics(id *string) (*models.Car, error) {
	args := m.Called(id)
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

func TestGetAllMetrics(t *testing.T) {
	// Mock service and setup expected values
	mockService := new(mockMetricsService)
	expectedUserID := "1"
	expectedMetrics := &models.Metrics{
		ID:      primitive.NewObjectID(),
		User_id: expectedUserID,
		Car_metrics: models.Car{
			Vehicle_make:       pointerString("Toyota"),
			Acceleration_score: pointerString("5"),
			Braking_score:      pointerString("4"),
			Average_speed:      pointerString("60 mph"),
			Miles_travelled:    pointerString("10000"),
		},
		Home_metrics: models.Home{
			Fire_incidents:       pointerString("2"),
			Theft_incidents:      pointerString("1"),
			Flood_incidents:      pointerString("0"),
			Policy_premium:       pointerString("$1000"),
			Claimed_amount:       pointerString("$500"),
			Total_coverage_limit: pointerString("$100000"),
		},
		Life_metrics: models.Life{
			Age:                  pointerString("35"),
			Health_conditions:    pointerString("Good"),
			Smoker:               pointerString("No"),
			Insurance_coverage:   pointerString("$500000"),
			Total_policy_value:   pointerString("$1000000"),
			Total_premium_paid:   pointerString("$2000"),
			Last_medical_checkup: time.Date(2022, time.March, 15, 0, 0, 0, 0, time.UTC),
		},
	}

	// Mock the GetAllMetrics method to return the expected metrics
	mockService.On("GetAllMetrics", mock.Anything).Return(expectedMetrics, nil)

	// Create a mock HTTP request
	req, _ := http.NewRequest("GET", "/metrics/get/1", nil)
	w := httptest.NewRecorder()

	// Create a Gin engine instance and register the controller
	router := gin.Default()
	controller := controllers.NewMetric(mockService)
	controller.RegisterMetricRoutes(router.Group(""))

	// Perform the request
	router.ServeHTTP(w, req)

	// Verify the response
	assert.Equal(t, http.StatusOK, w.Code)

	// Decode the response body and verify its content
	var responseMetrics models.Metrics
	err := json.Unmarshal(w.Body.Bytes(), &responseMetrics)
	assert.NoError(t, err)
	assert.Equal(t, expectedMetrics, &responseMetrics)
}

func TestGetCarMetrics(t *testing.T) {
	// Mock service and setup expected values
	mockService := new(mockMetricsService)
	expectedCarMetrics := &models.Car{
		Vehicle_make:       pointerString("Ford"),
		Acceleration_score: pointerString("4"),
		Braking_score:      pointerString("3"),
		Average_speed:      pointerString("50 mph"),
		Miles_travelled:    pointerString("8000"),
	}

	// Mock the GetCarMetrics method to return the expected car metrics
	mockService.On("GetCarMetrics", mock.Anything).Return(expectedCarMetrics, nil)

	// Create a mock HTTP request
	req, _ := http.NewRequest("GET", "/metrics/get/car/1", nil)
	w := httptest.NewRecorder()

	// Create a Gin engine instance and register the controller
	router := gin.Default()
	controller := controllers.NewMetric(mockService)
	controller.RegisterMetricRoutes(router.Group(""))

	// Perform the request
	router.ServeHTTP(w, req)

	// Verify the response
	assert.Equal(t, http.StatusOK, w.Code)

	// Decode the response body and verify its content
	var responseCarMetrics models.Car
	err := json.Unmarshal(w.Body.Bytes(), &responseCarMetrics)
	assert.NoError(t, err)
	assert.Equal(t, expectedCarMetrics, &responseCarMetrics)
}

func TestGetHomeMetrics(t *testing.T) {
	// Mock service and setup expected values
	mockService := new(mockMetricsService)
	expectedHomeMetrics := &models.Home{
		Fire_incidents:       pointerString("0"),
		Theft_incidents:      pointerString("1"),
		Flood_incidents:      pointerString("0"),
		Policy_premium:       pointerString("$800"),
		Claimed_amount:       pointerString("$200"),
		Total_coverage_limit: pointerString("$50000"),
	}

	// Mock the GetHomeMetrics method to return the expected home metrics
	mockService.On("GetHomeMetrics", mock.Anything).Return(expectedHomeMetrics, nil)

	// Create a mock HTTP request
	req, _ := http.NewRequest("GET", "/metrics/get/home/1", nil)
	w := httptest.NewRecorder()

	// Create a Gin engine instance and register the controller
	router := gin.Default()
	controller := controllers.NewMetric(mockService)
	controller.RegisterMetricRoutes(router.Group(""))

	// Perform the request
	router.ServeHTTP(w, req)

	// Verify the response
	assert.Equal(t, http.StatusOK, w.Code)

	// Decode the response body and verify its content
	var responseHomeMetrics models.Home
	err := json.Unmarshal(w.Body.Bytes(), &responseHomeMetrics)
	assert.NoError(t, err)
	assert.Equal(t, expectedHomeMetrics, &responseHomeMetrics)
}

func TestGetLifeMetrics(t *testing.T) {
	// Mock service and setup expected values
	mockService := new(mockMetricsService)
	expectedLifeMetrics := &models.Life{
		Age:                  pointerString("40"),
		Health_conditions:    pointerString("Fair"),
		Smoker:               pointerString("Yes"),
		Insurance_coverage:   pointerString("$300000"),
		Total_policy_value:   pointerString("$600000"),
		Total_premium_paid:   pointerString("$1500"),
		Last_medical_checkup: time.Date(2023, time.January, 10, 0, 0, 0, 0, time.UTC),
	}

	// Mock the GetLifeMetrics method to return the expected life metrics
	mockService.On("GetLifeMetrics", mock.Anything).Return(expectedLifeMetrics, nil)

	// Create a mock HTTP request
	req, _ := http.NewRequest("GET", "/metrics/get/life/1", nil)
	w := httptest.NewRecorder()

	// Create a Gin engine instance and register the controller
	router := gin.Default()
	controller := controllers.NewMetric(mockService)
	controller.RegisterMetricRoutes(router.Group(""))

	// Perform the request
	router.ServeHTTP(w, req)

	// Verify the response
	assert.Equal(t, http.StatusOK, w.Code)

	// Decode the response body and verify its content
	var responseLifeMetrics models.Life
	err := json.Unmarshal(w.Body.Bytes(), &responseLifeMetrics)
	assert.NoError(t, err)
	assert.Equal(t, expectedLifeMetrics, &responseLifeMetrics)
}
